require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Создание таблиц (если их нет)
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS sessions (
        token VARCHAR(255) PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP NOT NULL
      );
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_slug VARCHAR(100) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        target_type VARCHAR(20) NOT NULL,
        target_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, target_type, target_id)
      );
    `);
    console.log('Tables created/verified');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};
createTables();

// ---- Регистрация ----
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, passwordHash]
    );
    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// ---- Вход ----
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );
    await pool.query(
      'INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)',
      [token, user.id, new Date(Date.now() + 7*24*60*60*1000)]
    );
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Middleware для проверки токена ----
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const session = await pool.query('SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW()', [token]);
    if (session.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ---- Получение комментариев ----
app.get('/api/posts/:slug/comments', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `SELECT comments.*, users.username 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE post_slug = $1 
       ORDER BY created_at DESC`,
      [slug]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Добавление комментария ----
app.post('/api/posts/:slug/comments', authenticate, async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Missing content' });
    }
    const result = await pool.query(
      'INSERT INTO comments (post_slug, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [slug, req.userId, content]
    );
    res.status(201).json({ message: 'Comment added', comment: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Лайк (toggle) ----
app.post('/api/like', authenticate, async (req, res) => {
  try {
    const { targetType, targetId } = req.body;
    if (!targetType || !targetId) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const existing = await pool.query(
      'SELECT id FROM likes WHERE user_id = $1 AND target_type = $2 AND target_id = $3',
      [req.userId, targetType, targetId]
    );
    if (existing.rows.length > 0) {
      await pool.query(
        'DELETE FROM likes WHERE user_id = $1 AND target_type = $2 AND target_id = $3',
        [req.userId, targetType, targetId]
      );
      res.json({ message: 'Unliked' });
    } else {
      await pool.query(
        'INSERT INTO likes (user_id, target_type, target_id) VALUES ($1, $2, $3)',
        [req.userId, targetType, targetId]
      );
      res.json({ message: 'Liked' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Количество лайков ----
app.get('/api/likes/:targetType/:targetId', async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM likes WHERE target_type = $1 AND target_id = $2',
      [targetType, targetId]
    );
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Корневой маршрут (отдача index.html) ----
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) res.send('Сервер работает!');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
