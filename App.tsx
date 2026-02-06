
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Modal from './components/Modal';
import MessMenu from './components/MessMenu';
import MailSummarizer from './components/MailSummarizer';
import TravelHub from './components/TravelHub';
import UtilityStatus from './components/UtilityStatus';
import ExchangeHub from './components/ExchangeHub';
import AcademicCockpit from './components/AcademicCockpit';
import ServicesPortal from './components/ServicesPortal';
import Explore from './components/Explore';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openGlobalModal = (id: string, title: string, content: React.ReactNode) => {
    setActiveModal(id);
    setModalContent({ title, content });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  // Simple view routing simulation
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login onLogin={() => { setIsLoggedIn(true); setCurrentView('dashboard'); }} />;
      case 'mess':
        return <MessMenu onBack={() => setCurrentView('dashboard')} />;
      case 'mail_summarizer':
        return <MailSummarizer onBack={() => setCurrentView('dashboard')} />;
      case 'travel':
        return <TravelHub onBack={() => setCurrentView('dashboard')} />;
      case 'utility_status':
        return <UtilityStatus onBack={() => setCurrentView('dashboard')} />;
      case 'academics':
        return <AcademicCockpit onBack={() => setCurrentView('dashboard')} />;
      case 'services':
        return <ServicesPortal onBack={() => setCurrentView('dashboard')} />;
      case 'explore':
        return <Explore onBack={() => setCurrentView('dashboard')} />;
      case 'exchange_hub':
        return <ExchangeHub onBack={() => setCurrentView('dashboard')} onNavigate={(v) => setCurrentView(v as View)} />;
      case 'dashboard':
      default:
        return <Dashboard openModal={openGlobalModal} setView={setCurrentView} />;
    }
  };

  const hideFooterViews: View[] = ['mess', 'mail_summarizer', 'travel', 'utility_status', 'exchange_hub', 'academics', 'services', 'explore'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-200">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        openModal={openGlobalModal}
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      {!hideFooterViews.includes(currentView) && <Footer openModal={openGlobalModal} />}

      {activeModal && modalContent && (
        <Modal 
          isOpen={!!activeModal} 
          onClose={() => setActiveModal(null)} 
          title={modalContent.title}
        >
          {modalContent.content}
        </Modal>
      )}
    </div>
  );
};

export default App;
