import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Zap, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const timeSlots = [
  { id: 'morning', icon: '🌅', available: true },
  { id: 'afternoon', icon: '☀️', available: true },
  { id: 'evening', icon: '🌆', available: false },
];

export default function DeliveryPage() {
  const { t, language } = useLanguage();
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    date: '',
    timeSlot: '',
    address: '',
    instructions: '',
  });
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, minutes: 32, seconds: 0 });

  useEffect(() => {
    if (!confirmed) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0) return { ...prev, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [confirmed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.timeSlot || !form.address) return;
    setConfirmed(true);
  };

  const slotLabel = (slot: string) => {
    if (slot === 'morning') return t('delivery.morning');
    if (slot === 'afternoon') return t('delivery.afternoon');
    return t('delivery.evening');
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Confirmation Hero */}
          <div className="bg-gradient-to-br from-green-900/30 to-gray-900 border border-green-500/30 rounded-2xl p-8 text-center shadow-xl">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/50">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">{t('delivery.confirmed')}</h2>
            <p className="text-gray-300 text-sm">{t('delivery.confirmedMsg')}</p>

            {/* Delivery Details */}
            <div className="mt-6 bg-white/5 rounded-xl p-4 text-left space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">{t('delivery.date')}</p>
                  <p className="text-white font-semibold text-sm">{form.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">{t('delivery.timeSlot')}</p>
                  <p className="text-white font-semibold text-sm">{slotLabel(form.timeSlot)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-xs">{t('delivery.address')}</p>
                  <p className="text-white font-semibold text-sm">{form.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-red-600/10 border border-red-500/30 rounded-xl p-3">
              <p className="text-red-300 text-xs font-bold flex items-center justify-center gap-2">
                <Zap size={14} />
                {t('delivery.fiveMin')}
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg text-center mb-6">{t('delivery.countdown')}</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { val: countdown.days, label: t('common.days') },
                { val: countdown.hours, label: t('common.hours') },
                { val: countdown.minutes, label: language === 'en' ? 'min' : 'min' },
                { val: countdown.seconds, label: language === 'en' ? 'sec' : 'seg' },
              ].map((item, i) => (
                <div key={i} className="text-center bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-red-400 font-black text-3xl tabular-nums">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center bg-gradient-to-r from-red-600/10 to-transparent border border-red-500/20 rounded-xl p-3">
              <p className="text-red-300 font-black text-sm">⚡ {language === 'en' ? 'Key Handover: UNDER 5 MINUTES' : 'Entrega de Llaves: MENOS DE 5 MINUTOS'}</p>
            </div>
          </div>

          {/* Delivery Window */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t('delivery.window')}</p>
                <p className="text-gray-400 text-xs">{language === 'en' ? 'Miami Metro Area — Guaranteed Express Delivery' : 'Área Metro Miami — Entrega Exprés Garantizada'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setConfirmed(false)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-all text-sm border border-white/10"
          >
            {language === 'en' ? '← Reschedule' : '← Reprogramar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">{t('delivery.title')}</h1>
              <p className="text-red-400 text-sm font-medium">{t('delivery.subtitle')}</p>
            </div>
          </div>
          <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2">
            <Zap size={14} className="text-red-400" />
            <p className="text-red-300 text-xs font-semibold">{t('delivery.window')}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-white/10 rounded-2xl p-6 space-y-6">
          {/* Date */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">
              <Calendar size={12} className="inline mr-1" />
              {t('delivery.date')}
            </label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-white/5 border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Clock size={12} className="inline mr-1" />
              {t('delivery.available')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {timeSlots.map(slot => (
                <button
                  type="button"
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => slot.available && setForm({ ...form, timeSlot: slot.id })}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    !slot.available
                      ? 'opacity-40 cursor-not-allowed bg-white/3 border-white/10'
                      : form.timeSlot === slot.id
                        ? 'bg-red-600 border-red-500 shadow-lg shadow-red-900/40'
                        : 'bg-white/5 border-white/15 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-2xl mb-2">{slot.icon}</div>
                  <p className={`text-sm font-bold ${form.timeSlot === slot.id ? 'text-white' : 'text-gray-300'}`}>
                    {t(`delivery.${slot.id}`)}
                  </p>
                  {!slot.available && (
                    <p className="text-red-400 text-xs mt-1">{language === 'en' ? 'Unavailable' : 'No disponible'}</p>
                  )}
                  {slot.available && form.timeSlot === slot.id && (
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <CheckCircle size={12} className="text-white" />
                      <span className="text-white text-xs">{language === 'en' ? 'Selected' : 'Seleccionado'}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">
              <MapPin size={12} className="inline mr-1" />
              {t('delivery.address')}
            </label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              placeholder={t('delivery.enterAddress')}
              required
              className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('delivery.instructions')}</label>
            <textarea
              value={form.instructions}
              onChange={e => setForm({ ...form, instructions: e.target.value })}
              placeholder={t('delivery.enterInstructions')}
              rows={3}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all resize-none"
            />
          </div>

          {/* Express Promise */}
          <div className="bg-gradient-to-r from-red-600/10 to-transparent border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
            <Star size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-bold text-sm">{language === 'en' ? 'Express Promise' : 'Promesa Exprés'}</p>
              <p className="text-gray-400 text-xs mt-1">{t('delivery.fiveMin')}</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 text-base"
          >
            <Calendar size={20} />
            {t('delivery.schedule')}
          </button>
        </form>
      </div>
    </div>
  );
}
