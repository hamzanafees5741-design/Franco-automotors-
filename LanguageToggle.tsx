import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 text-white font-medium text-sm backdrop-blur-sm"
      title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      {language === 'en' ? (
        <>
          <span className="text-lg">🇺🇸</span>
          <span className="hidden sm:inline">EN</span>
        </>
      ) : (
        <>
          <span className="text-lg">🇪🇸</span>
          <span className="hidden sm:inline">ES</span>
        </>
      )}
    </button>
  );
}
