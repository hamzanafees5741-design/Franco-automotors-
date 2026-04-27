import { useState } from 'react';
import { MessageSquare, Mail, Smartphone, Bell, CheckCircle, Clock, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const notifications = [
  { id: 1, type: 'whatsapp', customer: 'Carlos Mendoza', msg: { en: 'Your 5-Minute Key Handover is scheduled for Jan 16 at 11:00 AM. We\'ll be there! ⚡🔑', es: 'Su Entrega de Llaves en 5 Minutos está programada para el 16 de Ene a las 11:00 AM. ¡Allí estaremos! ⚡🔑' }, time: '2h ago', status: 'delivered' },
  { id: 2, type: 'sms', customer: 'Roberto Vega', msg: { en: 'Your Trade-In Valuation is ready — check your offer now! Log in to Franco Automotors Express Portal.', es: '¡Su Valuación de Intercambio está lista — vea su oferta ahora! Inicie sesión en el Portal Exprés de Franco Automotors.' }, time: '3h ago', status: 'delivered' },
  { id: 3, type: 'email', customer: 'Miguel Alvarez', msg: { en: 'Document Review Complete ✅ All documents approved. Your vehicle is being prepared for delivery.', es: 'Revisión de Documentos Completa ✅ Todos los documentos aprobados. Su vehículo está siendo preparado para entrega.' }, time: '4h ago', status: 'read' },
  { id: 4, type: 'whatsapp', customer: 'Luis Ramirez', msg: { en: 'Welcome to Franco Automotors! Your Express Portal account is active. Upload your documents to get started! 📄', es: '¡Bienvenido a Franco Automotors! Su cuenta del Portal Exprés está activa. ¡Cargue sus documentos para comenzar! 📄' }, time: '6h ago', status: 'delivered' },
  { id: 5, type: 'sms', customer: 'Diana Santos', msg: { en: 'DELIVERED ✅ Your 2022 Toyota Tacoma has been delivered. Thank you for choosing Franco Automotors!', es: 'ENTREGADO ✅ Su 2022 Toyota Tacoma ha sido entregado. ¡Gracias por elegir Franco Automotors!' }, time: '1d ago', status: 'delivered' },
  { id: 6, type: 'email', customer: 'Pedro Morales', msg: { en: 'Your order #FA-094 has been confirmed. Complete your documents online to activate your 5-minute key handover!', es: 'Su pedido #FA-094 ha sido confirmado. ¡Complete sus documentos en línea para activar su entrega de llaves en 5 minutos!' }, time: '1d ago', status: 'sent' },
];

const templates = [
  {
    id: 't1',
    name: { en: '5-Min Key Handover Scheduled', es: 'Entrega de Llaves en 5-Min Programada' },
    type: 'whatsapp',
    msg: { en: 'Hi [Name]! Your 5-Minute Key Handover is scheduled for [Date] at [Time]. Franco Automotors — Miami\'s fastest dealer! 🔑⚡', es: '¡Hola [Nombre]! Su Entrega de Llaves en 5 Minutos está programada para [Fecha] a las [Hora]. Franco Automotors — ¡El concesionario más rápido de Miami! 🔑⚡' },
  },
  {
    id: 't2',
    name: { en: 'Trade-In Offer Ready', es: 'Oferta de Intercambio Lista' },
    type: 'sms',
    msg: { en: 'Great news [Name]! Your Trade-In Valuation is ready — Offer: $[Amount]. Check it now at your Express Portal. Franco Automotors.', es: '¡Buenas noticias [Nombre]! Su Valuación de Intercambio está lista — Oferta: $[Monto]. Véala ahora en su Portal Exprés. Franco Automotors.' },
  },
  {
    id: 't3',
    name: { en: 'Document Approval', es: 'Aprobación de Documentos' },
    type: 'email',
    msg: { en: 'Hello [Name], All your documents have been verified and approved ✅. Your vehicle delivery is now being scheduled. Thank you! — Franco Automotors', es: 'Hola [Nombre], Todos sus documentos han sido verificados y aprobados ✅. La entrega de su vehículo está siendo programada. ¡Gracias! — Franco Automotors' },
  },
  {
    id: 't4',
    name: { en: 'Welcome Message', es: 'Mensaje de Bienvenida' },
    type: 'whatsapp',
    msg: { en: '¡Hola [Name]! Welcome to Franco Automotors Express Portal 🎉 Upload your docs, check your trade-in, and schedule your 5-min key handover — all online. Miami\'s fastest dealer!', es: '¡Hola [Nombre]! Bienvenido al Portal Exprés de Franco Automotors 🎉 Cargue sus docs, verifique su intercambio y programe su entrega de llaves en 5 min — todo en línea. ¡El concesionario más rápido de Miami!' },
  },
  {
    id: 't5',
    name: { en: 'Delivery Complete', es: 'Entrega Completada' },
    type: 'sms',
    msg: { en: 'DELIVERED ✅ Congratulations [Name]! Your [Vehicle] has been delivered in [Time] minutes! Thank you for choosing Franco Automotors. Enjoy your new ride! 🚗', es: 'ENTREGADO ✅ ¡Felicidades [Nombre]! Su [Vehículo] ha sido entregado en [Tiempo] minutos. ¡Gracias por elegir Franco Automotors. Disfrute su nuevo vehículo! 🚗' },
  },
];

const typeIcon: Record<string, any> = {
  whatsapp: { icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30', emoji: '💬' },
  sms: { icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', emoji: '📱' },
  email: { icon: Mail, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30', emoji: '📧' },
};

export default function NotificationsPage() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'whatsapp' | 'sms' | 'email'>('all');

  const filtered = activeFilter === 'all' ? notifications : notifications.filter(n => n.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Bell size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">{t('notif.title')}</h1>
              <p className="text-gray-400 text-sm">{language === 'en' ? 'Automated notifications in English & Spanish' : 'Notificaciones automáticas en Inglés y Español'}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t('notif.whatsapp'), count: 2, color: 'text-green-400', icon: '💬' },
              { label: t('notif.sms'), count: 2, color: 'text-blue-400', icon: '📱' },
              { label: t('notif.email'), count: 2, color: 'text-purple-400', icon: '📧' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className={`font-black text-xl ${item.color}`}>{item.count}</div>
                <div className="text-gray-500 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'whatsapp', 'sms', 'email'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                activeFilter === f
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f === 'all' ? (language === 'en' ? 'All' : 'Todos') :
               f === 'whatsapp' ? '💬 WhatsApp' :
               f === 'sms' ? '📱 SMS' : '📧 Email'}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5">{t('notif.allNotif')}</h2>
          <div className="space-y-3">
            {filtered.map(notif => {
              const tc = typeIcon[notif.type];
              return (
                <div key={notif.id} className="flex gap-4 p-4 bg-white/5 border border-white/8 rounded-xl hover:bg-white/8 transition-all">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${tc.bg}`}>
                    <span className="text-lg">{tc.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">{notif.customer}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${tc.bg} ${tc.color} font-medium`}>
                          {notif.type === 'whatsapp' ? 'WhatsApp' : notif.type === 'sms' ? 'SMS' : 'Email'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-gray-500 text-xs">{notif.time}</span>
                        {notif.status === 'delivered' && <CheckCircle size={12} className="text-green-400" />}
                        {notif.status === 'sent' && <Clock size={12} className="text-yellow-400" />}
                        {notif.status === 'read' && <CheckCircle size={12} className="text-blue-400" />}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{notif.msg[language as 'en' | 'es']}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Templates */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <Zap size={18} className="text-red-500" />
            {t('notif.templates')}
          </h2>
          <p className="text-gray-400 text-xs mb-5">
            {language === 'en' ? 'Ready-to-send templates in English & Spanish' : 'Plantillas listas para enviar en Inglés y Español'}
          </p>
          <div className="space-y-4">
            {templates.map(tmpl => {
              const tc = typeIcon[tmpl.type];
              return (
                <div key={tmpl.id} className="border border-white/10 rounded-xl overflow-hidden">
                  <div className={`flex items-center justify-between px-4 py-3 border-b border-white/10 ${tc.bg}`}>
                    <div className="flex items-center gap-2">
                      <span>{tc.emoji}</span>
                      <span className={`font-bold text-sm ${tc.color}`}>{tmpl.name[language as 'en' | 'es']}</span>
                    </div>
                    <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-all font-medium">
                      {language === 'en' ? 'Use Template' : 'Usar Plantilla'}
                    </button>
                  </div>
                  <div className="px-4 py-3 bg-white/2">
                    <p className="text-gray-400 text-xs leading-relaxed italic">"{tmpl.msg[language as 'en' | 'es']}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
