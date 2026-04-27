import { useState } from 'react';
import { FileText, Upload, CheckCircle, Clock, AlertCircle, PenTool, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type DocStatus = 'pending' | 'review' | 'approved';

interface Document {
  id: string;
  nameKey: string;
  nameEn: string;
  nameEs: string;
  status: DocStatus;
  required: boolean;
  uploadedAt?: string;
  icon: string;
}

const initialDocs: Document[] = [
  { id: 'id', nameKey: 'docs.id', nameEn: 'Government ID', nameEs: 'Identificación Oficial', status: 'approved', required: true, uploadedAt: 'Jan 15, 2025', icon: '🪪' },
  { id: 'insurance', nameKey: 'docs.insurance', nameEn: 'Proof of Insurance', nameEs: 'Comprobante de Seguro', status: 'review', required: true, uploadedAt: 'Jan 15, 2025', icon: '🛡️' },
  { id: 'contract', nameKey: 'docs.contract', nameEn: 'Signed Contract', nameEs: 'Contrato Firmado', status: 'pending', required: true, icon: '📋' },
  { id: 'tradein', nameKey: 'docs.tradeInPhotos', nameEn: 'Trade-In Vehicle Photos', nameEs: 'Fotos del Vehículo de Intercambio', status: 'approved', required: false, uploadedAt: 'Jan 14, 2025', icon: '📸' },
];

export default function DocumentsPage() {
  const { t, language } = useLanguage();
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [signed, setSigned] = useState(false);

  const uploadDoc = (id: string) => {
    setDocs(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'review', uploadedAt: 'Now' } : d
    ));
  };

  const statusConfig = {
    pending: {
      label: t('docs.pending'),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/30',
      icon: <AlertCircle size={14} className="text-yellow-400" />,
    },
    review: {
      label: t('docs.underReview'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      icon: <Clock size={14} className="text-blue-400 animate-spin" />,
    },
    approved: {
      label: t('docs.approved'),
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/30',
      icon: <CheckCircle size={14} className="text-green-400" />,
    },
  };

  const approvedCount = docs.filter(d => d.status === 'approved').length;
  const totalRequired = docs.filter(d => d.required).length;
  const requiredApproved = docs.filter(d => d.required && d.status === 'approved').length;

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">{t('docs.title')}</h1>
              <p className="text-red-400 text-sm font-medium">{t('docs.subtitle')}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{language === 'en' ? 'Required Documents Complete' : 'Documentos Requeridos Completados'}</span>
              <span className="text-white font-bold">{requiredApproved}/{totalRequired}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-700"
                style={{ width: `${(requiredApproved / totalRequired) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Express Note */}
          <div className="mt-4 flex items-start gap-2 bg-red-600/10 border border-red-500/30 rounded-xl p-3">
            <Zap size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-xs font-medium">{t('docs.note')}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900 border border-green-500/20 rounded-xl p-4 text-center">
            <div className="text-green-400 font-black text-2xl">{approvedCount}</div>
            <div className="text-gray-500 text-xs mt-1">{t('docs.approved')}</div>
          </div>
          <div className="bg-gray-900 border border-blue-500/20 rounded-xl p-4 text-center">
            <div className="text-blue-400 font-black text-2xl">{docs.filter(d => d.status === 'review').length}</div>
            <div className="text-gray-500 text-xs mt-1">{t('docs.underReview')}</div>
          </div>
          <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4 text-center">
            <div className="text-yellow-400 font-black text-2xl">{docs.filter(d => d.status === 'pending').length}</div>
            <div className="text-gray-500 text-xs mt-1">{t('docs.pending')}</div>
          </div>
        </div>

        {/* Document List */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5">{language === 'en' ? 'Your Documents' : 'Sus Documentos'}</h2>
          <div className="space-y-3">
            {docs.map(doc => {
              const sc = statusConfig[doc.status];
              return (
                <div
                  key={doc.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    doc.status === 'approved' ? 'bg-white/3 border-white/8' : 'bg-white/5 border-white/10'
                  } hover:bg-white/8 transition-all`}
                >
                  <span className="text-2xl flex-shrink-0">{doc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-semibold text-sm">{language === 'en' ? doc.nameEn : doc.nameEs}</p>
                      {doc.required && (
                        <span className="text-red-400 text-xs bg-red-500/10 px-1.5 py-0.5 rounded">
                          {language === 'en' ? 'Required' : 'Requerido'}
                        </span>
                      )}
                    </div>
                    {doc.uploadedAt && (
                      <p className="text-gray-500 text-xs">{language === 'en' ? 'Uploaded:' : 'Cargado:'} {doc.uploadedAt}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${sc.bg}`}>
                      {sc.icon}
                      <span className={`text-xs font-semibold ${sc.color}`}>{sc.label}</span>
                    </div>
                    {doc.status === 'pending' && (
                      <button
                        onClick={() => uploadDoc(doc.id)}
                        className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all shadow-sm"
                      >
                        <Upload size={12} />
                        {t('docs.upload')}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Digital Signature */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <PenTool size={18} className="text-red-500" />
            {t('docs.digitalSig')}
          </h2>
          <p className="text-gray-400 text-sm mb-5">{t('docs.sigNote')}</p>

          {/* Contract Preview */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                <span className="text-white text-sm font-medium">
                  {language === 'en' ? 'Purchase Agreement — 2022 Ford F-150 XLT' : 'Contrato de Compra — 2022 Ford F-150 XLT'}
                </span>
              </div>
              <span className="text-gray-500 text-xs">PDF</span>
            </div>
            <div className="bg-white/3 rounded-lg p-3 text-gray-500 text-xs leading-relaxed">
              {language === 'en'
                ? 'This Purchase Agreement ("Agreement") is entered into as of January 15, 2025, between Franco Automotors LLC ("Dealer") and Carlos Mendoza ("Buyer") for the purchase of one (1) 2022 Ford F-150 XLT, VIN: 1FTEW1CP8NFA12345...'
                : 'Este Contrato de Compra ("Contrato") se celebra a partir del 15 de enero de 2025, entre Franco Automotors LLC ("Concesionario") y Carlos Mendoza ("Comprador") para la compra de un (1) 2022 Ford F-150 XLT, VIN: 1FTEW1CP8NFA12345...'}
            </div>
          </div>

          {/* Signature Pad */}
          {!signed ? (
            <div>
              <div className="border-2 border-dashed border-white/20 rounded-xl h-28 flex items-center justify-center bg-white/3 mb-4 cursor-pointer hover:bg-white/5 hover:border-red-500/40 transition-all"
                onClick={() => setSigned(true)}>
                <div className="text-center">
                  <PenTool size={24} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">{language === 'en' ? 'Click here to sign digitally' : 'Haga clic aquí para firmar digitalmente'}</p>
                  <p className="text-gray-600 text-xs mt-1">{language === 'en' ? 'Your signature is legally binding' : 'Su firma tiene validez legal'}</p>
                </div>
              </div>
              <button
                onClick={() => setSigned(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                <PenTool size={16} />
                {t('dashboard.signNow')}
              </button>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <CheckCircle size={28} className="text-green-400 mx-auto mb-2" />
              <p className="text-green-300 font-bold text-sm">
                {language === 'en' ? 'Contract Signed Successfully!' : '¡Contrato Firmado Exitosamente!'}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {language === 'en' ? 'Signed by Carlos Mendoza — Jan 15, 2025 2:34 PM EST' : 'Firmado por Carlos Mendoza — 15 Ene 2025 2:34 PM EST'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
