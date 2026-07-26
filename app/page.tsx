'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShieldCheck, 
  DollarSign, 
  Gift, 
  Zap, 
  Coins,
  ArrowUpRight,
  TrendingDown,
  Info,
  User,
  Lock,
  Mail,
  Key,
  LogOut,
  Settings,
  HelpCircle,
  Wallet,
  Percent,
  Bot,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Calculator,
  Bell,
  Play,
  Square,
  AlertTriangle,
  Activity,
  ChevronRight,
  Eye,
  EyeOff,
  X,
  Menu,
  QrCode,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Premium Theme Options for Personal Cabinet
const themeStyles = {
  gold: {
    accent: 'text-[#ffd200]',
    accentBg: 'bg-[#ffd200]',
    accentBorder: 'border-[#ffd200]/30',
    accentText: 'text-[#ffd200]',
    accentButton: 'from-orange-500 to-yellow-400 text-slate-950 hover:shadow-[0_0_20px_rgba(255,210,0,0.3)]',
    glow: 'rgba(255, 210, 0, 0.15)',
    bg: 'bg-[#03040b]',
    gradient: 'radial-gradient(circle at 50% 0%, #1a1202 0%, #03040b 70%, #010105 100%)',
    badge: 'bg-[#ffd200]/10 text-[#ffd200] border-[#ffd200]/20'
  },
  cyan: {
    accent: 'text-[#00d4ff]',
    accentBg: 'bg-[#00d4ff]',
    accentBorder: 'border-[#00d4ff]/30',
    accentText: 'text-[#00d4ff]',
    accentButton: 'from-cyan-500 to-blue-500 text-slate-950 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]',
    glow: 'rgba(0, 212, 255, 0.15)',
    bg: 'bg-[#01060f]',
    gradient: 'radial-gradient(circle at 50% 0%, #021a24 0%, #01060f 70%, #000205 100%)',
    badge: 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20'
  },
  purple: {
    accent: 'text-[#c084fc]',
    accentBg: 'bg-[#c084fc]',
    accentBorder: 'border-[#c084fc]/30',
    accentText: 'text-[#c084fc]',
    accentButton: 'from-purple-600 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(192,132,252,0.3)]',
    glow: 'rgba(192, 132, 252, 0.15)',
    bg: 'bg-[#05010a]',
    gradient: 'radial-gradient(circle at 50% 0%, #1a0129 0%, #05010a 70%, #020005 100%)',
    badge: 'bg-[#c084fc]/10 text-[#c084fc] border-[#c084fc]/20'
  },
  emerald: {
    accent: 'text-[#10b981]',
    accentBg: 'bg-[#10b981]',
    accentBorder: 'border-[#10b981]/30',
    accentText: 'text-[#10b981]',
    accentButton: 'from-emerald-500 to-teal-400 text-slate-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    glow: 'rgba(16, 185, 129, 0.15)',
    bg: 'bg-[#010804]',
    gradient: 'radial-gradient(circle at 50% 0%, #022410 0%, #010804 70%, #000401 100%)',
    badge: 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20'
  }
};

// Referral link
const REF_LINK = 'https://freebitco.in/?r=264521';

// Custom CountUp Component for premium statistical numbers
function CountUp({ target, duration = 2000, suffix = '', prefix = '', decimals = 0 }: { 
  target: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
  decimals?: number; 
}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      setCount(easeProgress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <span style={{ fontFamily: 'Georgia' }}>
      {prefix}
      {count.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

// Real-time continuous payouts counter helper
const BASE_PAID_OUT = 151.35;

function calculateCurrentTotalPaidOut(): number {
  if (typeof window === 'undefined') return BASE_PAID_OUT;
  const storedExtra = parseFloat(localStorage.getItem('freebitco_extra_paid_out') || '0');
  return BASE_PAID_OUT + (isNaN(storedExtra) ? 0 : storedExtra);
}

export default function Home({ initialDashboardOpen = false }: { initialDashboardOpen?: boolean }) {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  
  // Real live BTC price and 24h change
  const [btcPrice, setBtcPrice] = React.useState<number>(97500.00);
  const [btc24hChange, setBtc24hChange] = React.useState<number>(1.85);
  const [btcTrend, setBtcTrend] = React.useState<'up' | 'down'>('up');
  const [totalPaidOut, setTotalPaidOut] = React.useState<number>(151.35);

  // --- AUTHENTICATION & CABINET STATE ---
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = React.useState(false);
  const [dashboardTheme, setDashboardTheme] = React.useState<'gold' | 'cyan' | 'purple' | 'emerald'>('gold');
  const [activeDashboardTab, setActiveDashboardTab] = React.useState<'overview' | 'faucet' | 'multiply' | 'referrals' | 'calculator' | 'payouts' | 'settings' | 'admin'>('overview');
  const [isMobileLandingMenuOpen, setIsMobileLandingMenuOpen] = React.useState(false);
  const [isMobileDashboardMenuOpen, setIsMobileDashboardMenuOpen] = React.useState(false);
  
  const [currentUser, setCurrentUser] = React.useState<{
    email: string;
    name: string;
    avatar: string;
    wallet: string;
    refId: string;
    refShare: number;
    balance: number;
    cumulativeClaims: number;
    rollsCount: number;
    loyaltyPoints: number;
    tier: string;
    twoFactorEnabled: boolean;
    lastMiningTimestamp?: number;
    nextRollTimestamp?: number;
    isAdmin?: boolean;
  } | null>(null);

  // --- ADMIN PANEL STATE ---
  const [adminUsersList, setAdminUsersList] = React.useState<any[]>([]);
  const [adminPayoutNotifications, setAdminPayoutNotifications] = React.useState<any[]>([]);
  const [adminBroadcastMsg, setAdminBroadcastMsg] = React.useState<string>('');
  const [adminLog, setAdminLog] = React.useState<Array<{ id: number; time: string; text: string; type: 'info' | 'user' | 'system' }>>([
    { id: 1, time: '18:42', text: 'Админ-панель инициализирована. Система работает штатно.', type: 'system' },
    { id: 2, time: '18:40', text: 'Резервная копия структуры пользователей обновлена в LocalStorage.', type: 'info' }
  ]);

  const refreshAdminUsersList = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
    setAdminUsersList(accounts);
  }, []);

  const refreshAdminPayoutNotifications = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('freebitco_admin_payout_notifications');
    if (stored) {
      setAdminPayoutNotifications(JSON.parse(stored));
    } else {
      const defaultNotifs = [
        {
          id: 'req_881902',
          userEmail: 'crypto_holder@ukr.net',
          userName: 'Михаил К.',
          amountSat: 45000,
          feeSat: 1000,
          netAmountSat: 44000,
          wallet: 'bc1q9x382ks9012hsd98231084201928302193',
          speed: 'Обычный (Slow)',
          date: '2026-07-26 18:30',
          status: 'Ожидает обработки',
          timestamp: Date.now() - 1800000,
          unread: true
        }
      ];
      localStorage.setItem('freebitco_admin_payout_notifications', JSON.stringify(defaultNotifs));
      setAdminPayoutNotifications(defaultNotifs);
    }
  }, []);

  const handleApprovePayoutRequest = (notifId: string) => {
    const updated = adminPayoutNotifications.map((notif: any) => {
      if (notif.id === notifId) {
        return { ...notif, status: 'Одобрен (Админ)', unread: false };
      }
      return notif;
    });
    localStorage.setItem('freebitco_admin_payout_notifications', JSON.stringify(updated));
    setAdminPayoutNotifications(updated);

    const approvedNotif = adminPayoutNotifications.find((n: any) => n.id === notifId);
    setAdminLog(prev => [{
      id: Date.now(),
      time: new Date().toLocaleTimeString().slice(0, 5),
      text: `✅ ОДОБРЕНА ВЫПЛАТА #${notifId}: ${approvedNotif?.userEmail} (${approvedNotif?.amountSat?.toLocaleString()} SAT)`,
      type: 'user'
    }, ...prev]);
  };

  const handleRejectPayoutRequest = (notifId: string) => {
    const targetNotif = adminPayoutNotifications.find((n: any) => n.id === notifId);
    if (!targetNotif) return;

    const updatedNotifs = adminPayoutNotifications.map((notif: any) => {
      if (notif.id === notifId) {
        return { ...notif, status: 'Отклонен', unread: false };
      }
      return notif;
    });
    localStorage.setItem('freebitco_admin_payout_notifications', JSON.stringify(updatedNotifs));
    setAdminPayoutNotifications(updatedNotifs);

    const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
    const updatedAccounts = accounts.map((acc: any) => {
      if (acc.email.toLowerCase() === targetNotif.userEmail.toLowerCase()) {
        return { ...acc, balance: (acc.balance || 0) + targetNotif.amountSat };
      }
      return acc;
    });
    localStorage.setItem('freebitco_accounts', JSON.stringify(updatedAccounts));
    setAdminUsersList(updatedAccounts);

    if (currentUser && currentUser.email.toLowerCase() === targetNotif.userEmail.toLowerCase()) {
      setCurrentUser({ ...currentUser, balance: currentUser.balance + targetNotif.amountSat });
    }

    setAdminLog(prev => [{
      id: Date.now(),
      time: new Date().toLocaleTimeString().slice(0, 5),
      text: `❌ ОТКЛОНЕНА ВЫПЛАТА #${notifId}: Средства (${targetNotif.amountSat?.toLocaleString()} SAT) возвращены на баланс ${targetNotif.userEmail}`,
      type: 'user'
    }, ...prev]);
  };

  React.useEffect(() => {
    refreshAdminPayoutNotifications();
    if (activeDashboardTab === 'admin') {
      refreshAdminUsersList();
    }
  }, [activeDashboardTab, refreshAdminUsersList, refreshAdminPayoutNotifications]);

  const [authModal, setAuthModal] = React.useState({
    isOpen: false,
    mode: 'login' as 'login' | 'register' | 'forgot',
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    showPassword: false,
    errorSimulated: false
  });

  const [authResult, setAuthResult] = React.useState<{
    isOpen: boolean;
    success: boolean;
    title: string;
    message: string;
  } | null>(null);

  // --- IDLE / PAUSED EARNINGS MODAL ---
  const [idleModalOpen, setIdleModalOpen] = React.useState(false);

  // --- FREE ROLL CRAN SIMULATOR ---
  const [rollStatus, setRollStatus] = React.useState({
    isRolling: false,
    rolledDigits: ['0', '0', '0', '0', '0'],
    finalNumber: null as number | null,
    winAmount: null as number | null,
    cooldownSeconds: 0
  });

  // --- MULTIPLY BTC (HI-LO) GAME STATE ---
  const [multiplyBet, setMultiplyBet] = React.useState(10);
  const [multiplyResult, setMultiplyResult] = React.useState<{
    rolled: number | null;
    won: boolean | null;
    change: number | null;
    isHigh: boolean | null;
  }>({ rolled: null, won: null, change: null, isHigh: null });
  const [multiplyHistory, setMultiplyHistory] = React.useState<Array<{
    id: number;
    rolled: number;
    bet: number;
    isHigh: boolean;
    won: boolean;
  }>>([]);

  // --- MARTINGALE BOT AUTOMATION ---
  const [isBotRunning, setIsBotRunning] = React.useState(false);
  const [botConfig, setBotConfig] = React.useState({
    baseBet: 10,
    multiplier: 2,
    actionOnLoss: 'double' as 'double' | 'reset',
    actionOnWin: 'reset' as 'reset' | 'double',
    maxLossSteps: 8
  });
  const [botStats, setBotStats] = React.useState({
    wins: 0,
    losses: 0,
    profit: 0,
    currentLossStreak: 0,
    maxLossStreak: 0
  });

  // --- REFERRAL INTERACTIVE TICKER ---
  const [referralList, setReferralList] = React.useState([
    { id: 101, name: 'Satoshi_Miner', avatar: 'https://picsum.photos/seed/sat/80/80', status: 'online', claimed: 1420, date: '2026-07-10' },
    { id: 102, name: 'CryptoQueen', avatar: 'https://picsum.photos/seed/que/80/80', status: 'online', claimed: 2850, date: '2026-07-12' },
    { id: 103, name: 'BtcBull_99', avatar: 'https://picsum.photos/seed/bul/80/80', status: 'offline', claimed: 950, date: '2026-07-15' },
    { id: 104, name: 'HodlGod', avatar: 'https://picsum.photos/seed/god/80/80', status: 'online', claimed: 410, date: '2026-07-20' }
  ]);
  const [recentNotifications, setRecentNotifications] = React.useState<Array<{ id: number; text: string; time: string }>>([]);

  // --- CALCULATOR STATE ---
  const [calcSatoshi, setCalcSatoshi] = React.useState('10000');
  const [calcBtc, setCalcBtc] = React.useState('0.00010000');
  const [calcUsd, setCalcUsd] = React.useState('5.84');

  // --- PAYOUTS / WITHDRAWAL STATE ---
  const [payoutSpeed, setPayoutSpeed] = React.useState<'auto' | 'slow' | 'instant'>('auto');
  const [withdrawAmount, setWithdrawAmount] = React.useState('30000');
  const [payoutStatus, setPayoutStatus] = React.useState<{ success?: boolean; message?: string } | null>(null);
  const [payoutHistory, setPayoutHistory] = React.useState<Array<{
    id: string;
    amount: number;
    fee: number;
    address: string;
    date: string;
    status: 'Завершен' | 'В обработке' | 'Отменен';
    txid: string;
  }>>([
    {
      id: 'tx_98124',
      amount: 45000,
      fee: 0,
      address: 'bc1qxy2kg3ut7v6396t88372864839201019183',
      date: '2026-07-22 14:30',
      status: 'Завершен',
      txid: '7f9a81c028e3b1...4a89'
    },
    {
      id: 'tx_87102',
      amount: 32000,
      fee: 1000,
      address: 'bc1qxy2kg3ut7v6396t88372864839201019183',
      date: '2026-07-15 09:12',
      status: 'Завершен',
      txid: '3b2e91a84f010c...81d3'
    }
  ]);

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const amountNum = parseInt(withdrawAmount, 10);
    const minWithdrawal = 30000;
    
    if (isNaN(amountNum) || amountNum < minWithdrawal) {
      setPayoutStatus({
        success: false,
        message: `Минимальная сумма вывода составляет ${minWithdrawal.toLocaleString('en-US')} SAT`
      });
      return;
    }

    if (amountNum > currentUser.balance) {
      setPayoutStatus({
        success: false,
        message: 'Недостаточно средств на балансе для совершения выплаты'
      });
      return;
    }

    let fee = 0;
    if (payoutSpeed === 'slow') fee = 1000;
    if (payoutSpeed === 'instant') fee = 5000;

    const totalDeduct = amountNum;
    const updatedUser = { ...currentUser, balance: currentUser.balance - totalDeduct };
    syncUserToStorage(updatedUser);

    const now = new Date();
    const timestamp = now.getTime();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTx = {
      id: `tx_${timestamp.toString().slice(-5)}`,
      amount: amountNum - fee,
      fee,
      address: currentUser.wallet || 'bc1qxy2kg3ut7v6396t88372864839201019183',
      date: formattedDate,
      status: payoutSpeed === 'instant' ? ('Завершен' as const) : ('В обработке' as const),
      txid: `${timestamp.toString(16)}...8f2a`
    };

    setPayoutHistory(prev => [newTx, ...prev]);

    // Create admin notification item
    const adminNotif = {
      id: `req_${timestamp.toString().slice(-6)}`,
      userEmail: currentUser.email,
      userName: currentUser.name || 'Пользователь',
      amountSat: amountNum,
      feeSat: fee,
      netAmountSat: amountNum - fee,
      wallet: currentUser.wallet || 'bc1qxy2kg3ut7v6396t88372864839201019183',
      speed: payoutSpeed === 'instant' ? 'Мгновенный (Instant)' : 'Обычный (Slow)',
      date: formattedDate,
      status: payoutSpeed === 'instant' ? 'Одобрен (Авто)' : 'Ожидает обработки',
      timestamp,
      unread: true
    };

    if (typeof window !== 'undefined') {
      const existingNotifs = JSON.parse(localStorage.getItem('freebitco_admin_payout_notifications') || '[]');
      const updatedNotifs = [adminNotif, ...existingNotifs];
      localStorage.setItem('freebitco_admin_payout_notifications', JSON.stringify(updatedNotifs));
      setAdminPayoutNotifications(updatedNotifs);
    }

    setAdminLog(prev => [{
      id: Date.now(),
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      text: `💸 ЗАПРОС НА ВЫВОД: ${currentUser.email} запросил(а) ${amountNum.toLocaleString('en-US')} SAT (Кошелек: ${currentUser.wallet || 'bc1q...'})`,
      type: 'user'
    }, ...prev]);

    // Record real withdrawal sum added to total paid out counter
    const withdrawnUsd = ((amountNum - fee) / 100000000) * btcPrice;
    const currentExtra = parseFloat(localStorage.getItem('freebitco_extra_paid_out') || '0');
    const newExtra = (isNaN(currentExtra) ? 0 : currentExtra) + withdrawnUsd;
    localStorage.setItem('freebitco_extra_paid_out', newExtra.toString());
    setTotalPaidOut(BASE_PAID_OUT + newExtra);

    setPayoutStatus({
      success: true,
      message: `Заявка на вывод ${amountNum.toLocaleString('en-US')} SAT успешно сформирована!`
    });
  };

  // --- REFS FOR AUTO-BOT RUNNING ---
  const multiplyBetRef = React.useRef(multiplyBet);
  const isBotRunningRef = React.useRef(isBotRunning);
  const currentUserRef = React.useRef(currentUser);

  React.useEffect(() => {
    multiplyBetRef.current = multiplyBet;
    isBotRunningRef.current = isBotRunning;
    currentUserRef.current = currentUser;
  }, [multiplyBet, isBotRunning, currentUser]);

  // Sync current user modifications to localStorage
  const syncUserToStorage = React.useCallback((updatedUser: any) => {
    if (typeof window === 'undefined' || !updatedUser) return;
    const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
    const index = accounts.findIndex((a: any) => a.email === updatedUser.email);
    if (index !== -1) {
      accounts[index] = updatedUser;
    } else {
      accounts.push(updatedUser);
    }
    localStorage.setItem('freebitco_accounts', JSON.stringify(accounts));
    setCurrentUser(updatedUser);
  }, []);

  // Initial user seeding & session restoration
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingAccounts = localStorage.getItem('freebitco_accounts');
      let accountsList = existingAccounts ? JSON.parse(existingAccounts) : [];
      
      const adminVadimExists = accountsList.some((a: any) => a.email.toLowerCase() === 'vadimmartin@ukr.net');
      if (!adminVadimExists) {
        accountsList.push({
          email: 'vadimmartin@ukr.net',
          password: 'admin',
          name: 'Вадим Мартин (Admin)',
          avatar: 'https://picsum.photos/seed/vadim/100/100',
          wallet: 'bc1qvadimmartin9999999999999999999999',
          refId: 'vadim1',
          refShare: 50,
          balance: 5000000,
          cumulativeClaims: 150,
          rollsCount: 150,
          loyaltyPoints: 5000,
          tier: 'Platinum',
          twoFactorEnabled: true,
          isAdmin: true
        });
      }

      if (!existingAccounts) {
        accountsList.push(
          {
            email: 'demo@freebitco.io',
            password: 'demo123',
            name: 'Крипто Бро',
            avatar: 'https://picsum.photos/seed/avatar1/100/100',
            wallet: 'bc1qxy2kg3ut7v6396t88372864839201019183',
            refId: 'demo999',
            refShare: 25,
            balance: 15420, // Satoshis
            cumulativeClaims: 4,
            rollsCount: 4,
            loyaltyPoints: 120,
            tier: 'Bronze',
            twoFactorEnabled: false,
            isAdmin: true
          },
          {
            email: 'admin@freebitco.io',
            password: 'admin',
            name: 'Главный Администратор',
            avatar: 'https://picsum.photos/seed/admin/100/100',
            wallet: 'bc1qadmin99999999999999999999999999999',
            refId: 'admin1',
            refShare: 50,
            balance: 5000000,
            cumulativeClaims: 150,
            rollsCount: 150,
            loyaltyPoints: 5000,
            tier: 'Platinum',
            twoFactorEnabled: true,
            isAdmin: true
          }
        );
      }
      localStorage.setItem('freebitco_accounts', JSON.stringify(accountsList));

      // Restore session
      const session = localStorage.getItem('freebitco_session');
      if (session) {
        const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
        const user = accounts.find((a: any) => a.email.toLowerCase() === session.toLowerCase());
        if (user) {
          setTimeout(() => {
            const now = Date.now();
            if (user.lastMiningTimestamp) {
              const diffMs = now - user.lastMiningTimestamp;
              if (diffMs > 15000) {
                setIdleModalOpen(true);
              }
            } else {
              setIdleModalOpen(true);
            }
            const isUserAdmin = user.isAdmin ?? (
              user.email.toLowerCase() === 'vadimmartin@ukr.net' ||
              user.email === 'demo@freebitco.io' ||
              user.email.toLowerCase().includes('admin')
            );
            let finalUser = { ...user, isAdmin: isUserAdmin, lastMiningTimestamp: now };
            setCurrentUser(finalUser);
            syncUserToStorage(finalUser);
            setIsLoggedIn(true);
            if (window.location.pathname === '/dashboard' || initialDashboardOpen) {
              setIsDashboardOpen(true);
            }
          }, 0);
        } else if (window.location.pathname === '/dashboard' || initialDashboardOpen) {
          setTimeout(() => {
            setAuthModal(prev => ({ ...prev, isOpen: true, mode: 'login' }));
          }, 0);
        }
      } else if (window.location.pathname === '/dashboard' || initialDashboardOpen) {
        setTimeout(() => {
          setAuthModal(prev => ({ ...prev, isOpen: true, mode: 'login' }));
        }, 0);
      }
    }
  }, [initialDashboardOpen]);

  // Synchronize browser URL bar (/dashboard vs /)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isDashboardOpen && isLoggedIn && currentUser) {
      if (window.location.pathname !== '/dashboard') {
        window.history.pushState({ dashboard: true }, '', '/dashboard');
      }
    } else if (!isDashboardOpen) {
      if (window.location.pathname === '/dashboard') {
        window.history.pushState({ dashboard: false }, '', '/');
      }
    }
  }, [isDashboardOpen, isLoggedIn, currentUser]);

  // Listen to browser Back / Forward buttons
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      if (window.location.pathname === '/dashboard') {
        if (isLoggedIn) {
          setIsDashboardOpen(true);
        } else {
          setAuthModal(prev => ({ ...prev, isOpen: true, mode: 'login' }));
        }
      } else {
        setIsDashboardOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoggedIn]);

  // Cooldown timer ticker for faucet claim (Real-time countdown)
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const updateCooldown = () => {
      if (currentUser?.nextRollTimestamp) {
        const remaining = Math.max(0, Math.ceil((currentUser.nextRollTimestamp - Date.now()) / 1000));
        setRollStatus(prev => ({
          ...prev,
          cooldownSeconds: remaining
        }));
      } else if (rollStatus.cooldownSeconds > 0) {
        setRollStatus(prev => ({
          ...prev,
          cooldownSeconds: Math.max(0, prev.cooldownSeconds - 1)
        }));
      }
    };

    if (currentUser?.nextRollTimestamp || rollStatus.cooldownSeconds > 0) {
      updateCooldown();
      interval = setInterval(updateCooldown, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentUser?.nextRollTimestamp, rollStatus.cooldownSeconds]);

  // Fetch real live BTC price & 24h change from public APIs
  React.useEffect(() => {
    let isMounted = true;

    const fetchRealBtcPrice = async () => {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        if (res.ok) {
          const data = await res.json();
          const price = parseFloat(data.lastPrice);
          const changePercent = parseFloat(data.priceChangePercent);
          if (isMounted && !isNaN(price)) {
            setBtcPrice(price);
            if (!isNaN(changePercent)) {
              setBtc24hChange(changePercent);
              setBtcTrend(changePercent >= 0 ? 'up' : 'down');
            }
            return;
          }
        }
      } catch {
        // Fallback 1: CoinGecko API
        try {
          const res2 = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
          if (res2.ok) {
            const data2 = await res2.json();
            const price2 = data2?.bitcoin?.usd;
            const change2 = data2?.bitcoin?.usd_24h_change;
            if (isMounted && typeof price2 === 'number') {
              setBtcPrice(price2);
              if (typeof change2 === 'number') {
                setBtc24hChange(change2);
                setBtcTrend(change2 >= 0 ? 'up' : 'down');
              }
              return;
            }
          }
        } catch {
          // Fallback 2: Coinbase API
          try {
            const res3 = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
            if (res3.ok) {
              const data3 = await res3.json();
              const price3 = parseFloat(data3?.data?.amount);
              if (isMounted && !isNaN(price3)) {
                setBtcPrice(price3);
              }
            }
          } catch {
            // Keep existing state if offline
          }
        }
      }
    };

    fetchRealBtcPrice();
    const interval = setInterval(fetchRealBtcPrice, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Sync total paid out counter from storage on mount (base $151.35)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTotalPaidOut(calculateCurrentTotalPaidOut());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Live Earning simulator representing active referrals rolling & passive mining
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoggedIn && currentUser) {
      interval = setInterval(() => {
        // Randomly simulate a referral claim or automatic minor stake mining increment
        const rand = Math.random();
        if (rand < 0.15) {
          // Referral collects the faucet
          const simulatedUser = referralList[Math.floor(Math.random() * referralList.length)];
          const bonusAmt = 7.5; // 50% commission on simulated 15 satoshi win
          
          setRecentNotifications(prev => [
            {
              id: Date.now(),
              text: `Реферал @${simulatedUser.name} собрал кран: +15 SAT (вам начислено +${bonusAmt} SAT)`,
              time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            },
            ...prev.slice(0, 4)
          ]);

          // Update user balance
          const updated = {
            ...currentUserRef.current!,
            balance: currentUserRef.current!.balance + bonusAmt
          };
          syncUserToStorage(updated);
        } else if (rand < 0.45) {
          // Passive mining yield (+1 satoshi every 10 minutes)
          const updated = {
            ...currentUserRef.current!,
            balance: currentUserRef.current!.balance + 1,
            lastMiningTimestamp: Date.now()
          };
          syncUserToStorage(updated);
        }
      }, 600000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoggedIn, referralList]);

  // Detect tab backgrounding / return after idle
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    let hiddenTime = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTime = Date.now();
      } else {
        if (hiddenTime > 0) {
          const awayTimeMs = Date.now() - hiddenTime;
          if (awayTimeMs > 15000 && isLoggedIn && isDashboardOpen) {
            setIdleModalOpen(true);
          }
          hiddenTime = 0;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLoggedIn, isDashboardOpen]);

  // Two-way calculator synchronization
  React.useEffect(() => {
    const sat = parseFloat(calcSatoshi);
    if (!isNaN(sat)) {
      const btc = sat / 100000000;
      setTimeout(() => {
        setCalcBtc(btc.toFixed(8));
        setCalcUsd((btc * btcPrice).toFixed(2));
      }, 0);
    }
  }, [calcSatoshi, btcPrice]);

  // --- ACTIONS & HANDLERS ---
  const handleOpenAuth = (mode: 'login' | 'register' | 'forgot') => {
    setAuthModal(prev => ({
      ...prev,
      isOpen: true,
      mode,
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      errorSimulated: false
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
    const user = accounts.find((a: any) => a.email.toLowerCase() === authModal.email.toLowerCase() && a.password === authModal.password);

    if (user) {
      const now = Date.now();
      if (user.lastMiningTimestamp) {
        if (now - user.lastMiningTimestamp > 15000) {
          setIdleModalOpen(true);
        }
      } else {
        setIdleModalOpen(true);
      }
      const isUserAdmin = user.isAdmin ?? (
        user.email.toLowerCase() === 'vadimmartin@ukr.net' ||
        user.email === 'demo@freebitco.io' ||
        user.email.toLowerCase().includes('admin')
      );
      const updatedUser = { ...user, isAdmin: isUserAdmin, lastMiningTimestamp: now };
      localStorage.setItem('freebitco_session', updatedUser.email);
      setCurrentUser(updatedUser);
      syncUserToStorage(updatedUser);
      setIsLoggedIn(true);
      setAuthModal(prev => ({ ...prev, isOpen: false }));
      setIsDashboardOpen(true);
    } else {
      alert('Неверный адрес электронной почты или пароль. Попробуйте еще раз или войдите через Демо-профиль.');
    }
  };

  const handleDemoLogin = () => {
    const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
    const demoUser = accounts.find((a: any) => a.email === 'demo@freebitco.io');
    if (demoUser) {
      const now = Date.now();
      if (demoUser.lastMiningTimestamp) {
        if (now - demoUser.lastMiningTimestamp > 15000) {
          setIdleModalOpen(true);
        }
      } else {
        setIdleModalOpen(true);
      }
      const updatedUser = { ...demoUser, lastMiningTimestamp: now };
      localStorage.setItem('freebitco_session', updatedUser.email);
      setCurrentUser(updatedUser);
      syncUserToStorage(updatedUser);
      setIsLoggedIn(true);
      setAuthModal(prev => ({ ...prev, isOpen: false }));
      setIsDashboardOpen(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authModal.email || !authModal.password || !authModal.name) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    if (authModal.password !== authModal.confirmPassword) {
      alert('Пароли не совпадают.');
      return;
    }

    setAuthModal(prev => ({ ...prev, isOpen: false }));

    // Show beautiful success/failure result popup as requested
    if (authModal.errorSimulated) {
      setAuthResult({
        isOpen: true,
        success: false,
        title: 'Ошибка регистрации',
        message: 'Этот адрес электронной почты уже занят или сессия партнера истекла. Пожалуйста, отключите симуляцию ошибки и попробуйте снова.'
      });
    } else {
      const accounts = JSON.parse(localStorage.getItem('freebitco_accounts') || '[]');
      const exists = accounts.find((a: any) => a.email.toLowerCase() === authModal.email.toLowerCase());
      if (exists) {
        setAuthResult({
          isOpen: true,
          success: false,
          title: 'Email уже занят',
          message: 'Этот адрес электронной почты уже используется в системе. Попробуйте другой Email или войдите под текущим.'
        });
        return;
      }

      const isUserAdmin = (
        authModal.email.toLowerCase() === 'vadimmartin@ukr.net' ||
        authModal.email.toLowerCase().includes('admin')
      );

      const newUser = {
        email: authModal.email,
        password: authModal.password,
        name: authModal.name,
        avatar: 'https://picsum.photos/seed/' + Math.floor(Math.random() * 100) + '/100/100',
        wallet: 'bc1q' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        refId: Math.floor(100000 + Math.random() * 900000).toString(),
        refShare: 0,
        balance: isUserAdmin ? 5000000 : 1000, // 5M SAT for admin, 1000 for regular users
        cumulativeClaims: isUserAdmin ? 150 : 0,
        rollsCount: isUserAdmin ? 150 : 0,
        loyaltyPoints: isUserAdmin ? 5000 : 0,
        tier: isUserAdmin ? 'Platinum' : 'Bronze',
        twoFactorEnabled: false,
        isAdmin: isUserAdmin
      };

      accounts.push(newUser);
      localStorage.setItem('freebitco_accounts', JSON.stringify(accounts));

      setAuthResult({
        isOpen: true,
        success: true,
        title: 'Успешная регистрация! 🎉',
        message: `Поздравляем, ${authModal.name}! Ваша учетная запись успешно создана. Вам начислено 1000 приветственных сатоши! Теперь вы можете войти в личный кабинет.`
      });
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authModal.email) {
      alert('Пожалуйста, введите корректный email.');
      return;
    }
    alert(`Ссылка для сброса пароля успешно отправлена на ${authModal.email}! Проверьте ваш почтовый ящик.`);
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleLogout = () => {
    localStorage.removeItem('freebitco_session');
    setIsLoggedIn(false);
    setIsDashboardOpen(false);
    setCurrentUser(null);
    setIsBotRunning(false);
  };

  // --- FAUCET FREE BTC ROLLER ---
  const triggerFreeRoll = () => {
    if (!currentUser || rollStatus.isRolling || rollStatus.cooldownSeconds > 0) return;
    
    setRollStatus(prev => ({ ...prev, isRolling: true, finalNumber: null, winAmount: null }));
    
    // Slot rolling effect
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      setRollStatus(prev => ({
        ...prev,
        rolledDigits: Array.from({ length: 5 }, () => Math.floor(Math.random() * 10).toString())
      }));
      tickCount++;
      if (tickCount > 15) {
        clearInterval(tickInterval);
        
        // Final Roll selection
        const finalNum = Math.floor(Math.random() * 10001);
        let reward = 5;
        if (finalNum === 10000) reward = 100000;
        else if (finalNum >= 9998) reward = 10000;
        else if (finalNum >= 9994) reward = 1000;
        else if (finalNum >= 9986) reward = 100;
        else if (finalNum >= 9886) reward = 10;

        const claims = currentUser.cumulativeClaims + 1;
        let loyalty = currentUser.loyaltyPoints + 2;
        let calculatedTier = 'Bronze';
        if (claims > 50) calculatedTier = 'Platinum';
        else if (claims > 25) calculatedTier = 'Gold';
        else if (claims > 10) calculatedTier = 'Silver';

        const now = Date.now();
        const nextRollTime = now + 3600 * 1000; // 1 hour in real-time

        // Update balance
        const updatedUser = {
          ...currentUser,
          balance: currentUser.balance + reward,
          cumulativeClaims: claims,
          rollsCount: currentUser.rollsCount + 1,
          loyaltyPoints: loyalty,
          tier: calculatedTier,
          nextRollTimestamp: nextRollTime
        };

        setRollStatus(prev => ({
          ...prev,
          isRolling: false,
          rolledDigits: finalNum.toString().padStart(5, '0').split(''),
          finalNumber: finalNum,
          winAmount: reward,
          cooldownSeconds: 3600 // 1 hour
        }));

        syncUserToStorage(updatedUser);
      }
    }, 80);
  };

  // --- HI-LO MULTIPLIER GAME LOGIC ---
  const playHiLo = (betOnHigh: boolean) => {
    if (!currentUser) return;
    if (multiplyBet > currentUser.balance) {
      alert('Недостаточно баланса для этой ставки.');
      setIsBotRunning(false);
      return;
    }

    const rolled = Math.floor(Math.random() * 10000);
    let won = false;

    if (betOnHigh) {
      won = rolled > 5250;
    } else {
      won = rolled < 4750;
    }

    const change = won ? multiplyBet : -multiplyBet;
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + change
    };

    const record = {
      id: Date.now() + Math.random(),
      rolled,
      bet: multiplyBet,
      isHigh: betOnHigh,
      won
    };

    setMultiplyResult({ rolled, won, change, isHigh: betOnHigh });
    setMultiplyHistory(prev => [record, ...prev.slice(0, 9)]);
    syncUserToStorage(updatedUser);

    // Update stats for bot if bot is running
    if (isBotRunningRef.current) {
      setBotStats(prev => {
        const nextLossStreak = won ? 0 : prev.currentLossStreak + 1;
        return {
          wins: prev.wins + (won ? 1 : 0),
          losses: prev.losses + (won ? 0 : 1),
          profit: prev.profit + change,
          currentLossStreak: nextLossStreak,
          maxLossStreak: Math.max(prev.maxLossStreak, nextLossStreak)
        };
      });
    }
  };

  // Automated Martingale Bot implementation
  const runMartingaleTick = () => {
    const user = currentUserRef.current;
    if (!user || !isBotRunningRef.current) return;

    const currentBet = multiplyBetRef.current;
    if (currentBet > user.balance) {
      setIsBotRunning(false);
      alert('Авто-бот остановлен: превышен доступный баланс.');
      return;
    }

    // Play random HI/LO choice for bot activity
    const botChoiceHigh = Math.random() > 0.5;
    
    // Simulate game
    const rolled = Math.floor(Math.random() * 10000);
    const won = botChoiceHigh ? rolled > 5250 : rolled < 4750;
    const change = won ? currentBet : -currentBet;

    // Record game
    const record = {
      id: Date.now() + Math.random(),
      rolled,
      bet: currentBet,
      isHigh: botChoiceHigh,
      won
    };

    setMultiplyResult({ rolled, won, change, isHigh: botChoiceHigh });
    setMultiplyHistory(prev => [record, ...prev.slice(0, 9)]);

    const updatedUser = {
      ...user,
      balance: user.balance + change
    };
    syncUserToStorage(updatedUser);

    // Martingale betting strategy application
    if (won) {
      // Reset bet on win
      setMultiplyBet(botConfig.baseBet);
      setBotStats(prev => ({
        wins: prev.wins + 1,
        losses: prev.losses,
        profit: prev.profit + change,
        currentLossStreak: 0,
        maxLossStreak: prev.maxLossStreak
      }));
    } else {
      // Double on loss (Martingale)
      const nextBet = currentBet * botConfig.multiplier;
      setMultiplyBet(nextBet);
      setBotStats(prev => {
        const nextLossStreak = prev.currentLossStreak + 1;
        return {
          wins: prev.wins,
          losses: prev.losses + 1,
          profit: prev.profit + change,
          currentLossStreak: nextLossStreak,
          maxLossStreak: Math.max(prev.maxLossStreak, nextLossStreak)
        };
      });
    }
  };

  // Bot process orchestrator
  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isBotRunning && isLoggedIn && currentUser) {
      timer = setInterval(() => {
        runMartingaleTick();
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBotRunning]);

  const toggleBot = () => {
    if (!isBotRunning) {
      setBotStats({ wins: 0, losses: 0, profit: 0, currentLossStreak: 0, maxLossStreak: 0 });
      setMultiplyBet(botConfig.baseBet);
    }
    setIsBotRunning(!isBotRunning);
  };

  // --- SETTINGS DISPATCH ---
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    // Toast update feedback
    alert('Профиль и настройки успешно обновлены!');
  };

  const faqs = [
    {
      q: 'Нужно ли вкладывать деньги?',
      a: 'Нет, получение сатоши абсолютно бесплатно. Вы можете зарабатывать монеты без каких-либо депозитов и вложений. Проект зарабатывает на рекламе и спонсорах, частью доходов делясь со своими пользователями.'
    },
    {
      q: 'Как быстро я могу вывести деньги?',
      a: 'Вывод средств осуществляется на любой криптокошелек. Минимальная сумма вывода составляет всего 0.00010000 BTC. Доступны автоматические выплаты каждое воскресенье (без дополнительных комиссий) или быстрый ручной вывод в течение 6-24 часов.'
    },
    {
      q: 'Это не мошенничество?',
      a: 'Freebitco.in — один из старейших и наиболее авторитетных криптовалютных кранов в мире, работающий без пауз и задержек с 2013 года. Платформа имеет безупречную историю выплат, миллионы подтвержденных отзывов и высокий рейтинг доверия в криптосообществе.'
    },
    {
      q: 'Сколько я могу заработать?',
      a: 'Размер вашего заработка зависит от регулярности посещений и вашей активности в партнерской программе. Пригласив всего 10 активных друзей по вашей ссылке (которую вы получите бесплатно в личном кабинете), вы сможете получать пассивный доход до 0.001 BTC в месяц и даже больше!'
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-[#ffd200]" />,
      title: 'Бесплатные сатоши каждые 60 минут',
      desc: 'Достаточно нажать одну кнопку — и монеты уже на вашем балансе. Никаких сложных капч, коротких ссылок или раздражающих заданий. Всё прозрачно и просто.',
      border: 'hover:border-[#ffd200]/40'
    },
    {
      icon: <Users className="w-8 h-8 text-[#00d4ff]" />,
      title: '50% реферальных комиссионных',
      desc: 'Приводите друзей и получайте половину от их заработка с каждого бесплатного клика и выигрыша. Полностью пассивный доход, работающий на вас 24 часа в сутки.',
      border: 'hover:border-[#00d4ff]/40'
    },
    {
      icon: <Award className="w-8 h-8 text-[#ffd200]" />,
      title: 'Лотерея с джекпотом до 1 BTC',
      desc: 'Каждую неделю разыгрывается крупный призовой фонд. Билеты начисляются автоматически при каждом вашем бесплатном сборе сатоши или сборов ваших рефералов.',
      border: 'hover:border-[#ffd200]/40'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#00d4ff]" />,
      title: 'Умножайте баланс в игре MULTIPLY BTC',
      desc: 'Испытайте свою удачу и математические стратегии в игре HI-LO. Простые правила, мгновенные выигрыши и возможность увеличить баланс вплоть до 100 раз за секунду.',
      border: 'hover:border-[#00d4ff]/40'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Зарегистрируйтесь',
      desc: 'Перейдите по официальной партнерской ссылке, укажите ваш email и пароль. Регистрация занимает ровно 1 минуту и не требует верификации личности (KYC).'
    },
    {
      number: '02',
      title: 'Забирайте BTC каждый час',
      desc: 'Каждые 60 минут заходите на сайт, нажимайте кнопку ROLL в разделе FREE BTC и гарантированно получайте сатоши на баланс. Сумма зависит от выпавшего числа!'
    },
    {
      number: '03',
      title: 'Приглашайте друзей',
      desc: 'Получите свою уникальную партнерскую ссылку в кабинете, делитесь ею и получайте мощный пассивный доход в размере 50% от всей активности ваших рефералов.'
    }
  ];

  const testimonials = [
    {
      name: 'Антон',
      city: 'Киев',
      avatar: 'https://picsum.photos/seed/anton/100/100',
      text: 'Собираю сатоши уже больше полугода в свободное время. Вывел за это время более 0.05 BTC чисто на кликах и нескольких рефералах. Выплаты приходят стабильно каждое воскресенье. Рекомендую!',
      rating: 5
    },
    {
      name: 'Елена',
      city: 'Москва',
      avatar: 'https://picsum.photos/seed/elena/100/100',
      text: 'Реферальная программа на Freebitco — это настоящий Клондайк. Написала небольшой обзор, пригласила около 40 человек из соцсетей, и теперь пассивный доход капает каждую минуту, даже когда я сплю.',
      rating: 5
    },
    {
      name: 'Дмитрий',
      city: 'Алматы',
      avatar: 'https://picsum.photos/seed/dmitry/100/100',
      text: 'Отличный способ накопить стартовый капитал в криптовалюте без риска потерять свои кровные. Использую умножение ставок по системе Мартингейла, получается неплохая прибавка к ежедневному балансу.',
      rating: 5
    }
  ];

  const dynamicRefLink = currentUser ? `https://freebitco.in/?r=${currentUser.refId}` : REF_LINK;

  // Active theme helper
  const theme = themeStyles[dashboardTheme];

  if (isDashboardOpen && isLoggedIn && currentUser) {
    return (
      <div 
        id="dashboard" 
        className={cn("min-h-screen text-slate-100 flex flex-col md:flex-row relative overflow-hidden transition-all duration-500", theme.bg)} 
        style={{ 
          lineHeight: '23px',
          backgroundImage: theme.gradient
        }}
      >
        {/* Animated Background Sparks */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
          <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
          <div className="absolute top-[60%] left-[70%] w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* 1. SIDEBAR NAVIGATION (Desktop) */}
        <aside className="w-full md:w-80 shrink-0 bg-[#070816]/95 border-b md:border-b-0 md:border-r border-white/5 relative z-20 flex flex-col justify-between p-6">
          <div>
            {/* Header / Brand */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-white/5 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 rounded-2xl blur-[8px] opacity-75" />
                <div className="relative w-12 h-12 bg-gradient-to-tr from-[#12132b] to-[#090a18] border border-orange-500/50 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent" />
                  <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-amber-400 via-yellow-200 to-orange-400 drop-shadow-[0_0_10px_rgba(247,151,30,0.7)]">
                    ₿
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-slate-950 shadow-sm">
                    ✦
                  </div>
                </div>
              </div>
              <div>
                <span className="font-['Poppins'] font-black text-2xl tracking-tight text-white flex items-center gap-1">
                  <span>Bit</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Bonus</span>
                  <span className="text-white px-2 py-0.5 bg-orange-500/20 border border-orange-500/40 rounded-lg text-xs font-bold ml-1 text-orange-300">Hub</span>
                </span>
                <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1" style={{ fontFamily: 'Georgia' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Личный кабинет
                </span>
              </div>
            </div>

            {/* Compact Profile Summary */}
            <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 mb-6 flex items-center gap-3">
              <div className="relative">
                <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-xl border border-white/10 object-cover" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#070816] rounded-full" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate flex items-center gap-1.5" style={{ fontFamily: 'Georgia' }}>
                  {currentUser.name}
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.2 rounded-md" style={{ fontFamily: 'Georgia' }}>
                    {currentUser.tier}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{currentUser.email}</div>
              </div>
            </div>

            {/* Balance Ticker Card */}
            <div className="p-4 bg-gradient-to-br from-white/[0.04] to-transparent rounded-2xl border border-white/5 mb-8">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex justify-between items-center">
                <span style={{ fontFamily: 'Georgia' }}>ТЕКУЩИЙ БАЛАНС</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ffd200] animate-ping" />
              </div>
              <div className="font-display font-black text-2xl text-white tracking-tight flex items-baseline gap-1.5">
                <span className="text-orange-400">₿</span>
                <span style={{ fontFamily: 'Verdana' }}>{(currentUser.balance / 100000000).toFixed(8)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#80809a] mt-1 font-mono">
                <span style={{ fontFamily: 'Verdana' }}>{currentUser.balance.toLocaleString('en-US')} SAT</span>
                <span className="text-emerald-400 font-semibold" style={{ fontFamily: 'Verdana' }}>≈ ${(currentUser.balance / 100000000 * btcPrice).toFixed(2)} USD</span>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1.5">
              <button
                onClick={() => { setIsBotRunning(false); setActiveDashboardTab('overview'); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'overview' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <Activity className="w-4 h-4" />
                <span style={{ fontFamily: 'Georgia' }}>Панель управления</span>
              </button>
              <button
                onClick={() => { setIsBotRunning(false); setActiveDashboardTab('faucet'); }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'faucet' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <span className="flex items-center gap-3">
                  <Coins className="w-4 h-4 text-orange-400" />
                  <span style={{ fontFamily: 'Georgia' }}>Кран FREE BTC</span>
                </span>
                {rollStatus.cooldownSeconds === 0 && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                )}
              </button>
              <button
                onClick={() => { setActiveDashboardTab('multiply'); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'multiply' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span style={{ fontFamily: 'Georgia' }}>Умножитель MULTIPLY</span>
              </button>
              <button
                onClick={() => { setIsBotRunning(false); setActiveDashboardTab('referrals'); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'referrals' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <Users className="w-4 h-4 text-[#ffd200]" />
                <span style={{ fontFamily: 'Georgia' }}>Рефералы & Ссылки</span>
              </button>
              <button
                onClick={() => { setIsBotRunning(false); setActiveDashboardTab('calculator'); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'calculator' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span style={{ fontFamily: 'Georgia' }}>Конвертер сатоши</span>
              </button>
              <button
                onClick={() => { setIsBotRunning(false); setActiveDashboardTab('payouts'); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'payouts' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <Wallet className="w-4 h-4 text-amber-400" />
                <span style={{ fontFamily: 'Georgia' }}>Выплаты</span>
              </button>
              <button
                onClick={() => { setIsBotRunning(false); setActiveDashboardTab('settings'); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  activeDashboardTab === 'settings' ? "bg-white/5 text-white border-l-2 border-orange-500" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span style={{ fontFamily: 'Georgia' }}>Настройки кабинета</span>
              </button>

              {/* ADMIN PANEL MENU ITEM */}
              {(currentUser?.isAdmin || currentUser?.email?.toLowerCase().includes('admin') || currentUser?.email?.toLowerCase() === 'vadimmartin@ukr.net' || currentUser?.email === 'demo@freebitco.io') && (
                <button
                  onClick={() => { setIsBotRunning(false); setActiveDashboardTab('admin'); }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all border mt-2",
                    activeDashboardTab === 'admin' 
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-bold" 
                      : "bg-amber-500/5 text-amber-400/90 border-amber-500/20 hover:text-amber-300 hover:bg-amber-500/10"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span style={{ fontFamily: 'Georgia' }}>Панель администратора</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider border border-amber-500/30">
                      Admin
                    </span>
                    {adminPayoutNotifications.filter((n: any) => n.status === 'Ожидает обработки').length > 0 && (
                      <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)]">
                        +{adminPayoutNotifications.filter((n: any) => n.status === 'Ожидает обработки').length}
                      </span>
                    )}
                  </span>
                </button>
              )}
            </nav>
          </div>

          {/* Sidebar Footer Controls */}
          <div className="pt-6 border-t border-white/5 space-y-3">
            <button
              onClick={() => setIsDashboardOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white font-bold transition-all"
              style={{ fontFamily: 'Georgia' }}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Вернуться на лендинг
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-xs text-rose-400 font-bold transition-all"
              style={{ fontFamily: 'Georgia' }}
            >
              <LogOut className="w-4 h-4" />
              Выйти из аккаунта
            </button>
          </div>
        </aside>

        {/* 2. MAIN CABINET AREA */}
        <main className="flex-1 overflow-y-auto relative z-10 flex flex-col min-h-screen">
          {/* Dashboard Sticky Top Bar */}
          <header className="sticky top-0 z-20 bg-[#070816]/70 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h1 className="text-sm font-bold text-white capitalize md:text-lg" style={{ fontFamily: 'Georgia' }}>
                {activeDashboardTab === 'overview' && '📊 Моя аналитика'}
                {activeDashboardTab === 'faucet' && '🎲 Кран FREE BTC'}
                {activeDashboardTab === 'multiply' && '📈 Игра HI-LO Multiplier'}
                {activeDashboardTab === 'referrals' && '🤝 Партнерский центр'}
                {activeDashboardTab === 'calculator' && '🧮 Криптокалькулятор'}
                {activeDashboardTab === 'payouts' && '💸 Выплаты и Вывод средств'}
                {activeDashboardTab === 'settings' && '⚙️ Настройки и Безопасность'}
                {activeDashboardTab === 'admin' && '🛡️ Панель администратора'}
              </h1>
            </div>

            {/* Quick stats on Header */}
            <div className="flex items-center gap-4">
              {/* BTC Ticker widget */}
              <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs" style={{ fontFamily: 'Verdana' }}>
                <span className="font-bold text-slate-400">BTC/USD:</span>
                <span className="font-mono font-bold text-white" style={{ fontFamily: 'Verdana' }}>${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className={cn("text-[10px] font-mono", btcTrend === 'up' ? 'text-emerald-400' : 'text-rose-400')}>
                  {btcTrend === 'up' ? '▲' : '▼'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#ffd200]/10 border border-[#ffd200]/20 rounded-xl px-3 py-1 text-xs text-[#ffd200] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span style={{ fontFamily: 'Verdana' }}>{currentUser.loyaltyPoints} RP</span>
              </div>
            </div>
          </header>

          {/* Dynamic Content Panel */}
          <div className="p-6 md:p-12 max-w-7xl w-full mx-auto space-y-8 flex-1">
            
            {/* TAB 1: OVERVIEW */}
            {activeDashboardTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Welcome message with passive mining notification */}
                <div className="bg-gradient-to-r from-orange-500/10 via-yellow-400/5 to-transparent border border-orange-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="max-w-xl relative z-10">
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded-full font-black uppercase tracking-widest mb-3 inline-block" style={{ fontFamily: 'Georgia' }}>
                      🔥 Активный аккаунт
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: 'Georgia' }}>
                      Добро пожаловать, {currentUser.name}!
                    </h2>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4" style={{ fontFamily: 'Georgia' }}>
                      Рады видеть вас! На вашей панели работает симулятор автоматического майнинга сатоши. Начисление происходит только пока открыта эта вкладка браузера. При закрытии сайта или спящем режиме майнинг останавливается.
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-emerald-400 bg-emerald-400/5 border border-emerald-500/10 px-4 py-2.5 rounded-xl inline-flex">
                      <span className="flex items-center gap-1.5" style={{ fontFamily: 'Georgia' }}>
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Стейкинг-майнер запущен (1 сатоши в 10 минут • Только при открытой вкладке)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Stat A */}
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: 'Georgia' }}>Всего сатоши</div>
                    <div className="font-display font-black text-2xl text-white tracking-tight flex items-baseline gap-1.5">
                      <span className="text-orange-400">₿</span>
                      <span style={{ fontFamily: 'Verdana' }}>{currentUser.balance.toLocaleString('en-US')}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1" style={{ fontFamily: 'Georgia' }}>До вывода: {Math.max(0, 100000 - currentUser.balance).toLocaleString('en-US')} SAT</div>
                  </div>

                  {/* Stat B */}
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: 'Georgia' }}>Сборов с крана</div>
                    <div className="font-display font-black text-2xl text-white tracking-tight flex items-baseline gap-1.5">
                      <Coins className="w-5 h-5 text-[#ffd200]" />
                      <span style={{ fontFamily: 'Verdana' }}>{currentUser.cumulativeClaims}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1" style={{ fontFamily: 'Georgia' }}>Следующий уровень: {10 - (currentUser.cumulativeClaims % 10)} сборов</div>
                  </div>

                  {/* Stat C */}
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: 'Georgia' }}>Награда рефералов</div>
                    <div className="font-display font-black text-2xl text-[#ffd200] tracking-tight flex items-baseline gap-1.5">
                      <Users className="w-5 h-5" />
                      <span style={{ fontFamily: 'Verdana' }}>50%</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1" style={{ fontFamily: 'Georgia' }}>Пассивный доход от ROLL сборов друзей</div>
                  </div>

                  {/* Stat D */}
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: 'Georgia' }}>Лояльность (RP)</div>
                    <div className="font-display font-black text-2xl text-[#00d4ff] tracking-tight flex items-baseline gap-1.5">
                      <Gift className="w-5 h-5" />
                      <span style={{ fontFamily: 'Verdana' }}>{currentUser.loyaltyPoints}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1" style={{ fontFamily: 'Georgia' }}>Используйте RP для баффов на кран (+1000%)</div>
                  </div>
                </div>

                {/* Live Feed and Tier Progression */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Live Activity Feed */}
                  <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4" style={{ fontFamily: 'Georgia' }}>
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5" style={{ fontFamily: 'Georgia' }}>
                        <Activity className="w-4 h-4 text-[#ffd200]" />
                        Живой лог активности партнера
                      </h3>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-md animate-pulse" style={{ fontFamily: 'Georgia' }}>
                        В эфире
                      </span>
                    </div>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {recentNotifications.length === 0 ? (
                        <div className="text-center py-8 text-xs text-[#80809a] italic" style={{ fontFamily: 'Georgia' }}>
                          Ожинение трансляции сборов... (новые начисления поступают каждые несколько секунд)
                        </div>
                      ) : (
                        recentNotifications.map(n => (
                          <div key={n.id} className="p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-between transition-all">
                            <div className="flex items-center gap-2.5 min-w-0">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <p className="text-xs text-slate-300 truncate" style={{ fontFamily: 'Georgia' }}>{n.text}</p>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-3" style={{ fontFamily: 'Verdana' }}>{n.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Tier status */}
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6" style={{ fontFamily: 'Georgia' }}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Уровень лояльности партнера
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">Статус: {currentUser.tier}</span>
                        <span className="text-xs font-mono font-bold text-slate-400">Claims: {currentUser.cumulativeClaims}</span>
                      </div>

                      {/* Progression bar */}
                      <div className="space-y-1.5">
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400" 
                            style={{ width: `${Math.min(100, (currentUser.cumulativeClaims / 50) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Bronze (0)</span>
                          <span>Silver (10)</span>
                          <span>Gold (25)</span>
                          <span>Platinum (50)</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-slate-400 leading-relaxed">
                        <p className="font-bold text-white mb-1">🎁 Ваши привилегии:</p>
                        🔹 Бонус к сборам крана: +{(currentUser.cumulativeClaims > 50 ? 50 : currentUser.cumulativeClaims > 25 ? 25 : currentUser.cumulativeClaims > 10 ? 10 : 0)}% сатоши!<br />
                        🔹 Дополнительные билеты за каждый ROLL: +2 лотерейных билета.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: FREE BTC (FAUCET) */}
            {activeDashboardTab === 'faucet' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Rolling Slot machine and claims block */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl p-8 text-center space-y-8 relative overflow-hidden" style={{ fontFamily: 'Georgia' }}>
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
                    
                    <div>
                      <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia' }}>Ежечасный сбор бесплатных Биткоинов</h2>
                      <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                        Нажмите кнопку ниже, чтобы запустить генератор счастливых чисел. Сумма начисления зависит от выпавшей комбинации!
                      </p>
                    </div>

                    {/* SLOT REELS MACHINE */}
                    <div className="flex justify-center items-center gap-3">
                      {rollStatus.rolledDigits.map((digit, idx) => (
                        <div 
                          key={idx} 
                          className={cn(
                            "w-12 h-20 md:w-16 md:h-24 rounded-2xl bg-[#090b1c] border-2 flex items-center justify-center font-display font-black text-3xl md:text-5xl tracking-tight shadow-inner select-none transition-all duration-150",
                            rollStatus.isRolling ? "border-[#ffd200]/40 text-orange-400 animate-pulse" : "border-white/10 text-white"
                          )}
                        >
                          {digit}
                        </div>
                      ))}
                    </div>

                    {/* ROLL BUTTON OR COOLDOWN */}
                    <div className="flex flex-col items-center gap-3">
                      {rollStatus.cooldownSeconds > 0 ? (
                        <div className="space-y-2">
                          <div className="text-slate-400 text-xs font-bold flex items-center justify-center gap-1.5">
                            <Clock className="w-4 h-4 text-orange-400" />
                            Следующий сбор доступен через:
                          </div>
                          <div className="font-mono text-2xl font-extrabold text-white bg-white/5 border border-white/10 px-6 py-2.5 rounded-2xl tracking-widest inline-block">
                            {Math.floor(rollStatus.cooldownSeconds / 3600).toString().padStart(2, '0')} : {Math.floor((rollStatus.cooldownSeconds % 3600) / 60).toString().padStart(2, '0')} : {(rollStatus.cooldownSeconds % 60).toString().padStart(2, '0')}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={triggerFreeRoll}
                          disabled={rollStatus.isRolling}
                          className={cn(
                            "px-10 py-5 bg-gradient-to-r rounded-2xl text-slate-900 font-extrabold text-lg shadow-xl tracking-wide transition-all scale-100 active:scale-95 duration-200",
                            rollStatus.isRolling ? "from-slate-700 to-slate-800 text-slate-400 cursor-not-allowed" : theme.accentButton
                          )}
                          style={{ fontFamily: 'Georgia' }}
                        >
                          {rollStatus.isRolling ? 'Генерация счастливого числа...' : '🎲 КЛИКНУТЬ ROLL'}
                        </button>
                      )}
                    </div>

                    {/* ROLL RESULT ANNOUNCEMENT */}
                    <AnimatePresence>
                      {rollStatus.finalNumber !== null && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          exit={{ opacity: 0 }} 
                          className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-2"
                          style={{ fontFamily: 'Georgia' }}
                        >
                          <div className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Выигрыш начислен!
                          </div>
                          <div className="text-sm text-white font-medium">
                            Счастливое число: <span className="font-mono font-bold text-[#ffd200]">{rollStatus.finalNumber}</span>
                          </div>
                          <div className="text-lg font-black text-white">
                            Получено: <span className="text-emerald-400">+{rollStatus.winAmount} Сатоши</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Также начислено +2 бесплатных лотерейных билета и +2 RP балла</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

                {/* Reward Odds Table column */}
                <div className="p-6 bg-[#070816]/80 border border-white/5 rounded-3xl space-y-4" style={{ fontFamily: 'Georgia' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                    Таблица выигрышных чисел
                  </h3>

                  <div className="space-y-2 text-xs">
                    {/* Header of table */}
                    <div className="flex justify-between text-[#80809a] font-bold pb-1 text-[10px]">
                      <span>Счастливое число</span>
                      <span>Выплата сатоши</span>
                    </div>

                    {/* Rows */}
                    {[
                      { range: '0 - 9885', val: '5 Satoshis', active: rollStatus.finalNumber !== null && rollStatus.finalNumber <= 9885 },
                      { range: '9886 - 9985', val: '10 Satoshis', active: rollStatus.finalNumber !== null && rollStatus.finalNumber >= 9886 && rollStatus.finalNumber <= 9985 },
                      { range: '9986 - 9993', val: '100 Satoshis', active: rollStatus.finalNumber !== null && rollStatus.finalNumber >= 9986 && rollStatus.finalNumber <= 9993 },
                      { range: '9994 - 9997', val: '1,000 Satoshis', active: rollStatus.finalNumber !== null && rollStatus.finalNumber >= 9994 && rollStatus.finalNumber <= 9997 },
                      { range: '9998 - 9999', val: '10,000 Satoshis', active: rollStatus.finalNumber !== null && rollStatus.finalNumber >= 9998 && rollStatus.finalNumber <= 9999 },
                      { range: '10000', val: '100,000 Satoshis', active: rollStatus.finalNumber === 10000 }
                    ].map((row, idx) => (
                      <div 
                        key={idx} 
                        className={cn(
                          "flex justify-between items-center p-3.5 rounded-xl border transition-all",
                          row.active ? "bg-[#ffd200]/10 border-[#ffd200] text-white font-bold" : "bg-white/[0.01] border-white/5 text-slate-300"
                        )}
                      >
                        <span className="font-mono">{row.range}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: MULTIPLY BTC (HI-LO & BOT) */}
            {activeDashboardTab === 'multiply' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                
                {/* Description info */}
                <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ fontFamily: 'Georgia' }}>
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      MULTIPLY BTC: Испытайте свою стратегию умножения ставок
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Делайте ставки на HIGH (число больше 5250) или LOW (число меньше 4750) для мгновенного удвоения ваших сатоши!
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-2xl text-xs font-mono">
                    Выиграйте 2x от ставки! (Мин 1 SAT)
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Manual Game Box */}
                  <div className="lg:col-span-2 p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl space-y-6" style={{ fontFamily: 'Georgia' }}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2 flex items-center gap-1">
                      🕹️ Ручные ставки
                    </h3>

                    {/* Inputs */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] text-slate-400 font-bold mb-1.5 uppercase">Размер ставки (SAT)</label>
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            value={multiplyBet}
                            onChange={(e) => setMultiplyBet(Math.max(1, parseInt(e.target.value) || 1))}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400/50"
                            disabled={isBotRunning}
                          />
                          <button 
                            onClick={() => setMultiplyBet(Math.max(1, Math.floor(multiplyBet / 2)))}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 text-xs font-bold text-slate-300"
                            disabled={isBotRunning}
                          >
                            /2
                          </button>
                          <button 
                            onClick={() => setMultiplyBet(multiplyBet * 2)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 text-xs font-bold text-slate-300"
                            disabled={isBotRunning}
                          >
                            2x
                          </button>
                          <button 
                            onClick={() => setMultiplyBet(1)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 text-[10px] font-bold text-slate-300"
                            disabled={isBotRunning}
                          >
                            MIN
                          </button>
                          <button 
                            onClick={() => setMultiplyBet(currentUser.balance)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 text-[10px] font-bold text-slate-300"
                            disabled={isBotRunning}
                          >
                            MAX
                          </button>
                        </div>
                      </div>

                      {/* Manual betting buttons */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => playHiLo(true)}
                          disabled={isBotRunning}
                          className={cn(
                            "py-4 bg-[#10b981] hover:bg-[#059669] text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all duration-150 flex flex-col items-center justify-center gap-1",
                            isBotRunning && "opacity-50 cursor-not-allowed"
                          )}
                          style={{ fontFamily: 'Georgia' }}
                        >
                          <span>BET HIGH 📈</span>
                          <span className="text-[9px] font-normal tracking-normal lowercase">(число &gt; 5250)</span>
                        </button>
                        <button
                          onClick={() => playHiLo(false)}
                          disabled={isBotRunning}
                          className={cn(
                            "py-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all duration-150 flex flex-col items-center justify-center gap-1",
                            isBotRunning && "opacity-50 cursor-not-allowed"
                          )}
                          style={{ fontFamily: 'Georgia' }}
                        >
                          <span>BET LOW 📉</span>
                          <span className="text-[9px] font-normal tracking-normal lowercase">(число &lt; 4750)</span>
                        </button>
                      </div>
                    </div>

                    {/* Result feedback */}
                    <AnimatePresence mode="wait">
                      {multiplyResult.rolled !== null && (
                        <motion.div 
                          key={multiplyResult.rolled}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className={cn(
                            "p-4 rounded-2xl border text-center flex items-center justify-between px-6",
                            multiplyResult.won ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                          )}
                        >
                          <div className="text-left">
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                              Ставка: {multiplyResult.isHigh ? 'HIGH' : 'LOW'}
                            </span>
                            <div className="text-lg font-black text-white">
                              Выпало число: <span className="font-mono text-[#ffd200]">{multiplyResult.rolled}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase block font-bold">результат</span>
                            <span className="text-xl font-black">
                              {multiplyResult.won ? `+${multiplyResult.change} SAT 🎉` : `${multiplyResult.change} SAT 😢`}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Martingale Auto Bot controls */}
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6" style={{ fontFamily: 'Georgia' }}>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-cyan-400" />
                        Авто-Бот Мартингейла
                      </h3>
                      {isBotRunning && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Configuration */}
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Базовая ставка (SAT)</label>
                        <input 
                          type="number" 
                          value={botConfig.baseBet}
                          onChange={(e) => setBotConfig(prev => ({ ...prev, baseBet: Math.max(1, parseInt(e.target.value) || 1) }))}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400/50"
                          disabled={isBotRunning}
                        />
                      </div>

                      <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 text-[11px] text-slate-400 leading-relaxed">
                        <p className="font-bold text-white flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-[#00d4ff]" /> Как работает бот:
                        </p>
                        Он делает случайные ставки. В случае <span className="text-rose-400 font-bold">проигрыша</span> он <span className="text-white font-bold">удваивает ставку</span>. В случае <span className="text-emerald-400 font-bold">выигрыша</span> он сбрасывает ставку до базовой.
                      </div>

                      {/* Bot Statistics */}
                      {isBotRunning && (
                        <div className="p-4 bg-[#090b1c] border border-white/10 rounded-xl space-y-2 font-mono text-xs">
                          <div className="flex justify-between text-slate-400 font-bold border-b border-white/5 pb-1">
                            <span>СТАТИСТИКА РОБОТА</span>
                            <span className="text-emerald-400">АКТИВЕН</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Побед/Поражений:</span>
                            <span>{botStats.wins} / {botStats.losses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Профит бота:</span>
                            <span className={cn(botStats.profit >= 0 ? "text-emerald-400" : "text-rose-400")}>
                              {botStats.profit >= 0 ? `+${botStats.profit}` : botStats.profit} SAT
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Макс. слив стрик:</span>
                            <span className="text-red-400">{botStats.maxLossStreak}</span>
                          </div>
                        </div>
                      )}

                      {/* Start / Stop */}
                      <button
                        onClick={toggleBot}
                        className={cn(
                          "w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-150 flex items-center justify-center gap-2",
                          isBotRunning ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-[#00d4ff] text-slate-900 hover:bg-[#00b5da]"
                        )}
                        style={{ fontFamily: 'Georgia' }}
                      >
                        {isBotRunning ? (
                          <>
                            <Square className="w-4 h-4 shrink-0 fill-current" />
                            Остановить авто-бота
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 shrink-0 fill-current" />
                            Запустить Мартингейла
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Multiply Game Logs Footer */}
                {multiplyHistory.length > 0 && (
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">История ставок</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {multiplyHistory.map(h => (
                        <div 
                          key={h.id} 
                          className={cn(
                            "p-2.5 rounded-xl border text-center font-mono text-[10px]",
                            h.won ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-rose-500/5 border-rose-500/20 text-rose-400"
                          )}
                        >
                          <div className="font-bold">Roll: {h.rolled}</div>
                          <div>{h.isHigh ? 'HIGH' : 'LOW'} | {h.won ? `+${h.bet}` : `-${h.bet}`}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 4: REFERRALS */}
            {activeDashboardTab === 'referrals' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                
                {/* QR and share links block */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl space-y-6" style={{ fontFamily: 'Georgia' }}>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5" style={{ fontFamily: 'Georgia' }}>
                      <Users className="w-5 h-5 text-[#ffd200]" />
                      Ваша реферальная конфигурация
                    </h3>
                    <p className="text-xs text-slate-400">
                      Вы можете указать ваш собственный партнерский ID от Freebitco.in. После его сохранения абсолютно все партнерские ссылки на этом лендинге обновятся, и вы сможете привлекать людей напрямую к вашей команде!
                    </p>

                    <div className="space-y-4">
                      {/* ID config input */}
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold mb-1.5 uppercase">Ваш партнерский ID (Реферал ID)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={currentUser.refId}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                              const updated = { ...currentUser, refId: val };
                              syncUserToStorage(updated);
                            }}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#ffd200]/50"
                            placeholder="Укажите ваш ID, например: 264521"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(dynamicRefLink);
                              alert('Уникальная партнерская ссылка успешно скопирована!');
                            }}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors"
                          >
                            <Copy className="w-4 h-4" /> Копировать ссылку
                          </button>
                        </div>
                      </div>

                      {/* Display of live generated URL */}
                      <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-[10px] text-slate-300 break-all">
                        <span className="font-bold text-[#ffd200]">Активная реф-ссылка сайта:</span> {dynamicRefLink}
                      </div>
                    </div>
                  </div>

                  {/* QR code representation */}
                  <div className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl text-center flex flex-col items-center justify-center space-y-5" style={{ fontFamily: 'Georgia' }}>
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Уникальный QR-Код реферала</h4>
                    </div>
                    
                    {/* Beautiful QR box representation */}
                    <div className="p-4 bg-gradient-to-b from-amber-500/20 via-orange-500/10 to-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                      <div className="relative p-3 bg-slate-950 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                        <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Dark rounded background */}
                          <rect width="100" height="100" rx="10" fill="#030712" />
                          
                          {/* Finder Pattern 1 (Top Left) */}
                          <rect x="8" y="8" width="26" height="26" rx="6" fill="#f59e0b" />
                          <rect x="12" y="12" width="18" height="18" rx="4" fill="#030712" />
                          <rect x="16" y="16" width="10" height="10" rx="2" fill="#f59e0b" />

                          {/* Finder Pattern 2 (Top Right) */}
                          <rect x="66" y="8" width="26" height="26" rx="6" fill="#f59e0b" />
                          <rect x="70" y="12" width="18" height="18" rx="4" fill="#030712" />
                          <rect x="74" y="16" width="10" height="10" rx="2" fill="#f59e0b" />

                          {/* Finder Pattern 3 (Bottom Left) */}
                          <rect x="8" y="66" width="26" height="26" rx="6" fill="#f59e0b" />
                          <rect x="12" y="70" width="18" height="18" rx="4" fill="#030712" />
                          <rect x="16" y="74" width="10" height="10" rx="2" fill="#f59e0b" />

                          {/* Matrix Data Modules */}
                          <circle cx="40" cy="11" r="2.2" fill="#cbd5e1" />
                          <circle cx="47" cy="11" r="2.2" fill="#f59e0b" />
                          <circle cx="54" cy="11" r="2.2" fill="#f59e0b" />
                          <circle cx="60" cy="11" r="2.2" fill="#cbd5e1" />

                          <circle cx="40" cy="18" r="2.2" fill="#f59e0b" />
                          <circle cx="47" cy="18" r="2.2" fill="#cbd5e1" />
                          <circle cx="54" cy="18" r="2.2" fill="#cbd5e1" />
                          <circle cx="60" cy="18" r="2.2" fill="#f59e0b" />

                          <circle cx="40" cy="25" r="2.2" fill="#cbd5e1" />
                          <circle cx="47" cy="25" r="2.2" fill="#f59e0b" />
                          <circle cx="54" cy="25" r="2.2" fill="#cbd5e1" />
                          <circle cx="60" cy="25" r="2.2" fill="#cbd5e1" />

                          <circle cx="11" cy="40" r="2.2" fill="#cbd5e1" />
                          <circle cx="18" cy="40" r="2.2" fill="#f59e0b" />
                          <circle cx="25" cy="40" r="2.2" fill="#cbd5e1" />
                          <circle cx="32" cy="40" r="2.2" fill="#cbd5e1" />
                          <circle cx="40" cy="40" r="2.2" fill="#cbd5e1" />
                          <circle cx="60" cy="40" r="2.2" fill="#f59e0b" />
                          <circle cx="67" cy="40" r="2.2" fill="#cbd5e1" />
                          <circle cx="75" cy="40" r="2.2" fill="#cbd5e1" />
                          <circle cx="82" cy="40" r="2.2" fill="#f59e0b" />
                          <circle cx="89" cy="40" r="2.2" fill="#cbd5e1" />

                          <circle cx="11" cy="47" r="2.2" fill="#f59e0b" />
                          <circle cx="25" cy="47" r="2.2" fill="#cbd5e1" />
                          <circle cx="32" cy="47" r="2.2" fill="#f59e0b" />
                          <circle cx="67" cy="47" r="2.2" fill="#f59e0b" />
                          <circle cx="75" cy="47" r="2.2" fill="#cbd5e1" />
                          <circle cx="82" cy="47" r="2.2" fill="#cbd5e1" />
                          <circle cx="89" cy="47" r="2.2" fill="#f59e0b" />

                          <circle cx="18" cy="54" r="2.2" fill="#cbd5e1" />
                          <circle cx="25" cy="54" r="2.2" fill="#cbd5e1" />
                          <circle cx="32" cy="54" r="2.2" fill="#cbd5e1" />
                          <circle cx="67" cy="54" r="2.2" fill="#cbd5e1" />
                          <circle cx="75" cy="54" r="2.2" fill="#f59e0b" />
                          <circle cx="82" cy="54" r="2.2" fill="#cbd5e1" />
                          <circle cx="89" cy="54" r="2.2" fill="#cbd5e1" />

                          <circle cx="40" cy="60" r="2.2" fill="#f59e0b" />
                          <circle cx="47" cy="60" r="2.2" fill="#cbd5e1" />
                          <circle cx="54" cy="60" r="2.2" fill="#cbd5e1" />
                          <circle cx="60" cy="60" r="2.2" fill="#f59e0b" />

                          <circle cx="40" cy="67" r="2.2" fill="#cbd5e1" />
                          <circle cx="54" cy="67" r="2.2" fill="#f59e0b" />
                          <circle cx="67" cy="67" r="2.2" fill="#f59e0b" />
                          <circle cx="75" cy="67" r="2.2" fill="#cbd5e1" />
                          <circle cx="82" cy="67" r="2.2" fill="#f59e0b" />
                          <circle cx="89" cy="67" r="2.2" fill="#cbd5e1" />

                          <circle cx="40" cy="75" r="2.2" fill="#f59e0b" />
                          <circle cx="47" cy="75" r="2.2" fill="#cbd5e1" />
                          <circle cx="60" cy="75" r="2.2" fill="#cbd5e1" />
                          <circle cx="67" cy="75" r="2.2" fill="#cbd5e1" />
                          <circle cx="82" cy="75" r="2.2" fill="#cbd5e1" />
                          <circle cx="89" cy="75" r="2.2" fill="#f59e0b" />

                          <circle cx="40" cy="82" r="2.2" fill="#cbd5e1" />
                          <circle cx="54" cy="82" r="2.2" fill="#f59e0b" />
                          <circle cx="67" cy="82" r="2.2" fill="#f59e0b" />
                          <circle cx="75" cy="82" r="2.2" fill="#cbd5e1" />
                          <circle cx="89" cy="82" r="2.2" fill="#cbd5e1" />

                          <circle cx="47" cy="89" r="2.2" fill="#f59e0b" />
                          <circle cx="60" cy="89" r="2.2" fill="#cbd5e1" />
                          <circle cx="75" cy="89" r="2.2" fill="#f59e0b" />
                          <circle cx="82" cy="89" r="2.2" fill="#cbd5e1" />

                          {/* Center Emblem */}
                          <rect x="36" y="36" width="28" height="28" rx="8" fill="#030712" stroke="#f59e0b" strokeWidth="2" />
                          <text x="50" y="55" fontSize="16" fontWeight="bold" fill="#f59e0b" textAnchor="middle" fontFamily="Georgia, serif">₿</text>
                        </svg>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                      Сканируя QR-код, партнеры мгновенно перейдут на этот лендинг по вашей реферальной ссылке.
                    </p>

                    <button
                      onClick={() => {
                        alert('QR-код готов к печати и сохранению!');
                      }}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> Скачать QR для печати
                    </button>
                  </div>
                </div>

                {/* Team members list */}
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4" style={{ fontFamily: 'Georgia' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                    Активные рефералы в вашей структуре
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-300">
                      <thead className="text-[#80809a] font-bold uppercase text-[10px]">
                        <tr>
                          <th className="pb-3">Имя пользователя</th>
                          <th className="pb-3 text-center">Статус</th>
                          <th className="pb-3 text-right">Накоплено сатоши</th>
                          <th className="pb-3 text-right text-[#ffd200]">Ваша доля (50%)</th>
                          <th className="pb-3 text-right">Дата регистрации</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {referralList.map(ref => (
                          <tr key={ref.id} className="hover:bg-white/[0.01] transition-colors">
                            <td className="py-3 flex items-center gap-2">
                              <img src={ref.avatar} alt="Avatar" className="w-6.5 h-6.5 rounded-md border border-white/10" />
                              <span className="font-bold">{ref.name}</span>
                            </td>
                            <td className="py-3 text-center">
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                                ref.status === 'online' ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"
                              )}>
                                {ref.status === 'online' ? 'В сети' : 'Неактивен'}
                              </span>
                            </td>
                            <td className="py-3 text-right font-mono">{ref.claimed.toLocaleString('en-US')} SAT</td>
                            <td className="py-3 text-right font-mono text-emerald-400 font-bold">{(ref.claimed * 0.5).toLocaleString('en-US')} SAT</td>
                            <td className="py-3 text-right text-slate-400 font-mono">{ref.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: CALCULATOR */}
            {activeDashboardTab === 'calculator' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl space-y-6" style={{ fontFamily: 'Georgia' }}>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia' }}>Двунаправленный калькулятор конверсии</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Введите любую сумму для автоматического пересчета в эквиваленты на основе текущего курса Биткоина!
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Satoshi input */}
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-black uppercase">Сумма в Сатоши (SAT)</label>
                    <input 
                      type="text" 
                      value={calcSatoshi}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setCalcSatoshi(val);
                      }}
                      className="w-full bg-transparent border-0 text-white text-xl font-mono font-bold focus:outline-none p-0 focus:ring-0"
                    />
                  </div>

                  {/* BTC input */}
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-black uppercase">Эквивалент в Биткоин (BTC)</label>
                    <input 
                      type="text" 
                      value={calcBtc}
                      onChange={(e) => {
                        const btcStr = e.target.value.replace(/[^0-9.]/g, '');
                        setCalcBtc(btcStr);
                        const num = parseFloat(btcStr);
                        if (!isNaN(num)) {
                          setCalcSatoshi((num * 100000000).toFixed(0));
                        }
                      }}
                      className="w-full bg-transparent border-0 text-white text-xl font-mono font-bold focus:outline-none p-0 focus:ring-0"
                    />
                  </div>

                  {/* USD input */}
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-black uppercase">Стоимость в Долларах США (USD)</label>
                    <input 
                      type="text" 
                      value={calcUsd}
                      onChange={(e) => {
                        const usdStr = e.target.value.replace(/[^0-9.]/g, '');
                        setCalcUsd(usdStr);
                        const num = parseFloat(usdStr);
                        if (!isNaN(num)) {
                          const satVal = (num / btcPrice) * 100000000;
                          setCalcSatoshi(satVal.toFixed(0));
                        }
                      }}
                      className="w-full bg-transparent border-0 text-[#10b981] text-xl font-mono font-bold focus:outline-none p-0 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl text-[11px] text-slate-400 text-center leading-relaxed">
                  💰 Расчет произведен на основе динамического симулированного курса <span className="text-white font-bold">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} за 1 BTC</span>.
                </div>
              </motion.div>
            )}

            {/* TAB: PAYOUTS */}
            {activeDashboardTab === 'payouts' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8" style={{ fontFamily: 'Georgia' }}>
                
                {/* Balance and Wallet overview header card */}
                <div className="p-6 bg-gradient-to-r from-orange-500/10 via-amber-400/5 to-transparent border border-orange-500/20 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1" style={{ fontFamily: 'Georgia' }}>Доступно к выводу</div>
                    <div className="text-2xl font-black text-white font-mono flex items-baseline gap-2">
                      <span className="text-orange-400 font-sans">₿</span>
                      <span style={{ fontFamily: 'Verdana' }}>{currentUser?.balance.toLocaleString('en-US')}</span>
                      <span className="text-xs text-slate-400 font-normal font-sans">SAT</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold mt-1" style={{ fontFamily: 'Verdana' }}>
                      ≈ ${((currentUser?.balance || 0) / 100000000 * btcPrice).toFixed(2)} USD
                    </div>
                  </div>

                  <div className="md:col-span-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between items-center">
                      <span>Адрес получения выплат (Bitcoin Wallet)</span>
                      <span className="text-emerald-400 font-normal">Подтвержден</span>
                    </div>
                    <div className="font-mono text-xs text-amber-300 font-bold truncate bg-black/30 p-2.5 rounded-xl border border-white/5">
                      {currentUser?.wallet || 'bc1qxy2kg3ut7v6396t88372864839201019183'}
                    </div>
                  </div>
                </div>

                {/* Form to Request Withdrawal */}
                <div className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-white/5 pb-2 flex items-center gap-2" style={{ fontFamily: 'Georgia' }}>
                    <Wallet className="w-5 h-5 text-amber-400" />
                    Заявка на вывод средств
                  </h3>

                  {payoutStatus && (
                    <div className={cn(
                      "p-4 rounded-2xl border text-xs font-bold leading-relaxed",
                      payoutStatus.success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                    )}>
                      {payoutStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleRequestPayout} className="space-y-6">
                    {/* Speed options */}
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Режим обработки выплаты</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPayoutSpeed('auto')}
                          className={cn(
                            "p-4 rounded-2xl border text-left transition-all space-y-1.5",
                            payoutSpeed === 'auto' ? "bg-orange-500/15 border-orange-500/40 text-white" : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                          )}
                        >
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>AUTO (Еженедельный)</span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">0 SAT комиссия</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Автоматически каждое воскресенье при балансе &gt; 30,000 SAT</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPayoutSpeed('slow')}
                          className={cn(
                            "p-4 rounded-2xl border text-left transition-all space-y-1.5",
                            payoutSpeed === 'slow' ? "bg-orange-500/15 border-orange-500/40 text-white" : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                          )}
                        >
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>SLOW (Стандарт)</span>
                            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">1,000 SAT</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Обработка в течение 6 - 24 часов на указанный биткоин-кошелек</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPayoutSpeed('instant')}
                          className={cn(
                            "p-4 rounded-2xl border text-left transition-all space-y-1.5",
                            payoutSpeed === 'instant' ? "bg-orange-500/15 border-orange-500/40 text-white" : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                          )}
                        >
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>INSTANT (Мгновенный)</span>
                            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">5,000 SAT</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Мгновенная отправка транзакции в сеть Bitcoin в течение 15 минут</div>
                        </button>
                      </div>
                    </div>

                    {/* Amount input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-slate-400 font-bold uppercase tracking-wider">Сумма вывода (SAT)</label>
                        <button
                          type="button"
                          onClick={() => setWithdrawAmount((currentUser?.balance || 0).toString())}
                          className="text-orange-400 hover:underline font-bold"
                        >
                          Вывести все средства ({currentUser?.balance.toLocaleString('en-US')} SAT)
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          min="30000"
                          placeholder="Мин. 30,000 SAT"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-orange-500/50"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                          ≈ ${(((parseInt(withdrawAmount, 10) || 0) / 100000000) * btcPrice).toFixed(2)} USD
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 hover:from-orange-400 hover:to-yellow-300 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                      Запросить выплату средств
                    </button>
                  </form>
                </div>

                {/* Transaction history table */}
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                    История транзакций выплат
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-white/5 text-[10px] uppercase tracking-wider">
                          <th className="pb-3 font-bold">ID / Дата</th>
                          <th className="pb-3 font-bold">Сумма</th>
                          <th className="pb-3 font-bold">Комиссия</th>
                          <th className="pb-3 font-bold">Статус</th>
                          <th className="pb-3 font-bold text-right">Хеш TXID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {payoutHistory.map((tx) => (
                          <tr key={tx.id} className="hover:bg-white/[0.01]">
                            <td className="py-3 font-mono">
                              <div className="text-white font-bold">{tx.id}</div>
                              <div className="text-[10px] text-slate-500" style={{ fontFamily: 'Verdana' }}>{tx.date}</div>
                            </td>
                            <td className="py-3 font-mono font-bold text-amber-300" style={{ fontFamily: 'Verdana' }}>
                              {tx.amount.toLocaleString('en-US')} SAT
                            </td>
                            <td className="py-3 font-mono text-slate-400" style={{ fontFamily: 'Verdana' }}>
                              {tx.fee.toLocaleString('en-US')} SAT
                            </td>
                            <td className="py-3">
                              <span className={cn(
                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                tx.status === 'Завершен' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              )}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="py-3 font-mono text-right text-slate-400 text-[11px]">
                              {tx.txid}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeDashboardTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8" style={{ fontFamily: 'Georgia' }}>
                
                {/* Form parameters */}
                <form onSubmit={handleUpdateProfile} className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-white/5 pb-2 flex items-center gap-2" style={{ fontFamily: 'Georgia' }}>
                    <Settings className="w-5 h-5 text-purple-400" />
                    Настройки партнерского аккаунта
                  </h3>

                  {/* Profile Name & Wallet info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Отображаемое имя (Никнейм)</label>
                      <input 
                        type="text" 
                        value={currentUser.name}
                        onChange={(e) => {
                          const updated = { ...currentUser, name: e.target.value };
                          syncUserToStorage(updated);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-purple-400/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Ваш Биткоин-адрес для выплат</label>
                      <input 
                        type="text" 
                        value={currentUser.wallet}
                        onChange={(e) => {
                          const updated = { ...currentUser, wallet: e.target.value };
                          syncUserToStorage(updated);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-purple-400/50"
                      />
                    </div>
                  </div>

                  {/* Avatar configuration */}
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-2 uppercase">Выберите аватар</label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        'https://picsum.photos/seed/avatar1/100/100',
                        'https://picsum.photos/seed/avatar2/100/100',
                        'https://picsum.photos/seed/avatar3/100/100',
                        'https://picsum.photos/seed/avatar4/100/100',
                        'https://picsum.photos/seed/avatar5/100/100',
                        'https://picsum.photos/seed/avatar6/100/100'
                      ].map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const updated = { ...currentUser, avatar: url };
                            syncUserToStorage(updated);
                          }}
                          className={cn(
                            "w-14 h-14 rounded-xl overflow-hidden border-2 relative group transition-all",
                            currentUser.avatar === url ? "border-purple-400 scale-105" : "border-white/10 hover:border-purple-400/40"
                          )}
                        >
                          <img src={url} alt="Avatar Selection" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Referral share slider configuration */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase">Автоматический возврат комиссии (Shared Referral Cash-Back)</label>
                      <span className="text-xs font-mono font-bold text-[#ffd200] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg">
                        {currentUser.refShare}%
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      step="25"
                      value={currentUser.refShare}
                      onChange={(e) => {
                        const updated = { ...currentUser, refShare: parseInt(e.target.value) };
                        syncUserToStorage(updated);
                      }}
                      className="w-full accent-purple-500 bg-white/5 rounded-lg h-2 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-500">
                      Установите процент вашей реферальной комиссии, которым вы будете делиться со своей командой. Более высокий процент привлекает на 200% больше партнеров в вашу сеть!
                    </p>
                  </div>

                  {/* Color theme settings */}
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-2 uppercase">Цветовая гамма кабинета</label>
                    <div className="flex gap-3">
                      {[
                        { key: 'gold', name: 'Золотой Амбер', bg: 'bg-[#ffd200]' },
                        { key: 'cyan', name: 'Кибер Синий', bg: 'bg-[#00d4ff]' },
                        { key: 'purple', name: 'Королевский Пурпур', bg: 'bg-[#c084fc]' },
                        { key: 'emerald', name: 'Изумрудный Кэш', bg: 'bg-[#10b981]' }
                      ].map(t => (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setDashboardTheme(t.key as any)}
                          className={cn(
                            "px-3 py-2 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all",
                            dashboardTheme === t.key ? "bg-white/5 border-white/20 text-white" : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white"
                          )}
                        >
                          <span className={cn("w-2.5 h-2.5 rounded-full inline-block", t.bg)} />
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 text-right">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-widest shadow-lg transition-all"
                    >
                      Сохранить настройки
                    </button>
                  </div>
                </form>

                {/* 2FA Security Simulator panel */}
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-rose-400" />
                    Двухфакторная аутентификация (2FA)
                  </h3>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-xs text-slate-400 max-w-lg">
                      Защитите свой аккаунт с помощью Google Authenticator. При включении 2FA при входе в личный кабинет будет требоваться ввод случайного 6-значного токена.
                    </p>
                    <button
                      onClick={() => {
                        const updated = { ...currentUser, twoFactorEnabled: !currentUser.twoFactorEnabled };
                        syncUserToStorage(updated);
                        alert(updated.twoFactorEnabled ? '2FA Успешно симулирован и активирован на вашем аккаунте!' : '2FA Успешно деактивирован.');
                      }}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all",
                        currentUser.twoFactorEnabled ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      )}
                    >
                      {currentUser.twoFactorEnabled ? 'Активировано (Выключить)' : 'Деактивировано (Включить)'}
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 7: ADMIN PANEL */}
            {activeDashboardTab === 'admin' && (currentUser?.isAdmin || currentUser?.email?.toLowerCase().includes('admin') || currentUser?.email?.toLowerCase() === 'vadimmartin@ukr.net' || currentUser?.email === 'demo@freebitco.io') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8" style={{ fontFamily: 'Georgia' }}>
                
                {/* Admin Header Banner */}
                <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest mb-3 inline-block">
                        🛡️ Полный доступ
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                        Панель администратора
                      </h2>
                      <p className="text-xs text-slate-400">
                        Центр управления платформой BitBonusHub. Управление пользователями, балансами, курсом BTC и анонсом в трансляцию.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-slate-950/80 border border-amber-500/30 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold text-amber-300 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Статус: Администратор</span>
                    </div>
                  </div>
                </div>

                {/* Quick Platform Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 bg-white/[0.02] border border-amber-500/20 rounded-2xl">
                    <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Всего аккаунтов</div>
                    <div className="font-display font-black text-2xl text-white tracking-tight flex items-baseline gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span style={{ fontFamily: 'Verdana' }}>{adminUsersList.length || 1}</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono">Все профили активны</div>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-amber-500/20 rounded-2xl">
                    <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Курс BTC / USD</div>
                    <div className="font-display font-black text-2xl text-white tracking-tight flex items-baseline gap-1.5">
                      <span className="text-orange-400">$</span>
                      <span style={{ fontFamily: 'Verdana' }}>{btcPrice.toLocaleString('en-US')}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">Реальный зафиксированный курс</div>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-amber-500/20 rounded-2xl">
                    <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Счетчик выплат</div>
                    <div className="font-display font-black text-2xl text-emerald-400 tracking-tight flex items-baseline gap-1.5">
                      <DollarSign className="w-5 h-5" />
                      <span style={{ fontFamily: 'Verdana' }}>{totalPaidOut.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">Базовый фиксированный счетчик</div>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-amber-500/20 rounded-2xl">
                    <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Состояние сервера</div>
                    <div className="font-display font-black text-2xl text-cyan-400 tracking-tight flex items-baseline gap-1.5">
                      <Activity className="w-5 h-5" />
                      <span style={{ fontFamily: 'Verdana' }}>100% OK</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono">Все сервисы онлайн</div>
                  </div>
                </div>

                {/* SECTION 0: Payout Requests Notifications for Admins */}
                <div className="p-6 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/30 rounded-3xl space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-amber-400" />
                          Уведомления о запросах на вывод средств
                        </h3>
                        {adminPayoutNotifications.filter((n: any) => n.status === 'Ожидает обработки').length > 0 ? (
                          <span className="px-2.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold animate-pulse">
                            {adminPayoutNotifications.filter((n: any) => n.status === 'Ожидает обработки').length} нов.
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold">
                            Все обработаны
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Когда пользователи заказывают выплату, их заявки отображаются здесь. Администраторы получают мгновенные уведомления и могут одобрить транзакцию или отклонить с возвратом средств.
                      </p>
                    </div>

                    <button
                      onClick={refreshAdminPayoutNotifications}
                      className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-300 transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Обновить заявки
                    </button>
                  </div>

                  {adminPayoutNotifications.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs font-mono">
                      Заявок на вывод пока нет
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-400 border-b border-white/5 text-[10px] uppercase tracking-wider">
                            <th className="pb-3 font-bold">Заявка / Дата</th>
                            <th className="pb-3 font-bold">Пользователь</th>
                            <th className="pb-3 font-bold">Сумма к выводу</th>
                            <th className="pb-3 font-bold">Тип</th>
                            <th className="pb-3 font-bold">Bitcoin Кошелек</th>
                            <th className="pb-3 font-bold">Статус</th>
                            <th className="pb-3 font-bold text-right">Решение админа</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {adminPayoutNotifications.map((notif: any) => (
                            <tr key={notif.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 font-mono">
                                <div className="text-amber-300 font-bold text-xs">{notif.id}</div>
                                <div className="text-[10px] text-slate-400">{notif.date}</div>
                              </td>
                              <td className="py-3">
                                <div className="text-white font-bold text-xs">{notif.userName}</div>
                                <div className="text-[10px] font-mono text-slate-400">{notif.userEmail}</div>
                              </td>
                              <td className="py-3 font-mono">
                                <div className="text-emerald-400 font-bold text-xs" style={{ fontFamily: 'Verdana' }}>
                                  {notif.amountSat?.toLocaleString('en-US')} SAT
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  ~${(((notif.amountSat || 0) / 100000000) * btcPrice).toFixed(2)} USD
                                </div>
                              </td>
                              <td className="py-3">
                                <span className={cn(
                                  "px-2 py-0.5 rounded text-[10px] font-bold",
                                  notif.speed?.includes('Instant') ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-slate-800 text-slate-300"
                                )}>
                                  {notif.speed || 'Обычный'}
                                </span>
                              </td>
                              <td className="py-3 font-mono">
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                                  <span className="truncate max-w-[140px] inline-block">{notif.wallet}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(notif.wallet);
                                      alert('Кошелек скопирован в буфер обмена!');
                                    }}
                                    className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                                    title="Скопировать кошелек"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className={cn(
                                  "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block",
                                  notif.status === 'Ожидает обработки' && "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse",
                                  notif.status?.includes('Одобрен') && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
                                  notif.status === 'Отклонен' && "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                )}>
                                  {notif.status}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                {notif.status === 'Ожидает обработки' ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleApprovePayoutRequest(notif.id)}
                                      className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1"
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                      Одобрить
                                    </button>
                                    <button
                                      onClick={() => handleRejectPayoutRequest(notif.id)}
                                      className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1"
                                    >
                                      <AlertTriangle className="w-3 h-3" />
                                      Отклонить
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-slate-500 font-mono">Решение принято</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Section 1: User Management Table */}
                <div className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-3xl space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-400" />
                        Управление пользователями системы ({adminUsersList.length})
                      </h3>
                      <p className="text-xs text-slate-400">Просмотр, редактирование балансов, выплат и прав пользователей.</p>
                    </div>
                    <button
                      onClick={refreshAdminUsersList}
                      className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      Обновить список
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-white/5 text-[10px] uppercase tracking-wider">
                          <th className="pb-3 font-bold">Пользователь</th>
                          <th className="pb-3 font-bold">Роль</th>
                          <th className="pb-3 font-bold">Баланс (SAT)</th>
                          <th className="pb-3 font-bold">Уровень</th>
                          <th className="pb-3 font-bold">Claims</th>
                          <th className="pb-3 font-bold text-right">Действия админа</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {adminUsersList.map((u: any, idx: number) => (
                          <tr key={u.email || idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-mono">
                              <div className="flex items-center gap-2.5">
                                <img src={u.avatar || 'https://picsum.photos/seed/avatar1/100/100'} alt="" className="w-7 h-7 rounded-lg object-cover border border-white/10" />
                                <div>
                                  <div className="text-white font-bold text-xs">{u.name}</div>
                                  <div className="text-[10px] text-slate-400">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                                u.isAdmin ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-slate-800 text-slate-400"
                              )}>
                                {u.isAdmin ? '👑 ADMIN' : 'USER'}
                              </span>
                            </td>
                            <td className="py-3 font-mono font-bold text-amber-300" style={{ fontFamily: 'Verdana' }}>
                              {u.balance?.toLocaleString('en-US') || 0} SAT
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded text-[10px] font-bold">
                                {u.tier || 'Bronze'}
                              </span>
                            </td>
                            <td className="py-3 font-mono text-slate-300" style={{ fontFamily: 'Verdana' }}>
                              {u.cumulativeClaims || 0}
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Add +10k SAT */}
                                <button
                                  onClick={() => {
                                    const updated = adminUsersList.map((usr: any) => {
                                      if (usr.email === u.email) {
                                        return { ...usr, balance: (usr.balance || 0) + 10000 };
                                      }
                                      return usr;
                                    });
                                    localStorage.setItem('freebitco_accounts', JSON.stringify(updated));
                                    setAdminUsersList(updated);
                                    if (currentUser.email === u.email) {
                                      setCurrentUser({ ...currentUser, balance: currentUser.balance + 10000 });
                                    }
                                    setAdminLog(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString().slice(0,5), text: `Начислено +10,000 SAT пользователю ${u.email}`, type: 'user' }, ...prev]);
                                  }}
                                  className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-bold transition-all"
                                >
                                  +10k SAT
                                </button>

                                {/* Toggle Admin role */}
                                <button
                                  onClick={() => {
                                    const updated = adminUsersList.map((usr: any) => {
                                      if (usr.email === u.email) {
                                        return { ...usr, isAdmin: !usr.isAdmin };
                                      }
                                      return usr;
                                    });
                                    localStorage.setItem('freebitco_accounts', JSON.stringify(updated));
                                    setAdminUsersList(updated);
                                    if (currentUser.email === u.email) {
                                      setCurrentUser({ ...currentUser, isAdmin: !currentUser.isAdmin });
                                    }
                                    setAdminLog(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString().slice(0,5), text: `Изменена роль пользователя ${u.email}`, type: 'user' }, ...prev]);
                                  }}
                                  className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-lg text-[10px] font-bold transition-all"
                                >
                                  {u.isAdmin ? 'Снять Admin' : 'Сделать Admin'}
                                </button>

                                {/* Set Platinum tier */}
                                <button
                                  onClick={() => {
                                    const updated = adminUsersList.map((usr: any) => {
                                      if (usr.email === u.email) {
                                        return { ...usr, tier: 'Platinum', cumulativeClaims: 100 };
                                      }
                                      return usr;
                                    });
                                    localStorage.setItem('freebitco_accounts', JSON.stringify(updated));
                                    setAdminUsersList(updated);
                                    if (currentUser.email === u.email) {
                                      setCurrentUser({ ...currentUser, tier: 'Platinum', cumulativeClaims: 100 });
                                    }
                                    setAdminLog(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString().slice(0,5), text: `Присвоен статус Platinum пользователю ${u.email}`, type: 'user' }, ...prev]);
                                  }}
                                  className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 rounded-lg text-[10px] font-bold transition-all"
                                >
                                  Platinum
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 2: Platform Controls & Broadcast */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Broadcast Message to Live Activity Feed */}
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Отправить симуляцию уведомления в живой лог
                    </h3>
                    <p className="text-xs text-slate-400">
                      Сообщение появится у всех посетителей в «Живом логе активности партнера».
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={adminBroadcastMsg}
                        onChange={(e) => setAdminBroadcastMsg(e.target.value)}
                        placeholder="Например: Пользователь admin@freebitco.io вывел 150,000 SAT на свой кошелек!"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                      />
                      <button
                        onClick={() => {
                          if (!adminBroadcastMsg.trim()) return;
                          const newNote = {
                            id: Date.now(),
                            text: adminBroadcastMsg,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          };
                          setRecentNotifications(prev => [newNote, ...prev.slice(0, 8)]);
                          setAdminLog(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString().slice(0,5), text: `Анонсировано событие: ${adminBroadcastMsg}`, type: 'info' }, ...prev]);
                          setAdminBroadcastMsg('');
                          alert('Уведомление отправлено в живую ленту!');
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4" />
                        Опубликовать в эфир
                      </button>
                    </div>
                  </div>

                  {/* Global Rates & Controls */}
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Быстрые настройки платформы
                    </h3>
                    <p className="text-xs text-slate-400">
                      Изменение глобального курса BTC/USD и состояния сервера.
                    </p>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                        <div>
                          <div className="font-bold text-white">Курс BTC/USD</div>
                          <div className="text-[10px] text-slate-400" style={{ fontFamily: 'Verdana' }}>${btcPrice.toLocaleString('en-US')}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setBtcPrice(prev => prev + 500);
                              setBtcTrend('up');
                              setAdminLog(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString().slice(0,5), text: 'Курс BTC изменен администратором (+500$)', type: 'system' }, ...prev]);
                            }}
                            className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-bold"
                          >
                            + $500
                          </button>
                          <button
                            onClick={() => {
                              setBtcPrice(prev => Math.max(10000, prev - 500));
                              setBtcTrend('down');
                              setAdminLog(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString().slice(0,5), text: 'Курс BTC изменен администратором (-500$)', type: 'system' }, ...prev]);
                            }}
                            className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-[10px] font-bold"
                          >
                            - $500
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                        <div>
                          <div className="font-bold text-white">Сбросить таймер ROLL клейма</div>
                          <div className="text-[10px] text-slate-400">Сбросить кулдаун 60 минут текущего админа</div>
                        </div>
                        <button
                          onClick={() => {
                            setRollStatus(prev => ({ ...prev, cooldownSeconds: 0 }));
                            if (currentUser) {
                              const updated = { ...currentUser, nextRollTimestamp: 0 };
                              syncUserToStorage(updated);
                            }
                            alert('Таймер сбора крана сброшен! Вы можете совершить ROLL прямо сейчас.');
                          }}
                          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-xl text-[10px] font-bold"
                        >
                          Сбросить кулдаун
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Audit Log */}
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    Журнал системного аудита админ-панели
                  </h3>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 font-mono text-[11px]">
                    {adminLog.map((log) => (
                      <div key={log.id} className="p-2.5 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-slate-300">{log.text}</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="home" className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-[#f7971e]/30 selection:text-[#ffd200]" style={{ backgroundColor: '#03040e', backgroundImage: 'radial-gradient(ellipse 120% 80% at 50% -5%, #171838 0%, #0a0c22 35%, #040511 70%, #020208 100%)', lineHeight: '23px', paddingLeft: '0px', marginLeft: '0px', marginBottom: '0px', marginTop: '0px' }}>
      
      {/* 1. Continuous Dynamic Tech Grid Across Entire Site */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '110px 110px',
        }}
      />

      {/* 2. Unified Seamless Ambient Glowing Orbs Across Scroll Height */}
      <div className="absolute top-[-100px] left-[-100px] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent blur-[150px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[10%] right-[-150px] w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-purple-600/20 via-indigo-500/10 to-transparent blur-[160px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '15s' }} />
      <div className="absolute top-[28%] left-[-200px] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent blur-[170px] pointer-events-none mix-blend-screen animate-float" />
      <div className="absolute top-[48%] right-[-200px] w-[650px] h-[650px] rounded-full bg-gradient-to-l from-amber-400/12 via-orange-500/8 to-transparent blur-[150px] pointer-events-none mix-blend-screen animate-float-delayed" />
      <div className="absolute top-[68%] left-[-150px] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent blur-[160px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '14s' }} />
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-t from-orange-500/15 via-violet-600/10 to-transparent blur-[180px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '18s' }} />

      {/* 3. Subtle floating ambient sparks / digital particles */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-25">
        <div className="absolute top-[12%] left-[25%] w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[32%] left-[80%] w-1 h-1 rounded-full bg-cyan-400 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-[55%] left-[15%] w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute top-[75%] left-[70%] w-1 h-1 rounded-full bg-amber-400 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[90%] left-[30%] w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
      </div>

      {/* 1. TOP PROMO BANNER */}
      <div className="relative z-50 bg-orange-500/10 border-b border-orange-500/20 text-[#ffd200] py-2.5 px-4 text-center font-semibold text-xs md:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 overflow-hidden backdrop-blur-md">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/20 px-2 py-0.5 rounded-md">🔥 Бонус</span>
          <span>+1000 Сатоши при регистрации сегодня!</span>
        </span>
        <button 
          onClick={() => handleOpenAuth('register')}
          className="underline hover:text-white transition-colors font-bold ml-2 inline-flex items-center gap-0.5"
        >
          Забрать <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* NAVIGATION / HEADER */}
      <header className="sticky top-0 z-40 bg-[#03040b]/80 backdrop-blur-md border-b border-white/10 py-4 px-4 md:px-12 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3.5 cursor-pointer group">
          {/* Stunning Logo Icon */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 rounded-2xl blur-[8px] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-12 h-12 bg-gradient-to-tr from-[#12132b] to-[#090a18] border border-orange-500/50 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent" />
              <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-amber-400 via-yellow-200 to-orange-400 drop-shadow-[0_0_10px_rgba(247,151,30,0.7)]">
                ₿
              </span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-slate-950 shadow-sm">
                ✦
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-['Poppins'] font-black text-2xl tracking-tight text-white flex items-center gap-1">
              <span>Bit</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Bonus</span>
              <span className="text-white px-2 py-0.5 bg-orange-500/20 border border-orange-500/40 rounded-lg text-xs font-bold ml-1 text-orange-300">Hub</span>
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center justify-between text-sm font-medium text-slate-400 w-[450px] h-[30px]" style={{ fontSize: '14px', lineHeight: '16px', fontFamily: 'Georgia' }}>
          <a href="#benefits" className="hover:text-white transition-colors text-sm" style={{ fontFamily: 'Georgia', fontSize: '16px' }}>Преимущества</a>
          <a href="#steps" className="hover:text-white transition-colors text-sm" style={{ fontFamily: 'Georgia', fontSize: '16px' }}>Как начать</a>
          <a href="#testimonials" className="hover:text-white transition-colors text-sm" style={{ fontFamily: 'Georgia', fontSize: '16px', fontWeight: 'normal', textDecorationLine: 'none' }}>Отзывы</a>
          <a href="#stats" className="hover:text-white transition-colors text-sm" style={{ fontFamily: 'Georgia', fontSize: '16px' }}>Статистика</a>
          <a href="#faq" className="hover:text-white transition-colors text-sm" style={{ fontFamily: 'Georgia', fontSize: '16px' }}>FAQ</a>
        </nav>

        {/* Header Action Button & Mobile Hamburguer */}
        <div className="flex items-center gap-2 md:gap-4">
          {isLoggedIn && currentUser ? (
            <div className="flex items-center gap-2 md:gap-3">
              {/* Quick balance display */}
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider" style={{ fontFamily: 'Georgia' }}>БАЛАНС</span>
                <span className="text-xs font-mono font-bold text-orange-400" style={{ fontFamily: 'Verdana', textAlign: 'right', fontSize: '12px', lineHeight: '16px' }}>{(currentUser.balance / 100000000).toFixed(8)} BTC</span>
              </div>
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="relative inline-flex items-center justify-center px-3 md:px-4 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-[#ffd200] font-bold text-[10px] md:text-xs transition-all duration-300"
                style={{ fontFamily: 'Georgia' }}
              >
                Кабинет
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all shrink-0"
                title="Выйти"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 md:gap-3">
              <button
                onClick={() => handleOpenAuth('login')}
                className="text-[11px] md:text-xs font-bold text-slate-300 hover:text-white px-2 md:px-3 py-1.5 transition-colors"
                style={{ fontFamily: 'Georgia' }}
              >
                Войти
              </button>
              <button 
                onClick={() => handleOpenAuth('register')}
                className="relative inline-flex items-center justify-center px-3 md:px-4.5 py-1.5 md:py-2 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-slate-950 font-bold text-[11px] md:text-xs shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                style={{ fontFamily: 'Georgia' }}
              >
                Регистрация
              </button>
            </div>
          )}

          {/* Hamburger button for mobile menu */}
          <button
            onClick={() => setIsMobileLandingMenuOpen(!isMobileLandingMenuOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white md:hidden transition-all shrink-0"
            aria-label="Toggle Menu"
          >
            {isMobileLandingMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MOBILE LANDING MENU DROP SHEET */}
      <AnimatePresence>
        {isMobileLandingMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden sticky top-[68px] z-30 w-full bg-[#070816]/95 border-b border-white/10 backdrop-blur-lg overflow-hidden"
            style={{ fontFamily: 'Georgia' }}
          >
            <div className="px-6 py-6 space-y-6">
              <nav className="flex flex-col gap-4">
                <a 
                  href="#benefits" 
                  onClick={() => setIsMobileLandingMenuOpen(false)}
                  className="text-slate-300 hover:text-white font-bold text-sm py-1 border-b border-white/5"
                >
                  Преимущества
                </a>
                <a 
                  href="#steps" 
                  onClick={() => setIsMobileLandingMenuOpen(false)}
                  className="text-slate-300 hover:text-white font-bold text-sm py-1 border-b border-white/5"
                >
                  Как начать
                </a>
                <a 
                  href="#testimonials" 
                  onClick={() => setIsMobileLandingMenuOpen(false)}
                  className="text-slate-300 hover:text-white font-bold text-sm py-1 border-b border-white/5"
                >
                  Отзывы
                </a>
                <a 
                  href="#stats" 
                  onClick={() => setIsMobileLandingMenuOpen(false)}
                  className="text-slate-300 hover:text-white font-bold text-sm py-1 border-b border-white/5"
                >
                  Статистика
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setIsMobileLandingMenuOpen(false)}
                  className="text-slate-300 hover:text-white font-bold text-sm py-1 border-b border-white/5"
                >
                  FAQ
                </a>
              </nav>

              {/* Show mobile menu actions if logged out/logged in */}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                {isLoggedIn && currentUser ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                      <span className="text-xs text-slate-400">Ваш Баланс:</span>
                      <span className="text-xs font-mono font-bold text-[#ffd200]">
                        {(currentUser.balance / 100000000).toFixed(8)} BTC
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileLandingMenuOpen(false);
                        setIsDashboardOpen(true);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-slate-950 font-bold rounded-xl text-center text-xs"
                    >
                      Перейти в личный кабинет
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileLandingMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Выйти
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setIsMobileLandingMenuOpen(false);
                        handleOpenAuth('login');
                      }}
                      className="py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold"
                    >
                      Войти
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileLandingMenuOpen(false);
                        handleOpenAuth('register');
                      }}
                      className="py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-slate-950 rounded-xl text-xs font-bold"
                    >
                      Регистрация
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-10 pb-16 md:pt-20 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-80px)]">
        
        {/* Left Info Column */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block"
          >
            <div 
              className="inline-block p-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(0,212,255,0.25)] transform scale-90 origin-center lg:origin-left"
            >
              <div className="px-3 py-1 bg-[#0a0b1e]/90 rounded-full flex items-center gap-1.5" style={{ fontFamily: 'Georgia' }}>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Verified Crypto Platform</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white mb-6 text-center lg:text-left"
            style={{ fontFamily: 'Georgia', height: '270px', marginBottom: '24px', fontSize: '37px', lineHeight: '39px' }}
          >
            Зарабатывай <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500">Bitcoin</span> <br />
            каждый час бесплатно
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 font-light max-w-2xl mx-auto lg:mx-0 mb-10 text-center lg:text-left"
            style={{ fontFamily: 'Georgia' }}
          >
            Присоединяйся к 30+ миллионам пользователей. Получай сатоши ежечасно и умножай свой капитал. Регистрация занимает ровно 1 минуту!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-400 rounded-2xl blur opacity-35 group-hover:opacity-75 transition duration-1000"></div>
              <a 
                href={REF_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl text-slate-900 font-bold text-xl shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 text-center"
                style={{ fontFamily: 'Georgia', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '35px', paddingRight: '35px' }}
              >
                🚀 Получить бонус сейчас
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs text-[#80809a] mt-4 font-medium"
            style={{ fontFamily: 'Georgia' }}
          >
            ⚡️ Регистрация занимает 1 минуту. Без вложений и скрытых комиссий.
          </motion.p>
        </div>

        {/* Right Interactive Dashboard Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-lg"
        >
          <div className="relative glass-card rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]" style={{ fontFamily: 'Georgia' }}>
            
            {/* Header of widget */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400" style={{ fontFamily: 'Georgia' }}>СЕТЬ ОНЛАЙН</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg text-xs text-[#b0b0c0]">
                <Info className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span style={{ fontFamily: 'Georgia' }}>Обновление в реальном времени</span>
              </div>
            </div>

            {/* Simulated Stats */}
            <div className="space-y-6">
              
              {/* BTC Price block */}
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="text-xs text-[#80809a] font-semibold mb-1">АКТУАЛЬНЫЙ КУРС BTC/USD (LIVE)</div>
                <div className="flex items-baseline justify-between" style={{ fontWeight: 'normal' }}>
                  <span className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight" style={{ fontFamily: 'Verdana' }}>
                    ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={cn(
                    "font-mono text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1",
                    btcTrend === 'up' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )} style={{ fontFamily: 'Verdana' }}>
                    {btcTrend === 'up' ? (
                      <>
                        <TrendingUp className="w-3 h-3" />
                        +{Math.abs(btc24hChange).toFixed(2)}%
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3 h-3" />
                        -{Math.abs(btc24hChange).toFixed(2)}%
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Total payouts ticker */}
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="text-xs text-[#80809a] font-semibold mb-1">ВЫПЛАЧЕНО ПОЛЬЗОВАТЕЛЯМ</div>
                <div className="font-display font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-[#ffd200] to-[#f7971e] bg-clip-text text-transparent tracking-tight">
                  ${totalPaidOut.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Моментальные выплаты осуществляются в автоматическом режиме
                </div>
              </div>

              {/* Referral benefits mini widget */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-[#80809a] font-bold mb-1 uppercase tracking-wider">КОМИССИЯ КРАНА</div>
                  <div className="font-display font-bold text-xl text-white" style={{ fontFamily: 'Verdana' }}>50%</div>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-[#80809a] font-bold mb-1 uppercase tracking-wider">Шанс выиграть</div>
                  <div className="font-display font-bold text-xl text-[#00d4ff]" style={{ fontFamily: 'Verdana' }}>до $200 / час</div>
                </div>
              </div>

              {/* Fake Interactive Roll Simulation */}
              <a 
                href={REF_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gradient-to-r from-[#1a103c] to-[#0a0b1e] border border-white/10 hover:border-[#ffd200]/40 rounded-2xl flex items-center justify-between px-5 group transition-all"
              >
                <div>
                  <div className="text-xs text-[#80809a] font-bold uppercase tracking-wider text-left">Ваш приветственный билет</div>
                  <div className="text-sm text-white font-semibold flex items-center gap-1.5 mt-0.5">
                    Получить бесплатные ROLL сатоши <ArrowRight className="w-3.5 h-3.5 text-[#f7971e] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f7971e]/10 to-[#ffd200]/10 border border-[#f7971e]/30 flex items-center justify-center text-lg group-hover:bg-[#ffd200] group-hover:text-[#0a0b1e] transition-all font-bold">
                  🎲
                </div>
              </a>

            </div>

            {/* Glowing accent border bottom */}
            <div className="absolute -bottom-px left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#ffd200]/50 to-transparent blur-sm" />
          </div>
        </motion.div>

      </section>

      {/* 2. BENEFITS SECTION ("Почему выбирают нас") */}
      <section id="benefits" className="relative z-10 py-24 border-t border-white/5 backdrop-blur-[2px]" style={{ fontFamily: 'Georgia' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Georgia' }}>
              Почему выбирают <span className="bg-gradient-to-r from-[#ffd200] to-[#f7971e] bg-clip-text text-transparent">Freebitco.in</span>?
            </h2>
            <p className="text-[#b0b0c0] text-sm md:text-base leading-relaxed">
              Крупнейший в индустрии биткоин-кран объединяет передовые финансовые технологии, честные алгоритмы и щедрую партнерскую систему для вашего пассивного заработка.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "glass-card p-6 rounded-2xl flex flex-col items-start text-left relative overflow-hidden group",
                  b.border
                )}
              >
                {/* Decorative glow background behind icon */}
                <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500/10 to-[#ffd200]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon wrapper with hover rotate */}
                <div className="p-3 bg-white/5 rounded-xl mb-6 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                  {b.icon}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-[#ffd200] transition-colors relative z-10 leading-snug" style={{ fontFamily: 'Georgia' }}>
                  {b.title}
                </h3>
                
                <p className="text-xs md:text-sm text-[#b0b0c0] leading-relaxed relative z-10">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. HOW TO START ("Как начать зарабатывать") */}
      <section id="steps" className="relative z-10 py-24 max-w-7xl mx-auto px-6 md:px-12" style={{ fontFamily: 'Georgia' }}>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Georgia' }}>
            Как начать зарабатывать <span className="bg-gradient-to-r from-[#00d4ff] to-[#f7971e] bg-clip-text text-transparent">уже сегодня</span>
          </h2>
          <p className="text-[#b0b0c0] text-sm md:text-base leading-relaxed">
            Вам потребуется всего три простых шага и пара минут времени, чтобы запустить свой первый источник бесплатного пассивного дохода в Биткоинах.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#ffd200]/20 via-[#00d4ff]/20 to-[#ffd200]/20 z-0" />

          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative z-10 text-center flex flex-col items-center max-w-sm mx-auto group"
            >
              {/* Step circle */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500/50 shadow-xl transition-all duration-300 mb-6">
                <span className={cn(
                  "font-['Poppins'] font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                  i === 0 ? "bg-cyan-500 text-slate-900" : "bg-white/10 text-white group-hover:bg-cyan-500 group-hover:text-slate-900"
                )}>
                  {i + 1}
                </span>
                
                {/* Halo overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#f7971e]/5 to-[#00d4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-[#ffd200] transition-colors duration-300" style={{ fontFamily: 'Georgia' }}>
                {s.title}
              </h3>
              
              <p className="text-sm text-[#b0b0c0] leading-relaxed px-2">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA line under steps */}
        <div className="mt-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <a 
                href={REF_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl text-slate-900 font-bold text-base tracking-wider shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{ paddingTop: '15px', paddingBottom: '14px', paddingLeft: '35px', paddingRight: '35px' }}
              >
                Начать зарабатывать сейчас
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF / TRUST BLOCK */}
      <section className="relative z-10 py-24 border-t border-white/5 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Georgia' }}>
              Нам доверяют миллионы
            </h2>
            <p className="text-[#b0b0c0] text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Georgia' }}>
              Платформа безупречно работает с 2013 года. Выплаты полностью автоматизированы и происходят своевременно. Более 30 миллионов зарегистрированных криптоэнтузиастов по всему миру!
            </p>
          </div>

          {/* Crypto Media Logos Block */}
          <div className="mb-20">
            <p className="text-center text-xs font-mono tracking-widest text-[#80809a] uppercase mb-8" style={{ fontFamily: 'Georgia' }}>
              О НАС ПИШУТ ВЕДУЩИЕ КРИПТО-СМИ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all" style={{ fontFamily: 'Georgia' }}>
              <div className="text-center font-display font-extrabold text-2xl text-slate-400 hover:text-[#ff9900] transition-colors tracking-tighter" style={{ fontFamily: 'Georgia' }}>
                COINDESK
              </div>
              <div className="text-center font-display font-extrabold text-2xl text-slate-400 hover:text-[#ffd200] transition-colors tracking-tight" style={{ fontFamily: 'Georgia' }}>
                Bitcoin Magazine
              </div>
              <div className="text-center font-display font-extrabold text-2xl text-slate-400 hover:text-[#00e5ff] transition-colors tracking-tight" style={{ fontFamily: 'Georgia' }}>
                CoinTelegraph
              </div>
            </div>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 mb-4" style={{ fontFamily: 'Georgia' }}>
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#ffd200] text-[#ffd200]" />
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-sm text-[#d0d0e0] leading-relaxed italic mb-6" style={{ fontFamily: 'Georgia' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-4" style={{ fontFamily: 'Georgia' }}>
                  {/* Render fallback avatar cleanly in iframe */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <Image 
                      src={t.avatar} 
                      alt={t.name}
                      fill
                      sizes="40px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-[11px] text-[#80809a] font-medium">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. STATISTICS BLOCK */}
      <section id="stats" className="relative z-10 py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 bg-gradient-to-r from-[#10112c]/80 to-[#1a103c]/80 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden" style={{ fontFamily: 'Georgia' }}>
          
          {/* Glowing element inside background */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#ffd200]/5 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
            
            {/* Stat item 1 */}
            <div>
              <div className="font-display font-extrabold text-3xl md:text-5xl text-white mb-2 tracking-tight">
                <CountUp target={30} suffix=" млн+" />
              </div>
              <p className="text-xs md:text-sm text-[#b0b0c0] font-semibold tracking-wide uppercase">
                Пользователей
              </p>
            </div>

            {/* Stat item 2 */}
            <div>
              <div className="font-display font-extrabold text-3xl md:text-5xl bg-gradient-to-r from-[#ffd200] to-[#f7971e] bg-clip-text text-transparent mb-2 tracking-tight">
                <CountUp target={2.5} decimals={1} prefix="$" suffix=" млрд+" />
              </div>
              <p className="text-xs md:text-sm text-[#b0b0c0] font-semibold tracking-wide uppercase">
                Выплачено в BTC
              </p>
            </div>

            {/* Stat item 3 */}
            <div>
              <div className="font-display font-extrabold text-3xl md:text-5xl text-white mb-2 tracking-tight">
                <CountUp target={1} suffix=" BTC" />
              </div>
              <p className="text-xs md:text-sm text-[#b0b0c0] font-semibold tracking-wide uppercase">
                Макс. Джекпот
              </p>
            </div>

            {/* Stat item 4 */}
            <div>
              <div className="font-display font-extrabold text-3xl md:text-5xl text-[#00d4ff] mb-2 tracking-tight">
                <CountUp target={50} suffix="%" />
              </div>
              <p className="text-xs md:text-sm text-[#b0b0c0] font-semibold tracking-wide uppercase">
                Реф-комиссия
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (Accordion) */}
      <section id="faq" className="relative z-10 py-24 border-t border-white/5 backdrop-blur-[2px]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Georgia' }}>
              Часто задаваемые вопросы
            </h2>
            <p className="text-[#b0b0c0] text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Georgia' }}>
              Ознакомьтесь с ответами на самые частые вопросы пользователей, чтобы развеять все сомнения и начать копить Биткоин правильно.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left hover:text-white group focus:outline-none"
                >
                  <span className="font-bold text-sm md:text-base text-slate-200 group-hover:text-white transition-colors" style={{ fontFamily: 'Georgia' }}>
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#ffd200]/30 group-hover:bg-white/10 transition-all flex items-center justify-center shrink-0 ml-4">
                    {activeFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-[#ffd200]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#b0b0c0]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-[#b0b0c0] leading-relaxed border-t border-white/5" style={{ fontFamily: 'Georgia' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PRE-FOOTER (Финальный призыв к действию) */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="relative glass-card rounded-3xl p-8 md:p-16 text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5 border border-white/10 backdrop-blur-xl">
          
          {/* Subtle light effects */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-cyan-500/10 blur-[80px]" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/10 blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-['Poppins'] text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Georgia' }}>
              Готовы зарабатывать <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500">Bitcoin</span> бесплатно?
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light mb-10 leading-relaxed" style={{ fontFamily: 'Georgia' }}>
              Присоединяйтесь к огромному глобальному сообществу прямо сейчас и начните наполнять свой баланс ценными сатоши каждый час абсолютно без вложений!
            </p>

            <div className="relative group inline-block w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-400 rounded-2xl blur opacity-35 group-hover:opacity-70 transition duration-1000"></div>
              <a 
                href={REF_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl text-slate-900 font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{ fontFamily: 'Georgia' }}
              >
                🚀 Присоединиться к freebitco.in
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-[#80809a] font-semibold" style={{ fontFamily: 'Georgia' }}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Без верификации
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Вывод в 1 клик
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 pt-16 pb-12 px-6 md:px-12" style={{ marginTop: '100px' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 border-b border-white/5 pb-12 mb-8">
          
          {/* Logo brand info */}
          <div className="max-w-md">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 rounded-2xl blur-[8px] opacity-75" />
                <div className="relative w-12 h-12 bg-gradient-to-tr from-[#12132b] to-[#090a18] border border-orange-500/50 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent" />
                  <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-amber-400 via-yellow-200 to-orange-400 drop-shadow-[0_0_10px_rgba(247,151,30,0.7)]">
                    ₿
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-slate-950 shadow-sm">
                    ✦
                  </div>
                </div>
              </div>
              <span className="font-['Poppins'] font-black text-2xl tracking-tight text-white flex items-center gap-1">
                <span>Bit</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Bonus</span>
                <span className="text-white px-2 py-0.5 bg-orange-500/20 border border-orange-500/40 rounded-lg text-xs font-bold ml-1 text-orange-300">Hub</span>
              </span>
            </div>
            <p className="text-xs text-[#80809a] leading-relaxed" style={{ fontFamily: 'Georgia' }}>
              Независимая премиальная платформа BitBonusHub для получения бесплатных сатоши, аналитики возможностей и обучения крипто-партнеров. Зарабатывайте безопасно вместе с нами.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div style={{ fontFamily: 'Georgia' }}>
              <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Навигация</h5>
              <ul className="space-y-2.5 text-xs font-medium text-[#80809a]">
                <li><a href="#benefits" className="hover:text-white hover:text-[#ffd200] transition-colors">Преимущества</a></li>
                <li><a href="#steps" className="hover:text-white hover:text-[#ffd200] transition-colors">Инструкция</a></li>
                <li><a href="#testimonials" className="hover:text-white hover:text-[#ffd200] transition-colors">Отзывы</a></li>
                <li><a href="#faq" className="hover:text-white hover:text-[#ffd200] transition-colors">Вопросы и ответы</a></li>
              </ul>
            </div>
            <div style={{ fontFamily: 'Georgia' }}>
              <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Официальный сайт</h5>
              <ul className="space-y-2.5 text-xs font-medium text-[#80809a]">
                <li>
                  <a 
                    href="https://freebitco.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#ffd200] transition-colors inline-flex items-center gap-1"
                  >
                    Freebitco.in <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Disclaimers and Copyright */}
        <div className="max-w-7xl mx-auto text-center md:text-left text-[11px] text-[#55556a] space-y-4">
          <p className="leading-relaxed" style={{ fontFamily: 'Georgia' }}>
            © 2026 BitBonusHub | Все права защищены. Сайт является независимым информационным партнерским ресурсом. Торговые марки, логотипы и официальное название проекта принадлежат их законным правообладателям. Не является финансовой консультацией. Участие разрешено только для лиц старше 18 лет.
          </p>
          <p className="leading-relaxed border-l-2 border-[#f7971e]/30 pl-3" style={{ fontFamily: 'Georgia' }}>
            <span className="text-[#80809a] font-bold">Отказ от ответственности (Disclaimer):</span> Результаты получения Биткоинов зависят исключительно от вашей личной активности, количества приглашенных рефералов и регулярности сбора сатоши. Участие в лотереях и ставках MULTIPLY BTC несет в себе риски потери части криптовалютного баланса. Пожалуйста, играйте ответственно и взвешенно.
          </p>
        </div>
      </footer>

      {/* 9. AUTH MODAL */}
      <AnimatePresence>
        {authModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with strong blur and dark shade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModal(prev => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-[#020208]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#0e0f26] via-[#090b1c] to-[#050612] border border-orange-500/30 rounded-3xl p-7 md:p-9 shadow-[0_25px_70px_rgba(247,151,30,0.2)] overflow-hidden backdrop-blur-2xl"
              style={{ fontFamily: 'Georgia' }}
            >
              {/* Top ambient orange & purple glow orbs */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-orange-500/20 via-amber-400/15 to-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setAuthModal(prev => ({ ...prev, isOpen: false }))}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all duration-200 z-20 shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Form Content */}
              <div className="relative z-10 space-y-6">
                
                {/* Header Section */}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-tr from-[#1a1233] to-[#0d0f26] border border-orange-500/30 mb-4 shadow-[0_0_20px_rgba(247,151,30,0.2)] group">
                    <div className="absolute inset-0 bg-orange-500/10 rounded-2xl blur-md" />
                    <Coins className="relative w-7 h-7 text-[#ffd200] drop-shadow-[0_0_8px_rgba(255,210,0,0.6)]" />
                  </div>
                  
                  {authModal.mode === 'login' && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Georgia' }}>
                        Вход в аккаунт
                      </h2>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
                        Введите свои данные для доступа к кабинету и криптовалютным бонусам.
                      </p>
                    </>
                  )}

                  {authModal.mode === 'register' && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Georgia' }}>
                        Регистрация
                      </h2>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
                        Занимает 1 минуту. Получите <span className="text-[#ffd200] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 border border-orange-500/30 inline-block mt-1">+1000 сатоши</span> на ваш баланс!
                      </p>
                    </>
                  )}

                  {authModal.mode === 'forgot' && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Georgia' }}>
                        Восстановление
                      </h2>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
                        Укажите email, привязанный к аккаунту, для получения инструкции.
                      </p>
                    </>
                  )}
                </div>

                {/* Forms */}
                {authModal.mode === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Адрес</label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={authModal.email}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your-email@example.com"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Пароль</label>
                        <button
                          type="button"
                          onClick={() => setAuthModal(prev => ({ ...prev, mode: 'forgot' }))}
                          className="text-[10px] text-orange-400 hover:text-amber-300 font-semibold transition-colors"
                        >
                          Забыли пароль?
                        </button>
                      </div>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input
                          type={authModal.showPassword ? 'text' : 'password'}
                          required
                          value={authModal.password}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-10 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => setAuthModal(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors"
                        >
                          {authModal.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Login Action Button */}
                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_4px_25px_rgba(247,151,30,0.35)] hover:shadow-[0_6px_30px_rgba(247,151,30,0.5)] hover:scale-[1.01] active:scale-95 transition-all duration-200"
                    >
                      Войти в аккаунт
                    </button>

                    {/* OR divider */}
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-white/10"></div>
                      <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">ИЛИ</span>
                      <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    {/* Demo Login Button */}
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
                    >
                      <Sparkles className="w-4 h-4 text-[#ffd200]" />
                      Вход через Демо-профиль
                    </button>
                  </form>
                )}

                {authModal.mode === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Никнейм / Ваше имя</label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={authModal.name}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Придумайте имя"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Адрес</label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={authModal.email}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="email@example.com"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Пароль</label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input
                          type={authModal.showPassword ? 'text' : 'password'}
                          required
                          value={authModal.password}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Придумайте пароль (мин. 6 знаков)"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-10 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => setAuthModal(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors"
                        >
                          {authModal.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Подтверждение пароля</label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input
                          type={authModal.showPassword ? 'text' : 'password'}
                          required
                          value={authModal.confirmPassword}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Повторите пароль"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Simulation Switch */}
                    <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between gap-4 mt-2">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-300">Режим симуляции ошибки</span>
                        <span className="block text-[9px] text-slate-500">Позволяет проверить форму при сбое</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAuthModal(prev => ({ ...prev, errorSimulated: !prev.errorSimulated }))}
                        className={cn(
                          "w-10 h-6 rounded-full p-1 transition-all duration-300 flex items-center shrink-0 shadow-inner",
                          authModal.errorSimulated ? "bg-rose-500 justify-end" : "bg-white/10 justify-start"
                        )}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                      </button>
                    </div>

                    {/* Register Action Button */}
                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_4px_25px_rgba(247,151,30,0.35)] hover:shadow-[0_6px_30px_rgba(247,151,30,0.5)] hover:scale-[1.01] active:scale-95 transition-all duration-200"
                    >
                      Создать кабинет
                    </button>
                  </form>
                )}

                {authModal.mode === 'forgot' && (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Адрес</label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-orange-400 transition-colors">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={authModal.email}
                          onChange={(e) => setAuthModal(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="email@example.com"
                          className="w-full bg-[#03040c]/70 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Forgot Action Button */}
                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_4px_25px_rgba(247,151,30,0.35)] hover:shadow-[0_6px_30px_rgba(247,151,30,0.5)] hover:scale-[1.01] active:scale-95 transition-all duration-200"
                    >
                      Восстановить пароль
                    </button>
                  </form>
                )}

                {/* Footer Switch links */}
                <div className="pt-5 border-t border-white/10 text-center text-xs text-slate-400 font-medium">
                  {authModal.mode === 'login' && (
                    <p style={{ fontFamily: 'Georgia' }}>
                      <span style={{ fontFamily: 'Georgia' }}>Ещё нет аккаунта?</span>{" "}
                      <button
                        onClick={() => setAuthModal(prev => ({ ...prev, mode: 'register' }))}
                        className="text-orange-400 font-bold hover:text-amber-300 transition-colors ml-1"
                        style={{ fontFamily: 'Georgia' }}
                      >
                        Создать сейчас
                      </button>
                    </p>
                  )}

                  {authModal.mode === 'register' && (
                    <p style={{ fontFamily: 'Georgia' }}>
                      <span style={{ fontFamily: 'Georgia' }}>Уже есть аккаунт?</span>{" "}
                      <button
                        onClick={() => setAuthModal(prev => ({ ...prev, mode: 'login' }))}
                        className="text-orange-400 font-bold hover:text-amber-300 transition-colors ml-1"
                        style={{ fontFamily: 'Georgia' }}
                      >
                        Войти в систему
                      </button>
                    </p>
                  )}

                  {authModal.mode === 'forgot' && (
                    <button
                      onClick={() => setAuthModal(prev => ({ ...prev, mode: 'login' }))}
                      className="text-orange-400 font-bold hover:text-amber-300 transition-colors flex items-center justify-center gap-1 mx-auto"
                      style={{ fontFamily: 'Georgia' }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 rotate-180 text-orange-400" /> Вернуться на страницу входа
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. AUTH RESULT MODAL */}
      <AnimatePresence>
        {authResult && authResult.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthResult(null)}
              className="absolute inset-0 bg-[#020208]/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-[#090b1c]/95 border border-white/10 rounded-3xl p-6 md:p-8 text-center shadow-2xl"
              style={{ fontFamily: 'Georgia' }}
            >
              <button
                onClick={() => setAuthResult(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                {/* Visual Icon with pulsing rings */}
                <div className="inline-flex relative">
                  {authResult.success ? (
                    <>
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
                      <div className="relative p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-md animate-pulse" />
                      <div className="relative p-4 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                    </>
                  )}
                </div>

                {/* Text Description */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    {authResult.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed px-2">
                    {authResult.message}
                  </p>
                </div>

                {/* Primary CTA Action */}
                {authResult.success ? (
                  <button
                    onClick={() => {
                      setAuthResult(null);
                      setAuthModal(prev => ({ ...prev, isOpen: true, mode: 'login' }));
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200"
                  >
                    Войти в личный кабинет
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAuthResult(null);
                      setAuthModal(prev => ({ ...prev, isOpen: true, mode: 'register' }));
                    }}
                    className="w-full py-3.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-200"
                  >
                    Попробовать ещё раз
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 11. IDLE / PAUSED EARNINGS MODAL */}
      <AnimatePresence>
        {idleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIdleModalOpen(false)}
              className="absolute inset-0 bg-[#020208]/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-[#090b1c]/95 border border-amber-500/25 rounded-3xl p-6 md:p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)]"
              style={{ fontFamily: 'Georgia' }}
            >
              <button
                onClick={() => setIdleModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                {/* Sad Emoji Header */}
                <div className="inline-flex relative">
                  <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner select-none">
                    😢
                  </div>
                </div>

                {/* Title & Warning Text */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Вас долго не было на нашем сайте...
                  </h3>
                  <p className="text-sm md:text-base text-amber-200/90 font-medium leading-relaxed">
                    Заработок сатоши был приостановлен!
                  </p>
                </div>

                {/* Requirement Info Box */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      Чтобы постоянно зарабатывать сатоши, ваш компьютер должен быть постоянно включен, а сайт должен быть открыт на этой вкладке.
                    </p>
                  </div>
                </div>

                {/* Action CTA Button */}
                <button
                  onClick={() => setIdleModalOpen(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  Понятно, возобновить майнинг
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
