import { Truck, Users, FileText, Car, Key, CheckCircle, Eye, Edit, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const orders = [
  { id: 'FA-089', customer: 'Carlos Mendoza', vehicle: '2022 Ford F-150 XLT', deliveryStatus: 'En Route', tradeIn: 'Approved', staff: 'Miguel Torres', phone: '(786) 555-0123' },
  { id: 'FA-090', customer: 'Roberto Vega', vehicle: '2023 Ram 1500 Big Horn', deliveryStatus: 'Scheduled', tradeIn: 'Under Review', staff: 'Ana Rodriguez', phone: '(305) 555-0234' },
  { id: 'FA-091', customer: 'Miguel Alvarez', vehicle: '2022 Chevy Silverado 1500', deliveryStatus: 'Docs Pending', tradeIn: 'Submitted', staff: 'Jose Martinez', phone: '(786) 555-0345' },
  { id: 'FA-092', customer: 'Luis Ramirez', vehicle: '2023 GMC Sierra 2500', deliveryStatus: 'New Request', tradeIn: 'Not Started', staff: 'Unassigned', phone: '(305) 555-0456' },
  { id: 'FA-093', customer: 'Diana Santos', vehicle: '2022 Toyota Tacoma SR5', deliveryStatus: 'Complete', tradeIn: 'Approved', staff: 'Miguel Torres', phone: '(786) 555-0567' },
  { id: 'FA-094', customer: 'Pedro Morales', vehicle: '2023 Ford F-250 XL', deliveryStatus: 'New Request', tradeIn: 'Not Started', staff: 'Unassigned', phone: '(305) 555-0678' },
];

const taskBoard = {
  'New Request': [
    { id: 'FA-092', name: 'Luis Ramirez', vehicle: 'GMC Sierra 2500', urgent: false },
    { id: 'FA-094', name: 'Pedro Morales', vehicle: 'Ford F-250 XL', urgent: false },
  ],
  'Docs Pending': [
    { id: 'FA-091', name: 'Miguel Alvarez', vehicle: 'Chevy Silverado', urgent: true },
  ],
  'Trade-In Review': [
    { id: 'FA-090', name: 'Roberto Vega', vehicle: 'Ram 1500', urgent: true },
  ],
  'Delivery Scheduled': [
    { id: 'FA-089', name: 'Carlos Mendoza', vehicle: 'Ford F-150', urgent: false },
  ],
  'Key Handover Complete': [
    { id: 'FA-093', name: 'Diana Santos', vehicle: 'Toyota Tacoma', urgent: false },
  ],
};

const statusColors: Record<string, string> = {
  'New Request': 'text-gray-400 bg-gray-500/10 border-gray-500/30',
  'Docs Pending': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'Under Review': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Scheduled': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  'En Route': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'Complete': 'text-green-400 bg-green-500/10 border-green-500/30',
};

export default function StaffDashboard() {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Truck, label: t('staff.activeDeliveries'), value: '4', color: 'from-orange-600 to-orange-800', change: '+2' },
    { icon: Users, label: t('staff.totalCustomers'), value: '48', color: 'from-blue-600 to-blue-800', change: '+5' },
    { icon: FileText, label: t('staff.pendingDocs'), value: '7', color: 'from-yellow-600 to-yellow-800', change: '-2' },
    { icon: Car, label: t('staff.pendingTradeIn'), value: '3', color: 'from-purple-600 to-purple-800', change: '+1' },
    { icon: Key, label: t('staff.keyHandoversToday'), value: '6', color: 'from-red-600 to-red-800', change: '+1' },
    { icon: CheckCircle, label: t('staff.completedMonth'), value: '34', color: 'from-green-600 to-green-800', change: '+8' },
  ];

  const taskCols = Object.entries(taskBoard);
  const colColors: Record<string, string> = {
    'New Request': 'border-gray-500/30 bg-gray-500/5',
    'Docs Pending': 'border-yellow-500/30 bg-yellow-500/5',
    'Trade-In Review': 'border-purple-500/30 bg-purple-500/5',
    'Delivery Scheduled': 'border-blue-500/30 bg-blue-500/5',
    'Key Handover Complete': 'border-green-500/30 bg-green-500/5',
  };
  const colLabelColors: Record<string, string> = {
    'New Request': 'text-gray-400',
    'Docs Pending': 'text-yellow-400',
    'Trade-In Review': 'text-purple-400',
    'Delivery Scheduled': 'text-blue-400',
    'Key Handover Complete': 'text-green-400',
  };

  const colLabels: Record<string, Record<string, string>> = {
    'New Request': { en: 'New Request', es: 'Nueva Solicitud' },
    'Docs Pending': { en: 'Docs Pending', es: 'Docs Pendientes' },
    'Trade-In Review': { en: 'Trade-In Review', es: 'Revisión Intercambio' },
    'Delivery Scheduled': { en: 'Delivery Scheduled', es: 'Entrega Programada' },
    'Key Handover Complete': { en: 'Key Handover Complete', es: 'Entrega Llaves Completa' },
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-black text-2xl sm:text-3xl">{t('staff.title')}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {language === 'en' ? 'Today — Tuesday, January 15, 2025' : 'Hoy — Martes, 15 de Enero de 2025'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-2 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-semibold">{language === 'en' ? 'All Systems Operational' : 'Todos los Sistemas Operativos'}</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-900 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={16} className="text-white" />
              </div>
              <div className="text-white font-black text-2xl">{stat.value}</div>
              <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</div>
              <div className={`text-xs mt-1 font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp size={10} className="inline mr-0.5" />{stat.change} {language === 'en' ? 'today' : 'hoy'}
              </div>
            </div>
          ))}
        </div>

        {/* Task Board */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5">{t('staff.taskBoard')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 overflow-x-auto">
            {taskCols.map(([col, cards]) => (
              <div key={col} className={`rounded-xl border p-3 ${colColors[col]}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xs font-bold ${colLabelColors[col]} uppercase tracking-wide`}>
                    {colLabels[col]?.[language] ?? col}
                  </h3>
                  <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${colLabelColors[col]} bg-white/5`}>
                    {cards.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {cards.map(card => (
                    <div key={card.id} className={`bg-gray-900 border rounded-lg p-3 ${card.urgent ? 'border-red-500/40' : 'border-white/10'}`}>
                      {card.urgent && (
                        <span className="text-red-400 text-xs font-bold flex items-center gap-1 mb-1">
                          <Clock size={10} /> {language === 'en' ? 'URGENT' : 'URGENTE'}
                        </span>
                      )}
                      <p className="text-white text-xs font-semibold">{card.name}</p>
                      <p className="text-gray-500 text-xs">{card.vehicle}</p>
                      <p className="text-gray-600 text-xs">{card.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Orders Table */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5">{t('staff.allOrders')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">ID</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{t('staff.customer')}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{t('staff.vehicle')}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{t('staff.deliveryStatus')}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{t('staff.tradeInStatus')}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3 pr-4">{t('staff.assignedStaff')}</th>
                  <th className="text-left text-gray-500 font-semibold text-xs uppercase tracking-wider pb-3">{t('staff.actions')}</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {orders.map((order, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="py-3 pr-4">
                      <span className="text-red-400 font-bold text-xs">#{order.id}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div>
                        <p className="text-white font-medium text-xs">{order.customer}</p>
                        <p className="text-gray-500 text-xs">{order.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-gray-300 text-xs">{order.vehicle}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex px-2 py-1 rounded-lg border text-xs font-semibold ${statusColors[order.deliveryStatus] || 'text-gray-400 bg-gray-500/10 border-gray-500/30'}`}>
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs ${
                        order.tradeIn === 'Approved' ? 'text-green-400' :
                        order.tradeIn === 'Under Review' ? 'text-blue-400' :
                        order.tradeIn === 'Submitted' ? 'text-yellow-400' :
                        'text-gray-500'
                      }`}>{order.tradeIn}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <p className={`text-xs ${order.staff === 'Unassigned' ? 'text-red-400' : 'text-gray-300'}`}>{order.staff}</p>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs px-2 py-1.5 rounded-lg transition-all border border-white/10">
                          <Eye size={11} />
                          {t('staff.view')}
                        </button>
                        <button className="flex items-center gap-1 bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs px-2 py-1.5 rounded-lg transition-all border border-red-500/20">
                          <Edit size={11} />
                          {t('staff.update')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
