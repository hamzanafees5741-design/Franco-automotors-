import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

export default function ChatWidget() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: t('chat.greeting') }
  ]);

  const botReplies: Record<string, Record<string, string>> = {
    docs: {
      en: "Great! To upload your documents, go to the Document Management page. You can upload your ID, proof of insurance, signed contracts, and trade-in photos. Once uploaded, our team reviews them instantly! ⚡",
      es: "¡Excelente! Para cargar sus documentos, vaya a la página de Gestión de Documentos. Puede cargar su ID, comprobante de seguro, contratos firmados y fotos del intercambio. Una vez cargados, ¡nuestro equipo los revisa de inmediato! ⚡"
    },
    tradeIn: {
      en: "Sure! Our Trade-In Valuation is 100% online — no dealership visit needed. Just fill in your vehicle details and photos and we'll respond within 2 hours with your offer! 🚗",
      es: "¡Claro! Nuestra Valuación de Intercambio es 100% en línea — no necesita visitar el concesionario. Solo ingrese los detalles y fotos de su vehículo y le responderemos en 2 horas con su oferta. 🚗"
    },
    delivery: {
      en: "Let's schedule your delivery! Our 5-Minute Key Handover is the fastest in Miami. Go to the Delivery Scheduling page and pick your preferred date and time. We'll be there! 📅",
      es: "¡Programemos su entrega! Nuestra Entrega de Llaves en 5 Minutos es la más rápida en Miami. Vaya a la página de Programación de Entrega y elija su fecha y hora preferida. ¡Allí estaremos! 📅"
    },
    keyHandover: {
      en: "Our 5-Minute Key Handover is Miami's fastest! All your documents are pre-verified online, trade-in assessed, and financing pre-approved before you arrive. When you show up — keys in hand in under 5 minutes! ⚡🔑",
      es: "¡Nuestra Entrega de Llaves en 5 Minutos es la más rápida de Miami! Todos sus documentos se pre-verifican en línea, el intercambio se evalúa y el financiamiento se pre-aprueba antes de que llegue. Cuando llegue — ¡llaves en mano en menos de 5 minutos! ⚡🔑"
    },
    default: {
      en: "Thank you for reaching out to Franco Automotors! Our team is ready to help you get your vehicle as fast as possible. Is there anything specific I can help you with? You can also call us at (305) 555-AUTO. 😊",
      es: "¡Gracias por contactar a Franco Automotors! Nuestro equipo está listo para ayudarle a obtener su vehículo lo más rápido posible. ¿Hay algo específico en lo que pueda ayudarle? También puede llamarnos al (305) 555-AUTO. 😊"
    }
  };

  const getReply = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('doc') || lower.includes('upload') || lower.includes('paper') || lower.includes('cargar') || lower.includes('documento')) {
      return botReplies.docs[language];
    } else if (lower.includes('trade') || lower.includes('intercambio') || lower.includes('value') || lower.includes('valor')) {
      return botReplies.tradeIn[language];
    } else if (lower.includes('deliver') || lower.includes('schedul') || lower.includes('entrega') || lower.includes('programar')) {
      return botReplies.delivery[language];
    } else if (lower.includes('key') || lower.includes('5') || lower.includes('minute') || lower.includes('llave') || lower.includes('minuto')) {
      return botReplies.keyHandover[language];
    }
    return botReplies.default[language];
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessages: Message[] = [...messages, { from: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: getReply(text) }]);
    }, 800);
  };

  const quickOptions = [t('chat.opt1'), t('chat.opt2'), t('chat.opt3'), t('chat.opt4')];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 sm:w-96 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: '520px' }}>
          {/* Header */}
          <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{t('chat.title')}</div>
                <div className="text-red-100 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                  {t('chat.online')}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '300px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  msg.from === 'bot'
                    ? 'bg-white/10 text-gray-200 rounded-tl-sm'
                    : 'bg-red-600 text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Options */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap border-t border-white/10 pt-2">
            {quickOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
                className="text-xs bg-white/10 hover:bg-red-600/30 text-gray-300 hover:text-white px-2 py-1 rounded-full border border-white/10 hover:border-red-500/50 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder={t('chat.placeholder')}
              className="flex-1 bg-white/10 text-white placeholder-gray-500 text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 relative"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
