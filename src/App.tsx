import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import LoginPage from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import TradeInPage from './pages/TradeInPage';
import DeliveryPage from './pages/DeliveryPage';
import KeyHandoverPage from './pages/KeyHandoverPage';
import DocumentsPage from './pages/DocumentsPage';
import TrackingPage from './pages/TrackingPage';
import StaffDashboard from './pages/StaffDashboard';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

type Page = 'login' | 'dashboard' | 'tradeIn' | 'delivery' | 'keyHandover' | 'documents' | 'tracking' | 'staff' | 'notifications' | 'reports';
type UserRole = 'customer' | 'staff' | 'admin';

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setLoggedIn(true);
    if (role === 'customer') setPage('dashboard');
    else if (role === 'staff') setPage('staff');
    else setPage('reports');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage('login');
  };

  const navigateTo = (p: string) => setPage(p as Page);

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <CustomerDashboard setPage={navigateTo} />;
      case 'tradeIn': return <TradeInPage />;
      case 'delivery': return <DeliveryPage />;
      case 'keyHandover': return <KeyHandoverPage />;
      case 'documents': return <DocumentsPage />;
      case 'tracking': return <TrackingPage />;
      case 'staff': return <StaffDashboard />;
      case 'notifications': return <NotificationsPage />;
      case 'reports': return <ReportsPage />;
      default: return <CustomerDashboard setPage={navigateTo} />;
    }
  };

  if (!loggedIn) {
    return (
      <LanguageProvider>
        <LoginPage onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-950 flex flex-col font-sans">
        <Navbar
          currentPage={page}
          setPage={navigateTo}
          userRole={userRole}
          onLogout={handleLogout}
        />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
}
