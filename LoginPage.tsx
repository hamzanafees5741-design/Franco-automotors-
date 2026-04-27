import { useState } from 'react';
import { FileText, Car, Calendar, Zap, Shield, Clock } from 'lucide-react';
import Logo from '../components/Logo';
import LanguageToggle from '../components/LanguageToggle';
import ChatWidget from '../components/ChatWidget';
import { useLanguage } from '../context/LanguageContext';

interface LoginPageProps {
  onLogin: (role: 'customer' | 'staff' | 'admin') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'customer' | 'staff' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab);
  };

  const tabs = [
    { key: 'customer' as const, label: t('login.customerLogin'), icon: Car, color: 'red' },
    { key: 'staff' as const, label: t('login.staffLogin'), icon: Shield, color: 'blue' },
    { key: 'admin' as const, label: t('login.adminLogin'), icon: Zap, color: 'purple' },
  ];

  const features = [
    {
      icon: FileText,
      title: t('login.feature1'),
      desc: t('login.feature1Desc'),
      color: 'from-red-500 to-red-700',
    },
    {
      icon: Car,
      title: t('login.feature2'),
      desc: t('login.feature2Desc'),
      color: 'from-gray-700 to-gray-900',
    },
    {
      icon: Calendar,
      title: t('login.feature3'),
      desc: t('login.feature3Desc'),
      color: 'from-red-700 to-black',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 opacity-95"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-3xl"></div>
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(220,38,38,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          {/* Logo */}
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="text-white text-xl font-medium mt-2 opacity-80">{t('login.welcome')}</h1>
          </div>

          {/* Main Tagline */}
          <div className="mb-8 text-center max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-red-600 px-6 py-4 rounded-2xl shadow-2xl shadow-red-900/50 border border-red-400/30">
              <Zap size={28} className="text-white flex-shrink-0" />
              <div>
                <p className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight">
                  "{t('login.tagline')}"
                </p>
              </div>
              <Zap size={28} className="text-white flex-shrink-0" />
            </div>
            <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">{t('login.subtitle')}</p>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-semibold transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'bg-red-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="text-xs">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">{t('login.email')}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('login.enterEmail')}
                    className="w-full bg-white/10 border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">{t('login.password')}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('login.enterPassword')}
                    className="w-full bg-white/10 border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 text-sm mt-2"
                >
                  <Zap size={16} />
                  {t('login.signIn')}
                </button>
                <div className="text-center">
                  <button type="button" className="text-gray-500 hover:text-red-400 text-xs transition-colors">
                    {t('login.forgotPassword')}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-200 group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <f.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
            {[
              { val: '< 5', unit: 'min', label: 'Key Handover' },
              { val: '2hr', unit: '', label: 'Trade-In Response' },
              { val: '24/7', unit: '', label: 'Digital Assistant' },
              { val: '100%', unit: '', label: 'Online Process' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-red-400 font-black text-2xl leading-none">{s.val}<span className="text-sm text-gray-400">{s.unit}</span></div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-6 text-gray-600 text-xs">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock size={12} className="text-red-600" />
            <span className="text-red-500 font-medium">{t('footer.tagline')}</span>
          </div>
          <p>1234 SW 8th Street, Miami, Florida 33130 USA | (305) 555-AUTO</p>
          <p className="mt-1">© {new Date().getFullYear()} Franco Automotors. {t('footer.rights')}</p>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
