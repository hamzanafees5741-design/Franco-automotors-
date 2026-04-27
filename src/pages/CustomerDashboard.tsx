import { FileText, Car, Calendar, CheckCircle, Circle, Clock, MessageSquare, PenTool, Zap, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CustomerDashboardProps {
  setPage: (page: string) => void;
}

const progressSteps = [
  { key: 'progress.orderConfirmed', done: true },
  { key: 'progress.docsSubmitted', done: true },
  { key: 'progress.tradeInAssessed', done: true },
  { key: 'progress.deliveryScheduled', done: false },
  { key: 'progress.keyHandover', done: false },
];

const notifications = [
  { channel: 'WhatsApp', icon: '💬', msg: { en: 'Your Trade-In valuation is ready! Offer: $18,500', es: '¡Su valuación de intercambio está lista! Oferta: $18,500' }, time: '2h ago' },
  { channel: 'SMS', icon: '📱', msg: { en: 'Document review complete — all approved ✅', es: 'Revisión de documentos completa — todos aprobados ✅' }, time: '4h ago' },
  { channel: 'Email', icon: '📧', msg: { en: 'Your order #FA-2024-089 has been confirmed', es: 'Su pedido #FA-2024-089 ha sido confirmado' }, time: '1d ago' },
  { channel: 'WhatsApp', icon: '💬', msg: { en: 'Welcome to Franco Automotors! Your Express Portal is ready.', es: '¡Bienvenido a Franco Automotors! Su Portal Exprés está listo.' }, time: '2d ago' },
];

export default function CustomerDashboard({ setPage }: CustomerDashboardProps) {
  const { t, language } = useLanguage();

  const actionButtons = [
    {
      icon: FileText,
      label: t('dashboard.uploadDocs'),
      page: 'documents',
      color: 'from-red-600 to-red-800',
      shadow: 'shadow-red-900/40',
      desc: language === 'en' ? 'Upload ID, insurance, contracts' : 'Cargue ID, seguro, contratos',
    },
    {
      icon: Car,
      label: t('dashboard.tradeIn'),
      page: 'tradeIn',
      color: 'from-gray-700 to-gray-900',
      shadow: 'shadow-gray-900/40',
      desc: language === 'en' ? 'Get value in 2 hours online' : 'Obtenga valor en 2 horas en línea',
    },
    {
      icon: Calendar,
      label: t('dashboard.scheduleDelivery'),
      page: 'delivery',
      color: 'from-red-700 to-black',
      shadow: 'shadow-black/40',
      desc: language === 'en' ? '5-minute key handover' : 'Entrega de llaves en 5 minutos',
    },
  ];

  const currentStep = progressSteps.findIndex(s => !s.done);

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 shadow-2xl shadow-red-900/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-red-200" />
              <span className="text-red-200 text-xs font-medium uppercase tracking-wider">{t('dashboard.subtitle')}</span>
            </div>
            <h1 className="text-white font-black text-2xl sm:text-3xl">
              {t('dashboard.welcome')}, <span className="text-red-100">Carlos Mendoza</span> 👋
            </h1>
            <p className="text-red-200 text-sm mt-1">Order #FA-2024-089 • 2022 Ford F-150 XLT</p>
            <div className="mt-3 inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg">
              <Clock size={14} className="text-white" />
              <span className="text-white text-xs font-semibold">{t('dashboard.timeIsMoney')}</span>
            </div>
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actionButtons.map((btn, i) => (
            <button
              key={i}
              onClick={() => setPage(btn.page)}
              className={`bg-gradient-to-br ${btn.color} rounded-2xl p-6 text-left shadow-xl ${btn.shadow} hover:scale-[1.02] transition-all duration-200 group border border-white/5`}
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/25 transition-all">
                <btn.icon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-base">{btn.label}</h3>
              <p className="text-white/60 text-xs mt-1">{btn.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-white/80 text-xs font-medium">
                <span>{language === 'en' ? 'Get Started' : 'Comenzar'}</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Order Status */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <Clock size={12} className="text-white" />
            </div>
            {t('dashboard.orderStatus')}
          </h2>

          {/* Progress Bar */}
          <div className="relative">
            {/* Track Line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/10 z-0 hidden sm:block"></div>
            <div
              className="absolute top-5 left-5 h-0.5 bg-red-600 z-0 transition-all duration-1000 hidden sm:block"
              style={{ width: `${currentStep >= 0 ? (currentStep / (progressSteps.length - 1)) * 80 : 0}%` }}
            ></div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 relative z-10">
              {progressSteps.map((step, i) => (
                <div key={i} className={`flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 p-3 sm:p-2 rounded-xl ${
                  step.done ? 'bg-red-600/10 border border-red-500/30' : i === currentStep ? 'bg-white/5 border border-white/20' : 'bg-white/3 border border-white/5'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done ? 'bg-red-600' : i === currentStep ? 'bg-white/20 ring-2 ring-red-500' : 'bg-white/10'
                  }`}>
                    {step.done ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : (
                      <Circle size={18} className={i === currentStep ? 'text-red-400' : 'text-gray-600'} />
                    )}
                  </div>
                  <div className="sm:text-center">
                    <p className={`text-xs font-semibold leading-tight ${step.done ? 'text-red-300' : i === currentStep ? 'text-white' : 'text-gray-600'}`}>
                      {t(step.key)}
                    </p>
                    {step.done && <p className="text-green-500 text-xs mt-0.5">✓ Complete</p>}
                    {i === currentStep && <p className="text-yellow-400 text-xs mt-0.5 animate-pulse">● In Progress</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Notifications */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Bell size={18} className="text-red-500" />
              {t('dashboard.notifications')}
            </h2>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <span className="text-xl flex-shrink-0">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-red-400 text-xs font-semibold">{n.channel}</span>
                      <span className="text-gray-600 text-xs">{n.time}</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{n.msg[language as 'en' | 'es']}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Signature */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <PenTool size={18} className="text-red-500" />
              {t('dashboard.digitalSignature')}
            </h2>
            <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{language === 'en' ? 'Purchase Agreement' : 'Contrato de Compra'}</p>
                  <p className="text-gray-400 text-xs">{language === 'en' ? 'Ready for signature' : 'Listo para firma'}</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs mb-4">{t('dashboard.contractReady')}</p>

              {/* Signature Area */}
              <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl h-20 flex items-center justify-center mb-3">
                <div className="text-center">
                  <PenTool size={20} className="text-gray-500 mx-auto mb-1" />
                  <p className="text-gray-500 text-xs">{language === 'en' ? 'Click to sign digitally' : 'Clic para firmar digitalmente'}</p>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30">
                <PenTool size={16} />
                {t('dashboard.signNow')}
              </button>
            </div>

            {/* Quick Link to Key Handover */}
            <button
              onClick={() => setPage('keyHandover')}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-red-600/10 to-transparent border border-red-500/20 rounded-xl hover:from-red-600/20 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-red-400" />
                <div className="text-left">
                  <p className="text-red-300 text-xs font-semibold">{language === 'en' ? 'View 5-Minute Key Handover' : 'Ver Entrega de Llaves en 5 Minutos'}</p>
                  <p className="text-gray-500 text-xs">{language === 'en' ? "Miami's fastest delivery process" : 'El proceso de entrega más rápido de Miami'}</p>
                </div>
              </div>
              <span className="text-red-400 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* WhatsApp Quick Contact */}
            <div className="mt-3 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600/20 border border-green-500/30 rounded-xl text-green-400 text-xs font-medium hover:bg-green-600/30 transition-all">
                <MessageSquare size={14} />
                WhatsApp
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition-all">
                <MessageSquare size={14} />
                SMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calc_width() { return 100; }
