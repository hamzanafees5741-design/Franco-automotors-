import { useState, useEffect } from 'react';
import { CheckCircle, Zap, FileText, Car, DollarSign, Key, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const steps = [
  {
    icon: FileText,
    keyT: 'keyHandover.step1',
    time: { en: '24–48 hrs before', es: '24–48 hrs antes' },
    color: 'from-green-500 to-green-700',
    desc: { en: 'ID, insurance, and contracts uploaded online — zero paperwork at the dealership.', es: 'ID, seguro y contratos cargados en línea — cero papeleo en el concesionario.' },
    done: true,
  },
  {
    icon: Car,
    keyT: 'keyHandover.step2',
    time: { en: 'Within 2 hours', es: 'Dentro de 2 horas' },
    color: 'from-blue-500 to-blue-700',
    desc: { en: 'Trade-in vehicle assessed remotely — offer sent to your phone.', es: 'Vehículo de intercambio evaluado de forma remota — oferta enviada a su teléfono.' },
    done: true,
  },
  {
    icon: DollarSign,
    keyT: 'keyHandover.step3',
    time: { en: 'Same day', es: 'El mismo día' },
    color: 'from-purple-500 to-purple-700',
    desc: { en: 'Financing pre-approved digitally — rates locked in before you arrive.', es: 'Financiamiento pre-aprobado digitalmente — tasas aseguradas antes de que llegue.' },
    done: true,
  },
  {
    icon: Car,
    keyT: 'keyHandover.step4',
    time: { en: '1 hour before', es: '1 hora antes' },
    color: 'from-orange-500 to-orange-700',
    desc: { en: 'Your new vehicle is detailed, inspected, and ready to roll.', es: 'Su nuevo vehículo está limpio, inspeccionado y listo para rodar.' },
    done: true,
  },
  {
    icon: Key,
    keyT: 'keyHandover.step5',
    time: { en: '< 5 MINUTES', es: '< 5 MINUTOS' },
    color: 'from-red-600 to-red-800',
    desc: { en: 'You arrive. We hand you the keys. Done. Drive away in your new vehicle in under 5 minutes.', es: 'Usted llega. Le entregamos las llaves. Listo. Salga manejando su nuevo vehículo en menos de 5 minutos.' },
    done: false,
    highlight: true,
  },
];

export default function KeyHandoverPage() {
  const { t, language } = useLanguage();
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || timer <= 0) return;
    const interval = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const avgTimes = [
    { label: { en: 'Traditional Dealer', es: 'Concesionario Tradicional' }, time: '3–4 hrs', color: 'bg-gray-600', width: '100%' },
    { label: { en: 'Other Express Dealers', es: 'Otros Concesionarios Exprés' }, time: '45–60 min', color: 'bg-yellow-600', width: '25%' },
    { label: { en: 'Franco Automotors', es: 'Franco Automotors' }, time: '< 5 min', color: 'bg-red-600', width: '5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <div className="relative bg-gradient-to-r from-red-900 to-black border border-red-600/30 rounded-2xl p-6 sm:p-8 overflow-hidden text-center shadow-2xl shadow-red-900/40">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full mb-4 shadow-lg shadow-red-900/50">
              <Zap size={16} className="text-white" />
              <span className="text-white font-bold text-sm uppercase tracking-wider">Express Process</span>
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl mb-3">{t('keyHandover.title')}</h1>
            <p className="text-red-300 text-base sm:text-lg font-medium max-w-lg mx-auto">{t('keyHandover.tagline')}</p>
          </div>
        </div>

        {/* 5-Minute Live Timer */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 text-center">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center justify-center gap-2">
            <Clock size={20} className="text-red-500" />
            {language === 'en' ? 'Our 5-Minute Key Handover Timer' : 'Nuestro Temporizador de Entrega en 5 Minutos'}
          </h2>
          <div className="inline-flex items-center gap-2 bg-black/50 border-2 border-red-600 rounded-2xl px-8 py-6 shadow-xl shadow-red-900/30 mb-4">
            <div className="text-center">
              <div className="text-red-400 font-black text-6xl sm:text-7xl tabular-nums leading-none">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-gray-500 text-xs mt-1 uppercase">{t('keyHandover.minutes')}</div>
            </div>
            <div className="text-red-600 font-black text-5xl pb-4">:</div>
            <div className="text-center">
              <div className="text-white font-black text-6xl sm:text-7xl tabular-nums leading-none">
                {String(seconds).padStart(2, '0')}
              </div>
              <div className="text-gray-500 text-xs mt-1 uppercase">{t('keyHandover.seconds')}</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setRunning(!running)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-red-900/30"
            >
              {running ? (language === 'en' ? '⏸ Pause' : '⏸ Pausar') : (language === 'en' ? '▶ Start Demo' : '▶ Iniciar Demo')}
            </button>
            <button
              onClick={() => { setTimer(300); setRunning(false); }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all border border-white/10"
            >
              {language === 'en' ? '↺ Reset' : '↺ Reiniciar'}
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-3">{language === 'en' ? 'Average traditional dealership: 3-4 hours' : 'Concesionario tradicional promedio: 3-4 horas'}</p>
        </div>

        {/* Process Timeline */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-xl mb-6">{t('keyHandover.expressProcess')}</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex gap-4 p-4 rounded-xl border transition-all ${
                  step.highlight
                    ? 'bg-red-600/15 border-red-500/40 shadow-lg shadow-red-900/20'
                    : step.done
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/3 border-white/5'
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon size={22} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm">{t(step.keyT)}</span>
                    {step.done && !step.highlight && (
                      <CheckCircle size={14} className="text-green-400" />
                    )}
                    {step.highlight && (
                      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">⚡ EXPRESS</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{step.desc[language as 'en' | 'es']}</p>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-right">
                  <span className={`text-xs font-bold ${step.highlight ? 'text-red-400' : 'text-gray-500'}`}>
                    {step.time[language as 'en' | 'es']}
                  </span>
                </div>

                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-8 top-full h-4 w-0.5 bg-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Speed Comparison */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-6">
            {language === 'en' ? 'Speed Comparison — Miami Dealerships' : 'Comparación de Velocidad — Concesionarios Miami'}
          </h2>
          <div className="space-y-4">
            {avgTimes.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className={i === 2 ? 'text-red-400 font-bold' : 'text-gray-400'}>{item.label[language as 'en' | 'es']}</span>
                  <span className={i === 2 ? 'text-red-400 font-black' : 'text-gray-400'}>{item.time}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: item.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-red-300 text-xs font-bold mt-4 text-center">
            {language === 'en'
              ? '🏆 Franco Automotors is 48x faster than the industry average!'
              : '🏆 ¡Franco Automotors es 48 veces más rápido que el promedio de la industria!'}
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Carlos M.', role: { en: 'General Contractor', es: 'Contratista General' }, quote: { en: '"Got my F-150 in 4 minutes flat. Incredible!"', es: '"Obtuve mi F-150 en exactamente 4 minutos. ¡Increíble!"' }, rating: 5 },
            { name: 'Roberto V.', role: { en: 'Plumbing Business Owner', es: 'Dueño de Negocio de Plomería' }, quote: { en: '"No waiting, no paperwork. My time is money."', es: '"Sin esperas, sin papeleo. Mi tiempo es dinero."' }, rating: 5 },
            { name: 'Miguel A.', role: { en: 'Electrical Contractor', es: 'Contratista Eléctrico' }, quote: { en: '"Best car buying experience in Miami, period."', es: '"La mejor experiencia de compra de auto en Miami, sin duda."' }, rating: 5 },
          ].map((r, i) => (
            <div key={i} className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <div className="flex text-yellow-400 text-xs mb-2">{'★'.repeat(r.rating)}</div>
              <p className="text-gray-300 text-sm italic mb-3">{r.quote[language as 'en' | 'es']}</p>
              <div>
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-gray-500 text-xs">{r.role[language as 'en' | 'es']}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
