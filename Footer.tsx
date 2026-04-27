import { MapPin, Phone, Clock, Zap } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-950 border-t border-red-700/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo size="md" />
            <div className="mt-4 flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-lg px-3 py-2">
              <Zap size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-xs font-bold">{t('footer.tagline')}</p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span>{t('footer.address')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Phone size={14} className="text-red-500 flex-shrink-0" />
              <span>{t('footer.phone')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock size={14} className="text-red-500 flex-shrink-0" />
              <span>{t('footer.hours')}</span>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Express Portal</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('login.subtitle')}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded-full border border-red-500/30">⚡ 5-Min Handover</span>
              <span className="bg-white/5 text-gray-400 text-xs px-2 py-1 rounded-full border border-white/10">🚗 Express Portal</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Franco Automotors. {t('footer.rights')} | Miami, Florida USA
        </div>
      </div>
    </footer>
  );
}
