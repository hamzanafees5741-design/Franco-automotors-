import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, FileText, Car, Calendar, MapPin, Bell, BarChart2, Clock, Users } from 'lucide-react';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
  userRole: 'customer' | 'staff' | 'admin';
  onLogout: () => void;
}

export default function Navbar({ currentPage, setPage, userRole, onLogout }: NavbarProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const customerNav = [
    { key: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { key: 'documents', label: t('nav.documents'), icon: FileText },
    { key: 'tradeIn', label: t('nav.tradeIn'), icon: Car },
    { key: 'delivery', label: t('nav.delivery'), icon: Calendar },
    { key: 'tracking', label: t('nav.tracking'), icon: MapPin },
    { key: 'keyHandover', label: t('nav.keyHandover'), icon: Clock },
    { key: 'notifications', label: t('nav.notifications'), icon: Bell },
  ];

  const staffNav = [
    { key: 'staff', label: t('nav.staff'), icon: Users },
    { key: 'documents', label: t('nav.documents'), icon: FileText },
    { key: 'notifications', label: t('nav.notifications'), icon: Bell },
  ];

  const adminNav = [
    { key: 'staff', label: t('nav.staff'), icon: Users },
    { key: 'reports', label: t('nav.reports'), icon: BarChart2 },
    { key: 'documents', label: t('nav.documents'), icon: FileText },
    { key: 'notifications', label: t('nav.notifications'), icon: Bell },
  ];

  const navItems = userRole === 'customer' ? customerNav : userRole === 'staff' ? staffNav : adminNav;

  return (
    <nav className="bg-gray-900 border-b border-red-700/40 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setPage(userRole === 'customer' ? 'dashboard' : userRole === 'staff' ? 'staff' : 'reports')} className="flex-shrink-0">
            <Logo size="sm" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.key
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={onLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">{t('nav.logout')}</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-2 pt-3">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => { setPage(item.key); setMenuOpen(false); }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.key
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600/20 transition-all mt-2"
              >
                <LogOut size={16} />
                {t('nav.logout')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
