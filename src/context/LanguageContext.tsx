import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  // Navigation
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.dashboard': { en: 'Dashboard', es: 'Panel' },
  'nav.tradeIn': { en: 'Trade-In', es: 'Intercambio' },
  'nav.delivery': { en: 'Delivery', es: 'Entrega' },
  'nav.documents': { en: 'Documents', es: 'Documentos' },
  'nav.tracking': { en: 'Tracking', es: 'Seguimiento' },
  'nav.notifications': { en: 'Notifications', es: 'Notificaciones' },
  'nav.reports': { en: 'Reports', es: 'Reportes' },
  'nav.keyHandover': { en: '5-Min Key Handover', es: 'Entrega de Llaves 5-Min' },
  'nav.staff': { en: 'Staff Dashboard', es: 'Panel de Personal' },
  'nav.logout': { en: 'Log Out', es: 'Cerrar Sesión' },

  // Login Page
  'login.welcome': { en: 'Welcome to Franco Automotors', es: 'Bienvenido a Franco Automotors' },
  'login.subtitle': { en: "Miami's fastest and most modern dealership — built for busy professionals.", es: 'El concesionario más rápido y moderno de Miami — creado para profesionales ocupados.' },
  'login.tagline': { en: "Miami's Only 5-Minute Key Handover Dealer", es: 'El Único Concesionario en Miami con Entrega de Llaves en 5 Minutos' },
  'login.customerLogin': { en: 'Customer Login', es: 'Acceso de Cliente' },
  'login.staffLogin': { en: 'Staff Login', es: 'Acceso de Personal' },
  'login.adminLogin': { en: 'Admin Login', es: 'Acceso de Administrador' },
  'login.email': { en: 'Email Address', es: 'Correo Electrónico' },
  'login.password': { en: 'Password', es: 'Contraseña' },
  'login.signIn': { en: 'Sign In', es: 'Iniciar Sesión' },
  'login.forgotPassword': { en: 'Forgot Password?', es: '¿Olvidó su Contraseña?' },
  'login.feature1': { en: 'Document Upload', es: 'Carga de Documentos' },
  'login.feature1Desc': { en: 'Upload all your documents online — skip the paperwork at the dealership.', es: 'Cargue todos sus documentos en línea — evite el papeleo en el concesionario.' },
  'login.feature2': { en: 'Trade-In Valuation', es: 'Valuación de Intercambio' },
  'login.feature2Desc': { en: 'Get your trade-in value online — no physical visit needed.', es: 'Obtenga el valor de su vehículo en línea — sin visita física necesaria.' },
  'login.feature3': { en: 'Delivery Scheduling', es: 'Programación de Entrega' },
  'login.feature3Desc': { en: 'Schedule your key handover — we deliver in under 5 minutes.', es: 'Programe su entrega de llaves — la completamos en menos de 5 minutos.' },
  'login.enterEmail': { en: 'Enter your email', es: 'Ingrese su correo' },
  'login.enterPassword': { en: 'Enter your password', es: 'Ingrese su contraseña' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', es: 'Bienvenido de vuelta' },
  'dashboard.subtitle': { en: 'Your Express Portal — everything done in minutes.', es: 'Su Portal Exprés — todo listo en minutos.' },
  'dashboard.uploadDocs': { en: 'Upload Documents', es: 'Cargar Documentos' },
  'dashboard.tradeIn': { en: 'Check Trade-In Value', es: 'Ver Valor de Intercambio' },
  'dashboard.scheduleDelivery': { en: 'Schedule Delivery', es: 'Programar Entrega' },
  'dashboard.orderStatus': { en: 'Order Status', es: 'Estado del Pedido' },
  'dashboard.notifications': { en: 'Recent Notifications', es: 'Notificaciones Recientes' },
  'dashboard.digitalSignature': { en: 'Digital Signature', es: 'Firma Digital' },
  'dashboard.signContract': { en: 'Sign Contract', es: 'Firmar Contrato' },
  'dashboard.contractReady': { en: 'Your contract is ready for signature', es: 'Su contrato está listo para firma' },
  'dashboard.signNow': { en: 'Sign Now', es: 'Firmar Ahora' },
  'dashboard.timeIsMoney': { en: "Your time is money — we're here to save it.", es: 'Su tiempo es dinero — estamos aquí para ahorrarlo.' },

  // Progress Steps
  'progress.orderConfirmed': { en: 'Order Confirmed', es: 'Pedido Confirmado' },
  'progress.docsSubmitted': { en: 'Docs Submitted', es: 'Docs Enviados' },
  'progress.tradeInAssessed': { en: 'Trade-In Assessed', es: 'Intercambio Evaluado' },
  'progress.deliveryScheduled': { en: 'Delivery Scheduled', es: 'Entrega Programada' },
  'progress.keyHandover': { en: '5-Min Key Handover', es: 'Entrega de Llaves 5-Min' },

  // Trade-In
  'tradeIn.title': { en: 'Trade-In Valuation', es: 'Valuación de Intercambio' },
  'tradeIn.subtitle': { en: 'Get your vehicle value online — no physical visit needed!', es: '¡Obtenga el valor de su vehículo en línea — sin visita física necesaria!' },
  'tradeIn.make': { en: 'Vehicle Make', es: 'Marca del Vehículo' },
  'tradeIn.model': { en: 'Vehicle Model', es: 'Modelo del Vehículo' },
  'tradeIn.year': { en: 'Year', es: 'Año' },
  'tradeIn.mileage': { en: 'Mileage', es: 'Millaje' },
  'tradeIn.condition': { en: 'Vehicle Condition', es: 'Condición del Vehículo' },
  'tradeIn.excellent': { en: 'Excellent', es: 'Excelente' },
  'tradeIn.good': { en: 'Good', es: 'Buena' },
  'tradeIn.fair': { en: 'Fair', es: 'Regular' },
  'tradeIn.poor': { en: 'Poor', es: 'Mala' },
  'tradeIn.damage': { en: 'Existing Damage Description', es: 'Descripción de Daños Existentes' },
  'tradeIn.loanAmount': { en: 'Current Loan Amount (if any)', es: 'Monto del Préstamo Actual (si aplica)' },
  'tradeIn.photos': { en: 'Upload Vehicle Photos', es: 'Cargar Fotos del Vehículo' },
  'tradeIn.submit': { en: 'Submit Trade-In Request', es: 'Enviar Solicitud de Intercambio' },
  'tradeIn.submitted': { en: 'Trade-In Request Submitted!', es: '¡Solicitud de Intercambio Enviada!' },
  'tradeIn.submittedMsg': { en: 'Our team will contact you within 2 hours with your vehicle value.', es: 'Nuestro equipo le contactará dentro de 2 horas con el valor de su vehículo.' },
  'tradeIn.statusSubmitted': { en: 'Submitted', es: 'Enviada' },
  'tradeIn.statusUnderReview': { en: 'Under Review', es: 'En Revisión' },
  'tradeIn.statusReady': { en: 'Valuation Ready', es: 'Valuación Lista' },
  'tradeIn.statusOfferSent': { en: 'Offer Sent', es: 'Oferta Enviada' },
  'tradeIn.uploadClick': { en: 'Click to upload photos', es: 'Clic para cargar fotos' },
  'tradeIn.noDamage': { en: 'No damage to report', es: 'Sin daños que reportar' },
  'tradeIn.selectMake': { en: 'Select Make', es: 'Seleccione Marca' },
  'tradeIn.selectCondition': { en: 'Select Condition', es: 'Seleccione Condición' },
  'tradeIn.enterModel': { en: 'e.g. F-150, Silverado', es: 'ej. F-150, Silverado' },
  'tradeIn.enterMileage': { en: 'e.g. 45000', es: 'ej. 45000' },
  'tradeIn.enterLoan': { en: 'e.g. $15,000', es: 'ej. $15,000' },

  // Delivery
  'delivery.title': { en: 'Schedule Express Delivery', es: 'Programar Entrega Exprés' },
  'delivery.subtitle': { en: 'We complete your key handover in under 5 minutes.', es: 'Completamos su entrega de llaves en menos de 5 minutos.' },
  'delivery.date': { en: 'Preferred Delivery Date', es: 'Fecha de Entrega Preferida' },
  'delivery.timeSlot': { en: 'Preferred Time Slot', es: 'Horario Preferido' },
  'delivery.morning': { en: 'Morning (9AM – 12PM)', es: 'Mañana (9AM – 12PM)' },
  'delivery.afternoon': { en: 'Afternoon (12PM – 4PM)', es: 'Tarde (12PM – 4PM)' },
  'delivery.evening': { en: 'Evening (4PM – 7PM)', es: 'Noche (4PM – 7PM)' },
  'delivery.address': { en: 'Delivery Address', es: 'Dirección de Entrega' },
  'delivery.instructions': { en: 'Special Instructions', es: 'Instrucciones Especiales' },
  'delivery.schedule': { en: 'Schedule Delivery', es: 'Programar Entrega' },
  'delivery.confirmed': { en: 'Delivery Confirmed!', es: '¡Entrega Confirmada!' },
  'delivery.confirmedMsg': { en: 'Your 5-Minute Key Handover is scheduled!', es: '¡Su Entrega de Llaves en 5 Minutos está programada!' },
  'delivery.countdown': { en: 'Countdown to Delivery', es: 'Cuenta Regresiva para Entrega' },
  'delivery.window': { en: 'Miami Delivery Window: 10:00 AM – 1:00 PM EDT', es: 'Ventana de Entrega Miami: 10:00 AM – 1:00 PM EDT' },
  'delivery.fiveMin': { en: 'Our team will complete your key handover in under 5 minutes.', es: 'Nuestro equipo completará su entrega de llaves en menos de 5 minutos.' },
  'delivery.enterAddress': { en: 'Enter full delivery address', es: 'Ingrese dirección completa de entrega' },
  'delivery.enterInstructions': { en: 'Any special instructions for delivery...', es: 'Instrucciones especiales para la entrega...' },
  'delivery.available': { en: 'Available Slots', es: 'Horarios Disponibles' },

  // Key Handover
  'keyHandover.title': { en: '5-Minute Key Handover', es: 'Entrega de Llaves en 5 Minutos' },
  'keyHandover.tagline': { en: "Because your time is money — we deliver in 5 minutes.", es: 'Porque su tiempo es dinero — entregamos en 5 minutos.' },
  'keyHandover.step1': { en: 'Documents Pre-Verified Online', es: 'Documentos Pre-Verificados en Línea' },
  'keyHandover.step2': { en: 'Trade-In Assessed', es: 'Intercambio Evaluado' },
  'keyHandover.step3': { en: 'Financing Pre-Approved', es: 'Financiamiento Pre-Aprobado' },
  'keyHandover.step4': { en: 'Vehicle Ready', es: 'Vehículo Listo' },
  'keyHandover.step5': { en: 'Key Handover in Under 5 Minutes', es: 'Entrega de Llaves en Menos de 5 Minutos' },
  'keyHandover.avgTime': { en: 'Average Handover Time', es: 'Tiempo Promedio de Entrega' },
  'keyHandover.minutes': { en: 'minutes', es: 'minutos' },
  'keyHandover.seconds': { en: 'seconds', es: 'segundos' },
  'keyHandover.expressProcess': { en: 'Express Process Timeline', es: 'Cronograma del Proceso Exprés' },

  // Documents
  'docs.title': { en: 'Document Management', es: 'Gestión de Documentos' },
  'docs.subtitle': { en: 'Upload now — skip paperwork — get your keys in 5 minutes.', es: 'Cargue ahora — evite el papeleo — obtenga sus llaves en 5 minutos.' },
  'docs.id': { en: 'Government ID', es: 'Identificación Oficial' },
  'docs.insurance': { en: 'Proof of Insurance', es: 'Comprobante de Seguro' },
  'docs.contract': { en: 'Signed Contract', es: 'Contrato Firmado' },
  'docs.tradeInPhotos': { en: 'Trade-In Vehicle Photos', es: 'Fotos del Vehículo de Intercambio' },
  'docs.pending': { en: 'Pending', es: 'Pendiente' },
  'docs.underReview': { en: 'Under Review', es: 'En Revisión' },
  'docs.approved': { en: 'Approved', es: 'Aprobado' },
  'docs.upload': { en: 'Upload', es: 'Cargar' },
  'docs.digitalSig': { en: 'Digital Signature', es: 'Firma Digital' },
  'docs.sigNote': { en: 'Sign your contract digitally — no printer needed.', es: 'Firme su contrato digitalmente — sin necesidad de impresora.' },
  'docs.note': { en: 'Upload your documents now — skip the paperwork at the dealership — get your keys in 5 minutes.', es: 'Cargue sus documentos ahora — evite el papeleo en el concesionario — obtenga sus llaves en 5 minutos.' },

  // Tracking
  'tracking.title': { en: 'Delivery Tracking', es: 'Seguimiento de Entrega' },
  'tracking.driver': { en: 'Your Driver', es: 'Su Conductor' },
  'tracking.eta': { en: 'Estimated Arrival', es: 'Llegada Estimada' },
  'tracking.liveChat': { en: 'Live Chat', es: 'Chat en Vivo' },
  'tracking.status': { en: 'Delivery Status', es: 'Estado de Entrega' },
  'tracking.nearbyAlert': { en: 'Driver is nearby! 5-Minute Key Handover starting soon.', es: '¡El conductor está cerca! La entrega de llaves en 5 minutos comienza pronto.' },
  'tracking.countdown': { en: '5-Minute Key Handover Countdown', es: 'Cuenta Regresiva Entrega de Llaves 5 Minutos' },

  // Staff
  'staff.title': { en: 'Staff Dashboard', es: 'Panel de Personal' },
  'staff.activeDeliveries': { en: 'Active Deliveries', es: 'Entregas Activas' },
  'staff.totalCustomers': { en: 'Total Customers', es: 'Total Clientes' },
  'staff.pendingDocs': { en: 'Pending Documents', es: 'Documentos Pendientes' },
  'staff.pendingTradeIn': { en: 'Pending Trade-Ins', es: 'Intercambios Pendientes' },
  'staff.keyHandoversToday': { en: 'Key Handovers Today', es: 'Entregas de Llaves Hoy' },
  'staff.completedMonth': { en: 'Completed This Month', es: 'Completadas Este Mes' },
  'staff.taskBoard': { en: 'Task Board', es: 'Tablero de Tareas' },
  'staff.newRequest': { en: 'New Request', es: 'Nueva Solicitud' },
  'staff.docsPending': { en: 'Docs Pending', es: 'Docs Pendientes' },
  'staff.tradeInReview': { en: 'Trade-In Review', es: 'Revisión de Intercambio' },
  'staff.deliveryScheduled': { en: 'Delivery Scheduled', es: 'Entrega Programada' },
  'staff.keyHandoverComplete': { en: 'Key Handover Complete', es: 'Entrega de Llaves Completa' },
  'staff.allOrders': { en: 'All Current Orders', es: 'Todos los Pedidos Actuales' },
  'staff.customer': { en: 'Customer', es: 'Cliente' },
  'staff.vehicle': { en: 'Vehicle', es: 'Vehículo' },
  'staff.deliveryStatus': { en: 'Delivery Status', es: 'Estado de Entrega' },
  'staff.tradeInStatus': { en: 'Trade-In', es: 'Intercambio' },
  'staff.assignedStaff': { en: 'Assigned Staff', es: 'Personal Asignado' },
  'staff.actions': { en: 'Actions', es: 'Acciones' },
  'staff.view': { en: 'View', es: 'Ver' },
  'staff.update': { en: 'Update', es: 'Actualizar' },

  // Notifications
  'notif.title': { en: 'Notifications Center', es: 'Centro de Notificaciones' },
  'notif.whatsapp': { en: 'WhatsApp', es: 'WhatsApp' },
  'notif.sms': { en: 'SMS', es: 'SMS' },
  'notif.email': { en: 'Email', es: 'Correo' },
  'notif.templates': { en: 'Message Templates', es: 'Plantillas de Mensajes' },
  'notif.allNotif': { en: 'All Notifications', es: 'Todas las Notificaciones' },

  // Reports
  'reports.title': { en: 'Admin Reports', es: 'Reportes de Administración' },
  'reports.deliveries': { en: 'Total Deliveries This Month', es: 'Total Entregas Este Mes' },
  'reports.keyHandovers': { en: '5-Min Handovers Completed', es: 'Entregas en 5-Min Completadas' },
  'reports.tradeIns': { en: 'Trade-In Valuations', es: 'Valuaciones de Intercambio' },
  'reports.docRate': { en: 'Document Upload Rate', es: 'Tasa de Carga de Documentos' },
  'reports.salesVelocity': { en: 'Sales Velocity', es: 'Velocidad de Ventas' },
  'reports.satisfaction': { en: 'Customer Satisfaction', es: 'Satisfacción del Cliente' },
  'reports.staffPerformance': { en: 'Staff Performance', es: 'Desempeño del Personal' },
  'reports.expressPortalROI': { en: 'Vehicles Sold Through Express Portal This Month', es: 'Vehículos Vendidos por Portal Exprés Este Mes' },

  // Footer
  'footer.address': { en: '1234 SW 8th Street, Miami, Florida 33130 USA', es: '1234 SW 8th Street, Miami, Florida 33130 EE.UU.' },
  'footer.rights': { en: 'All Rights Reserved.', es: 'Todos los Derechos Reservados.' },
  'footer.tagline': { en: "Miami's Only 5-Minute Key Handover Dealer", es: 'El Único Concesionario en Miami con Entrega de Llaves en 5 Minutos' },
  'footer.phone': { en: 'Phone: (305) 555-AUTO', es: 'Teléfono: (305) 555-AUTO' },
  'footer.hours': { en: 'Mon–Sat: 8AM–8PM EST', es: 'Lun–Sáb: 8AM–8PM EST' },

  // Chat Widget
  'chat.greeting': { en: "Hi! I'm your Franco Automotors Digital Assistant. I can help you upload documents, check your trade-in value, or schedule your 5-minute key handover. How can I help you today?", es: '¡Hola! Soy su Asistente Digital de Franco Automotors. Puedo ayudarle a cargar documentos, verificar el valor de su intercambio, o programar su entrega de llaves en 5 minutos. ¿Cómo puedo ayudarle hoy?' },
  'chat.title': { en: '24/7 Digital Assistant', es: 'Asistente Digital 24/7' },
  'chat.placeholder': { en: 'Type your message...', es: 'Escriba su mensaje...' },
  'chat.send': { en: 'Send', es: 'Enviar' },
  'chat.online': { en: 'Online — Available 24/7', es: 'En línea — Disponible 24/7' },
  'chat.opt1': { en: '📄 Upload Documents', es: '📄 Cargar Documentos' },
  'chat.opt2': { en: '🚗 Trade-In Value', es: '🚗 Valor de Intercambio' },
  'chat.opt3': { en: '📅 Schedule Delivery', es: '📅 Programar Entrega' },
  'chat.opt4': { en: '⚡ 5-Min Key Handover', es: '⚡ Llaves en 5 Minutos' },

  // Common
  'common.loading': { en: 'Loading...', es: 'Cargando...' },
  'common.submit': { en: 'Submit', es: 'Enviar' },
  'common.cancel': { en: 'Cancel', es: 'Cancelar' },
  'common.back': { en: 'Back', es: 'Volver' },
  'common.next': { en: 'Next', es: 'Siguiente' },
  'common.save': { en: 'Save', es: 'Guardar' },
  'common.close': { en: 'Close', es: 'Cerrar' },
  'common.days': { en: 'days', es: 'días' },
  'common.hours': { en: 'hours', es: 'horas' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
