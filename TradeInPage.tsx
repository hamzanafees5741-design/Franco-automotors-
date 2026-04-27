import { useState } from 'react';
import { Car, Upload, CheckCircle, Clock, Search, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const makes = ['Ford', 'Chevrolet', 'Ram', 'GMC', 'Toyota', 'Honda', 'Nissan', 'Dodge', 'Jeep', 'Hyundai', 'Kia', 'Volkswagen', 'BMW', 'Mercedes-Benz'];

export default function TradeInPage() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    damage: '',
    loanAmount: '',
  });
  const [photosUploaded, setPhotosUploaded] = useState(false);

  const statusSteps = [
    { key: 'tradeIn.statusSubmitted', done: true },
    { key: 'tradeIn.statusUnderReview', done: false },
    { key: 'tradeIn.statusReady', done: false },
    { key: 'tradeIn.statusOfferSent', done: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Card */}
          <div className="bg-gradient-to-br from-green-900/30 to-gray-900 border border-green-500/30 rounded-2xl p-8 text-center shadow-xl">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/50">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">{t('tradeIn.submitted')}</h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">{t('tradeIn.submittedMsg')}</p>

            {/* Submission Details */}
            <div className="mt-6 bg-white/5 rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('tradeIn.make')}</span>
                <span className="text-white font-medium">{form.make || 'Ford'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('tradeIn.model')}</span>
                <span className="text-white font-medium">{form.model || 'F-150'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('tradeIn.year')}</span>
                <span className="text-white font-medium">{form.year || '2020'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('tradeIn.condition')}</span>
                <span className="text-white font-medium">{form.condition || 'Good'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Ref #</span>
                <span className="text-red-400 font-bold">TI-2024-{Math.floor(Math.random() * 900) + 100}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
              <Clock size={16} className="text-yellow-400" />
              <p className="text-yellow-300 text-sm font-medium">
                {language === 'en' ? 'Expected response within 2 hours' : 'Respuesta esperada dentro de 2 horas'}
              </p>
            </div>
          </div>

          {/* Status Tracker */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-6">
              {language === 'en' ? 'Trade-In Status Tracker' : 'Seguimiento de Intercambio'}
            </h3>
            <div className="space-y-3">
              {statusSteps.map((step, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  i === 0 ? 'bg-green-500/10 border border-green-500/30' :
                  i === 1 ? 'bg-yellow-500/10 border border-yellow-500/30 animate-pulse' :
                  'bg-white/5 border border-white/10'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i === 0 ? 'bg-green-500' :
                    i === 1 ? 'bg-yellow-500' :
                    'bg-white/10'
                  }`}>
                    {i === 0 ? (
                      <CheckCircle size={16} className="text-white" />
                    ) : i === 1 ? (
                      <Search size={16} className="text-white" />
                    ) : (
                      <span className="text-gray-500 text-sm font-bold">{i + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${
                      i === 0 ? 'text-green-300' :
                      i === 1 ? 'text-yellow-300' :
                      'text-gray-500'
                    }`}>{t(step.key)}</p>
                    {i === 0 && <p className="text-green-500 text-xs">{language === 'en' ? 'Just now' : 'Ahora mismo'}</p>}
                    {i === 1 && <p className="text-yellow-400 text-xs">{language === 'en' ? 'Our team is reviewing...' : 'Nuestro equipo está revisando...'}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-all text-sm border border-white/10"
          >
            {language === 'en' ? '← Submit Another Vehicle' : '← Enviar Otro Vehículo'}
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
              <Car size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">{t('tradeIn.title')}</h1>
              <p className="text-red-400 text-sm font-medium">{t('tradeIn.subtitle')}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-2 py-1 rounded-full">
              ✓ {language === 'en' ? 'No Dealership Visit' : 'Sin Visita al Concesionario'}
            </span>
            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-2 py-1 rounded-full">
              ⚡ {language === 'en' ? '2-Hour Response' : 'Respuesta en 2 Horas'}
            </span>
            <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-2 py-1 rounded-full">
              🔒 {language === 'en' ? '100% Secure' : '100% Seguro'}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Make */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.make')}</label>
              <select
                value={form.make}
                onChange={e => setForm({ ...form, make: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all appearance-none"
              >
                <option value="" className="bg-gray-900">{t('tradeIn.selectMake')}</option>
                {makes.map(m => <option key={m} value={m} className="bg-gray-900">{m}</option>)}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.model')}</label>
              <input
                type="text"
                value={form.model}
                onChange={e => setForm({ ...form, model: e.target.value })}
                placeholder={t('tradeIn.enterModel')}
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.year')}</label>
              <input
                type="number"
                value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}
                placeholder="e.g. 2020"
                min="1990"
                max="2025"
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.mileage')}</label>
              <input
                type="text"
                value={form.mileage}
                onChange={e => setForm({ ...form, mileage: e.target.value })}
                placeholder={t('tradeIn.enterMileage')}
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">{t('tradeIn.condition')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { val: 'Excellent', label: t('tradeIn.excellent'), color: 'green', emoji: '⭐' },
                { val: 'Good', label: t('tradeIn.good'), color: 'blue', emoji: '👍' },
                { val: 'Fair', label: t('tradeIn.fair'), color: 'yellow', emoji: '👌' },
                { val: 'Poor', label: t('tradeIn.poor'), color: 'red', emoji: '⚠️' },
              ].map(c => (
                <button
                  type="button"
                  key={c.val}
                  onClick={() => setForm({ ...form, condition: c.val })}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    form.condition === c.val
                      ? `bg-${c.color}-600 border-${c.color}-500 text-white`
                      : 'bg-white/5 border-white/15 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-lg mb-1">{c.emoji}</div>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Damage */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.damage')}</label>
            <textarea
              value={form.damage}
              onChange={e => setForm({ ...form, damage: e.target.value })}
              placeholder={language === 'en' ? 'Describe any scratches, dents, mechanical issues...' : 'Describa rayones, abolladuras, problemas mecánicos...'}
              rows={3}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all resize-none"
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.loanAmount')}</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={form.loanAmount}
                onChange={e => setForm({ ...form, loanAmount: e.target.value })}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('tradeIn.photos')}</label>
            <button
              type="button"
              onClick={() => setPhotosUploaded(true)}
              className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                photosUploaded
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-white/20 bg-white/5 hover:border-red-500/50 hover:bg-red-500/5'
              }`}
            >
              {photosUploaded ? (
                <div>
                  <CheckCircle size={32} className="text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-semibold text-sm">
                    {language === 'en' ? '4 photos uploaded successfully!' : '¡4 fotos cargadas exitosamente!'}
                  </p>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm font-medium">{t('tradeIn.uploadClick')}</p>
                  <p className="text-gray-600 text-xs mt-1">PNG, JPG, HEIC up to 10MB each</p>
                </div>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 text-base"
          >
            <Car size={20} />
            {t('tradeIn.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
