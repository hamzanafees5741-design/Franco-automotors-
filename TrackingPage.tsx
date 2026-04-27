import { useState, useEffect } from 'react';
import { Phone, MessageSquare, CheckCircle, Clock, Zap, Navigation, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const trackingSteps = [
  { en: 'Order Confirmed', es: 'Pedido Confirmado', time: '9:00 AM', done: true },
  { en: 'Vehicle Prepared & Inspected', es: 'Vehículo Preparado e Inspeccionado', time: '10:15 AM', done: true },
  { en: 'Driver Assigned — Miguel Torres', es: 'Conductor Asignado — Miguel Torres', time: '10:45 AM', done: true },
  { en: 'Driver En Route to Your Location', es: 'Conductor en Camino a Su Ubicación', time: '11:02 AM', done: true },
  { en: 'Driver Nearby — Prepare for Key Handover!', es: '¡Conductor Cerca — Prepárese para la Entrega de Llaves!', time: '11:18 AM', done: false, current: true, nearby: true },
  { en: '5-Minute Key Handover Complete', es: 'Entrega de Llaves en 5 Minutos Completada', time: 'Pending', done: false },
];

export default function TrackingPage() {
  const { t, language } = useLanguage();
  const [handoverCountdown, setHandoverCountdown] = useState(300);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'driver', text: language === 'en' ? "Hi! I'm Miguel, your delivery driver. I'm about 8 minutes away. See you soon! 👋" : "¡Hola! Soy Miguel, su conductor de entrega. Estoy a unos 8 minutos. ¡Hasta pronto! 👋" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHandoverCountdown(p => p > 0 ? p - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hMin = Math.floor(handoverCountdown / 60);
  const hSec = handoverCountdown % 60;

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const newMessages = [...chatMessages, { from: 'user', text: chatMsg }];
    setChatMessages(newMessages);
    setChatMsg('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: 'driver',
        text: language === 'en'
          ? "Got it! I'll be there shortly. I have your keys ready for the 5-minute handover! 🔑"
          : "¡Entendido! Estaré allí en breve. ¡Tengo sus llaves listas para la entrega en 5 minutos! 🔑"
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Navigation size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">{t('tracking.title')}</h1>
              <p className="text-red-400 text-sm font-medium">Order #FA-2024-089 — 2022 Ford F-150 XLT</p>
            </div>
          </div>

          {/* Nearby Alert */}
          <div className="bg-red-600/20 border border-red-500/40 rounded-xl p-3 flex items-center gap-3 animate-pulse">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <p className="text-red-300 font-bold text-sm">{t('tracking.nearbyAlert')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="relative h-64 sm:h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {/* Miami Map Simulation */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Roads */}
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#374151" strokeWidth="8"/>
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#374151" strokeWidth="8"/>
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#374151" strokeWidth="4"/>
                  <line x1="0" y1="220" x2="400" y2="220" stroke="#374151" strokeWidth="4"/>
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#374151" strokeWidth="4"/>
                  <line x1="300" y1="0" x2="300" y2="300" stroke="#374151" strokeWidth="4"/>
                  <line x1="0" y1="30" x2="400" y2="130" stroke="#374151" strokeWidth="3"/>
                  <line x1="0" y1="170" x2="400" y2="270" stroke="#374151" strokeWidth="3"/>
                  {/* Route highlight */}
                  <path d="M 80 240 Q 150 200 180 160 Q 210 120 250 140" stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="8,4"/>
                  {/* Driver marker */}
                  <circle cx="250" cy="140" r="12" fill="#EF4444"/>
                  <text x="250" y="144" textAnchor="middle" fontSize="12" fill="white">🚗</text>
                  {/* Destination */}
                  <circle cx="80" cy="240" r="10" fill="#22C55E"/>
                  <text x="80" y="244" textAnchor="middle" fontSize="10" fill="white">📍</text>
                  {/* Blocks */}
                  <rect x="110" y="90" width="80" height="50" fill="#1F2937" rx="4"/>
                  <rect x="210" y="90" width="80" height="50" fill="#1F2937" rx="4"/>
                  <rect x="110" y="160" width="80" height="50" fill="#1F2937" rx="4"/>
                  <rect x="210" y="160" width="80" height="50" fill="#1F2937" rx="4"/>
                </svg>
              </div>

              {/* ETA Badge */}
              <div className="absolute top-4 right-4 bg-gray-900/90 border border-white/20 rounded-xl px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-gray-400 text-xs">{t('tracking.eta')}</p>
                <p className="text-white font-black text-xl">~8 min</p>
                <p className="text-red-400 text-xs">11:26 AM</p>
              </div>

              {/* Miami Label */}
              <div className="text-center">
                <p className="text-gray-500 font-bold text-lg tracking-widest uppercase">Miami, FL</p>
                <p className="text-gray-600 text-xs">Live Tracking</p>
              </div>
            </div>

            {/* Driver Info */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t('tracking.driver')}: Miguel Torres</p>
                    <p className="text-gray-400 text-xs">⭐ 4.9 • {language === 'en' ? 'Express Delivery Specialist' : 'Especialista en Entrega Exprés'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 bg-green-600/20 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-600/30 transition-all">
                    <Phone size={14} />
                  </button>
                  <button
                    onClick={() => setChatOpen(true)}
                    className="w-9 h-9 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-600/30 transition-all"
                  >
                    <MessageSquare size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* 5-Minute Countdown */}
            <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-500/30 rounded-2xl p-5 text-center">
              <p className="text-red-300 font-bold text-sm mb-3">{t('tracking.countdown')}</p>
              <div className="flex items-center justify-center gap-2">
                <div className="bg-red-600/20 border border-red-500/30 rounded-xl px-4 py-3">
                  <div className="text-red-400 font-black text-4xl tabular-nums">{String(hMin).padStart(2,'0')}</div>
                  <div className="text-gray-500 text-xs">{language === 'en' ? 'MIN' : 'MIN'}</div>
                </div>
                <span className="text-red-600 font-black text-3xl">:</span>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="text-white font-black text-4xl tabular-nums">{String(hSec).padStart(2,'0')}</div>
                  <div className="text-gray-500 text-xs">{language === 'en' ? 'SEC' : 'SEG'}</div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                {language === 'en' ? 'Until your 5-minute key handover begins' : 'Hasta que comience su entrega de llaves en 5 minutos'}
              </p>
            </div>

            {/* Tracking Steps */}
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">{t('tracking.status')}</h3>
              <div className="space-y-3">
                {trackingSteps.map((step, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                    step.nearby ? 'bg-red-600/15 border border-red-500/40' :
                    step.done ? 'bg-white/3 border border-white/8' :
                    'bg-white/2 border border-white/5'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      step.done && !step.nearby ? 'bg-green-500' :
                      step.nearby ? 'bg-red-600 animate-pulse' :
                      'bg-white/10'
                    }`}>
                      {step.done && !step.nearby ? (
                        <CheckCircle size={12} className="text-white" />
                      ) : step.nearby ? (
                        <Zap size={12} className="text-white" />
                      ) : (
                        <Clock size={12} className="text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${
                        step.nearby ? 'text-red-300' :
                        step.done ? 'text-gray-200' :
                        'text-gray-600'
                      }`}>{language === 'en' ? step.en : step.es}</p>
                      <p className={`text-xs mt-0.5 ${step.done || step.nearby ? 'text-gray-500' : 'text-gray-700'}`}>{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Chat Button */}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
            >
              <MessageSquare size={16} />
              {t('tracking.liveChat')} — Miguel Torres
            </button>
          </div>
        </div>

        {/* Live Chat Panel */}
        {chatOpen && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={16} className="text-white" />
                <span className="text-white font-semibold text-sm">{t('tracking.liveChat')} — Miguel Torres</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white text-lg">×</button>
            </div>
            <div className="p-4 space-y-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-200'
                  }`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder={language === 'en' ? 'Message driver...' : 'Mensaje al conductor...'}
                className="flex-1 bg-white/10 text-white placeholder-gray-500 text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none"
              />
              <button onClick={sendChat} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                {language === 'en' ? 'Send' : 'Enviar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
