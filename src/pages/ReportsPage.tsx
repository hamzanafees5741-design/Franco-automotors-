import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Award, Zap, Users, Car, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const deliveriesData = [
  { month: 'Aug', deliveries: 18 },
  { month: 'Sep', deliveries: 22 },
  { month: 'Oct', deliveries: 25 },
  { month: 'Nov', deliveries: 28 },
  { month: 'Dec', deliveries: 32 },
  { month: 'Jan', deliveries: 34 },
];

const keyHandoverData = [
  { month: 'Aug', handovers: 12, avg: 4.2 },
  { month: 'Sep', handovers: 18, avg: 3.9 },
  { month: 'Oct', handovers: 21, avg: 3.7 },
  { month: 'Nov', handovers: 24, avg: 3.5 },
  { month: 'Dec', handovers: 28, avg: 3.2 },
  { month: 'Jan', handovers: 31, avg: 2.9 },
];

const salesVelocityData = [
  { day: 'Mon', closings: 4 },
  { day: 'Tue', closings: 6 },
  { day: 'Wed', closings: 5 },
  { day: 'Thu', closings: 8 },
  { day: 'Fri', closings: 9 },
  { day: 'Sat', closings: 12 },
];

const satisfactionData = [
  { name: '5 Stars', value: 68, color: '#22C55E' },
  { name: '4 Stars', value: 22, color: '#3B82F6' },
  { name: '3 Stars', value: 7, color: '#EAB308' },
  { name: '1-2 Stars', value: 3, color: '#EF4444' },
];

const staffData = [
  { name: 'Miguel T.', deliveries: 12, rating: 4.9 },
  { name: 'Ana R.', deliveries: 9, rating: 4.8 },
  { name: 'Jose M.', deliveries: 8, rating: 4.7 },
  { name: 'Laura G.', deliveries: 5, rating: 4.9 },
];

const expressVehicles = [
  { vehicle: '2022 Ford F-150 XLT', buyer: 'Carlos Mendoza', date: 'Jan 15', time: '4m 12s', price: '$42,500' },
  { vehicle: '2023 Ram 1500 Big Horn', buyer: 'Roberto Vega', date: 'Jan 14', time: '3m 45s', price: '$48,200' },
  { vehicle: '2022 Chevy Silverado 1500', buyer: 'Miguel Alvarez', date: 'Jan 13', time: '4m 58s', price: '$38,900' },
  { vehicle: '2022 Toyota Tacoma SR5', buyer: 'Diana Santos', date: 'Jan 12', time: '2m 30s', price: '$35,100' },
  { vehicle: '2023 GMC Sierra 2500', buyer: 'Luis Ramirez', date: 'Jan 11', time: '4m 22s', price: '$56,800' },
];

const TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' },
  labelStyle: { color: '#9CA3AF' },
};

export default function ReportsPage() {
  const { t, language } = useLanguage();

  const kpiCards = [
    { icon: Car, label: t('reports.deliveries'), value: '34', sub: '+8 vs last month', color: 'from-red-600 to-red-800', trend: '+31%' },
    { icon: Zap, label: t('reports.keyHandovers'), value: '31', sub: 'Avg: 2.9 min', color: 'from-orange-600 to-orange-800', trend: '+24%' },
    { icon: TrendingUp, label: t('reports.tradeIns'), value: '22', sub: '$18,400 avg offer', color: 'from-blue-600 to-blue-800', trend: '+18%' },
    { icon: FileText, label: t('reports.docRate'), value: '94%', sub: '2.1 days avg', color: 'from-green-600 to-green-800', trend: '+12%' },
    { icon: Award, label: t('reports.satisfaction'), value: '4.8★', sub: '68% 5-star ratings', color: 'from-yellow-600 to-yellow-800', trend: '+0.2' },
    { icon: Users, label: t('reports.staffPerformance'), value: '4.8★', sub: '34 deals closed', color: 'from-purple-600 to-purple-800', trend: '+5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-black text-2xl sm:text-3xl">{t('reports.title')}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {language === 'en' ? 'January 2025 — Performance Dashboard' : 'Enero 2025 — Panel de Rendimiento'}
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-500/30 px-3 py-2 rounded-xl text-center">
            <p className="text-red-400 font-black text-lg">$318K</p>
            <p className="text-gray-500 text-xs">{language === 'en' ? 'Monthly Revenue' : 'Ingresos del Mes'}</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpiCards.map((kpi, i) => (
            <div key={i} className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                <kpi.icon size={16} className="text-white" />
              </div>
              <div className="text-white font-black text-xl">{kpi.value}</div>
              <div className="text-gray-500 text-xs mt-0.5 leading-tight">{kpi.label}</div>
              <div className="text-green-400 text-xs mt-1 font-semibold">{kpi.trend}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deliveries Chart */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-4">{t('reports.deliveries')}</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={deliveriesData}>
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Area type="monotone" dataKey="deliveries" stroke="#EF4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Handover Chart */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-4">{t('reports.keyHandovers')} — {language === 'en' ? 'Avg Time (min)' : 'Tiempo Promedio (min)'}</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={keyHandoverData}>
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="handovers" fill="#EF4444" radius={[4,4,0,0]} name={language === 'en' ? 'Handovers' : 'Entregas'} />
                <Bar dataKey="avg" fill="#F97316" radius={[4,4,0,0]} name={language === 'en' ? 'Avg Min' : 'Min Prom'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Velocity */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-white font-bold text-base mb-4">{t('reports.salesVelocity')} — {language === 'en' ? 'This Week' : 'Esta Semana'}</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={salesVelocityData}>
                <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Line type="monotone" dataKey="closings" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 5 }} name={language === 'en' ? 'Deals Closed' : 'Ventas Cerradas'} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Satisfaction Pie */}
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-base mb-4">{t('reports.satisfaction')}</h2>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={satisfactionData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                  {satisfactionData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {satisfactionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-5">{t('reports.staffPerformance')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {staffData.map((staff, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                  {staff.name.charAt(0)}
                </div>
                <p className="text-white font-semibold text-sm">{staff.name}</p>
                <p className="text-red-400 font-black text-xl mt-1">{staff.deliveries}</p>
                <p className="text-gray-500 text-xs">{language === 'en' ? 'deliveries' : 'entregas'}</p>
                <div className="text-yellow-400 text-xs mt-2">{'★'.repeat(5)} {staff.rating}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Express Portal ROI */}
        <div className="bg-gradient-to-r from-red-900/20 to-gray-900 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={20} className="text-red-500" />
            <h2 className="text-white font-bold text-base">{t('reports.expressPortalROI')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{language === 'en' ? 'Vehicle' : 'Vehículo'}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{language === 'en' ? 'Buyer' : 'Comprador'}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{language === 'en' ? 'Date' : 'Fecha'}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{language === 'en' ? 'Handover Time' : 'Tiempo de Entrega'}</th>
                  <th className="text-right text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3">{language === 'en' ? 'Sale Price' : 'Precio de Venta'}</th>
                </tr>
              </thead>
              <tbody>
                {expressVehicles.map((v, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="py-3 pr-4">
                      <p className="text-white font-medium text-xs">{v.vehicle}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-gray-300 text-xs">{v.buyer}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-gray-400 text-xs">{v.date}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-2 py-1 rounded-lg font-bold">
                        <Zap size={10} />
                        {v.time}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-white font-bold text-sm">{v.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/10">
                  <td colSpan={3} className="pt-3 text-gray-400 text-xs">{language === 'en' ? 'Total Express Portal Revenue' : 'Ingresos Totales Portal Exprés'}</td>
                  <td className="pt-3">
                    <span className="text-green-400 text-xs font-bold">Avg: 3m 57s ⚡</span>
                  </td>
                  <td className="pt-3 text-right">
                    <span className="text-red-400 font-black text-base">$221,500</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
