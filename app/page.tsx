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
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function Home() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  
  // Interactive live BTC price simulator to add realism and dynamic feel
  const [btcPrice, setBtcPrice] = React.useState(58432.50);
  const [btcTrend, setBtcTrend] = React.useState< 'up' | 'down' >('up');
  const [totalPaidOut, setTotalPaidOut] = React.useState(2514892410);

  React.useEffect(() => {
    // Tick price slightly
    const interval = setInterval(() => {
      const changePercent = (Math.random() - 0.49) * 0.05; // biased positive slightly
      const change = btcPrice * (changePercent / 100);
      setBtcPrice(prev => {
        const next = prev + change;
        setBtcTrend(change >= 0 ? 'up' : 'down');
        return next;
      });
      // Increase payout counter slightly to simulate live payouts
      setTotalPaidOut(prev => prev + Math.floor(Math.random() * 50) + 15);
    }, 4000);

    return () => clearInterval(interval);
  }, [btcPrice]);

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

  return (
    <div id="home" className="relative min-h-screen overflow-hidden text-slate-100 selection:bg-[#f7971e]/30 selection:text-[#ffd200]" style={{ backgroundColor: '#03040b', backgroundImage: 'radial-gradient(circle at 50% 0%, #0e0e26 0%, #03040b 70%, #010105 100%)', lineHeight: '23px', paddingLeft: '0px', marginLeft: '0px', marginBottom: '0px', marginTop: '99px' }}>
      
      {/* 1. Dynamic Grid Overlays for Web3 tech feel */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at 50% 50%, white 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 40%, transparent 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      {/* 2. Layered High-End Glowing Orbs (Nebula Effect) */}
      {/* Top Left: Bitcoin Warm Glow */}
      <div className="absolute top-[-100px] left-[-50px] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[130px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '14s' }} />
      {/* Center Left: Cryptography Cyan Glow */}
      <div className="absolute top-[25%] left-[-200px] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none mix-blend-screen animate-float" />
      {/* Top Right: Accent Violet Glow */}
      <div className="absolute top-0 right-[-100px] w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '16s' }} />
      {/* Mid Right: Golden Aura */}
      <div className="absolute top-[40%] right-[-150px] w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none mix-blend-screen animate-float-delayed" />
      {/* Bottom Center: Deep Velvet Glow */}
      <div className="absolute bottom-[-150px] left-1/3 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[160px] pointer-events-none mix-blend-screen animate-pulse-slow" style={{ animationDuration: '18s' }} />

      {/* 3. Subtle floating ambient sparks / digital particles */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[15%] left-[25%] w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[45%] left-[80%] w-1 h-1 rounded-full bg-cyan-400 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-[75%] left-[15%] w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[70%] w-1 h-1 rounded-full bg-amber-400 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[60%] left-[40%] w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
      </div>

      {/* 1. TOP PROMO BANNER */}
      <div className="relative z-50 bg-orange-500/10 border-b border-orange-500/20 text-[#ffd200] py-2.5 px-4 text-center font-semibold text-xs md:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 overflow-hidden backdrop-blur-md">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/20 px-2 py-0.5 rounded-md">🔥 Бонус</span>
          <span>+1000 Сатоши при регистрации сегодня!</span>
        </span>
        <a 
          href={REF_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors font-bold ml-2 inline-flex items-center gap-0.5"
        >
          Забрать <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* NAVIGATION / HEADER */}
      <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2.5" style={{ fontFamily: 'Courier New' }}>
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center font-bold text-slate-900 shadow-[0_0_15px_rgba(247,151,30,0.3)]">
            ₿
          </div>
          <div>
            <span className="font-['Poppins'] font-bold text-xl tracking-tight text-white" style={{ fontFamily: 'Poppins' }}>Freebitco<span className="text-orange-400">Referral</span></span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#benefits" className="hover:text-white transition-colors" style={{ fontFamily: 'Georgia' }}>Преимущества</a>
          <a href="#steps" className="hover:text-white transition-colors" style={{ fontFamily: 'Georgia' }}>Как начать</a>
          <a href="#testimonials" className="hover:text-white transition-colors" style={{ fontFamily: 'Georgia' }}>Отзывы</a>
          <a href="#stats" className="hover:text-white transition-colors" style={{ fontFamily: 'Georgia' }}>Статистика</a>
          <a href="#faq" className="hover:text-white transition-colors" style={{ fontFamily: 'Georgia' }}>FAQ</a>
        </nav>

        {/* Header Action Button */}
        <div>
          <a 
            href={REF_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-4.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-semibold text-xs transition-all duration-300"
            style={{ fontFamily: 'Georgia' }}
          >
            Начать бесплатно
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-36 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16" style={{ height: '865.987px' }}>
        
        {/* Left Info Column */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-block"
          >
            <div className="inline-block p-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              <div className="px-4 py-1.5 bg-[#0a0b1e]/90 rounded-full flex items-center gap-1.5" style={{ fontFamily: 'Georgia' }}>
                <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Verified Crypto Platform</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Poppins'] text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6"
            style={{ fontFamily: 'Georgia', fontSize: '57px', lineHeight: '60px', marginBottom: '25px', textAlign: 'left' }}
          >
            Зарабатывай <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500">Bitcoin</span> <br />
            каждый час бесплатно
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 font-light max-w-2xl mx-auto lg:mx-0 mb-10"
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
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl text-slate-900 font-bold text-xl shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{ fontFamily: 'Georgia' }}
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
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400">СЕТЬ ОНЛАЙН</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg text-xs text-[#b0b0c0]">
                <Info className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Обновление в реальном времени</span>
              </div>
            </div>

            {/* Simulated Stats */}
            <div className="space-y-6">
              
              {/* BTC Price block */}
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="text-xs text-[#80809a] font-semibold mb-1">СИМУЛЯТОР КУРСА BTC/USD</div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
                    ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={cn(
                    "font-mono text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1",
                    btcTrend === 'up' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )}>
                    {btcTrend === 'up' ? (
                      <>
                        <TrendingUp className="w-3 h-3" />
                        +0.42%
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3 h-3" />
                        -0.18%
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Total payouts ticker */}
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="text-xs text-[#80809a] font-semibold mb-1">ВЫПЛАЧЕНО ПОЛЬЗОВАТЕЛЯМ</div>
                <div className="font-display font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-[#ffd200] to-[#f7971e] bg-clip-text text-transparent tracking-tight">
                  ${totalPaidOut.toLocaleString('en-US')}
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
                  <div className="font-display font-bold text-xl text-white">50%</div>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] text-[#80809a] font-bold mb-1 uppercase tracking-wider">Шанс выиграть</div>
                  <div className="font-display font-bold text-xl text-[#00d4ff]">до $200 / час</div>
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
      <section id="benefits" className="relative z-10 py-24 bg-[#0a0b1e]/60 border-t border-b border-white/5" style={{ fontFamily: 'Georgia' }}>
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
                className="relative inline-flex items-center gap-3 px-10 py-4.5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl text-slate-900 font-bold text-base tracking-wider shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Начать зарабатывать сейчас
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF / TRUST BLOCK */}
      <section className="relative z-10 py-24 bg-[#0a0b1e]/60 border-t border-b border-white/5">
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
      <section id="faq" className="relative z-10 py-24 bg-[#0a0b1e]/60 border-t border-white/5">
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
      <footer className="relative z-10 bg-[#060714] border-t border-white/5 pt-16 pb-12 px-6 md:px-12" style={{ marginTop: '100px' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 border-b border-white/5 pb-12 mb-8">
          
          {/* Logo brand info */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4" style={{ fontFamily: 'Georgia' }}>
              <Coins className="w-6 h-6 text-[#ffd200]" />
              <span className="font-display font-bold text-lg tracking-wider text-white" style={{ fontFamily: 'Georgia' }}>Freebitco Referral Hub</span>
            </div>
            <p className="text-xs text-[#80809a] leading-relaxed" style={{ fontFamily: 'Georgia' }}>
              Независимая премиальная платформа для привлечения рефералов, аналитики возможностей и обучения крипто-партнеров. Зарабатывайте безопасно вместе с нами.
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
            © 2026 Freebitco Referral Hub | Все права защищены. Сайт является независимым информационным партнерским ресурсом. Торговые марки, логотипы и официальное название проекта принадлежат их законным правообладателям. Не является финансовой консультацией. Участие разрешено только для лиц старше 18 лет.
          </p>
          <p className="leading-relaxed border-l-2 border-[#f7971e]/30 pl-3" style={{ fontFamily: 'Georgia' }}>
            <span className="text-[#80809a] font-bold">Отказ от ответственности (Disclaimer):</span> Результаты получения Биткоинов зависят исключительно от вашей личной активности, количества приглашенных рефералов и регулярности сбора сатоши. Участие в лотереях и ставках MULTIPLY BTC несет в себе риски потери части криптовалютного баланса. Пожалуйста, играйте ответственно и взвешенно.
          </p>
        </div>
      </footer>

    </div>
  );
}
