
import React from 'react';
import { Hub, Search, Notifications, Login, Logout, Emergency, Menu, AutoAwesome, Bolt, Restaurant } from './Icons';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  openModal: (id: string, title: string, content: React.ReactNode) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, isLoggedIn, onLogout, openModal }) => {
  const handleNotificationClick = () => {
    openModal('notifications', 'Updates & Alerts', (
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Mail (AI Summary)</h4>
          <div 
            onClick={() => onViewChange('mail_summarizer')}
            className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4 cursor-pointer hover:bg-blue-100 transition-colors group"
          >
            <AutoAwesome className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-slate-600 italic group-hover:text-primary transition-colors">"Prof. Smith sent the lab manual. Deadline shifted to Friday. Click to view clear actions."</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Active System Alerts</h4>
          <div 
            onClick={() => onViewChange('utility_status')}
            className="bg-red-50 p-4 rounded-2xl border border-red-100 flex gap-4 cursor-pointer hover:bg-red-100 transition-colors group"
          >
            <Bolt className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">Power Outage: North Block</p>
              <p className="text-xs text-slate-500 mt-1 italic">Click to view affected areas and estimated restoration times.</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Campus Life</h4>
          <div 
            onClick={() => onViewChange('mess')}
            className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-4 cursor-pointer hover:bg-orange-100 transition-colors group"
          >
            <Restaurant className="w-5 h-5 text-orange-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Lunch is now being served!</p>
              <p className="text-xs text-slate-500 mt-1">Check today's menu for Grilled Paneer Tikka and Chicken Curry.</p>
            </div>
            <span className="text-[10px] bg-orange-200 text-orange-700 font-bold px-2 py-1 rounded uppercase self-start">New</span>
          </div>
        </div>
      </div>
    ));
  };

  const navItems: { label: string; view: View }[] = [
    { label: 'dashboard', view: 'dashboard' },
    { label: 'academics', view: 'academics' },
    { label: 'exchange hub', view: 'exchange_hub' },
    { label: 'services', view: 'services' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-20 py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Search */}
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-2 text-primary cursor-pointer"
            onClick={() => onViewChange('dashboard')}
          >
            <Hub className="w-8 h-8 text-primary" />
            <h2 className="text-slate-900 text-xl font-extrabold tracking-tight hidden sm:block">NEXUS</h2>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-64 border border-transparent focus-within:border-primary/50 transition-all">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 text-slate-700" 
              placeholder="Search campus..." 
              type="text" 
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onViewChange(item.view)}
                className={`text-sm font-semibold capitalize transition-all pb-1 border-b-2 whitespace-nowrap ${
                  currentView === item.view || 
                  (item.view === 'dashboard' && ['mail_summarizer', 'utility_status'].includes(currentView))
                  ? 'text-primary border-primary' 
                  : 'text-slate-500 border-transparent hover:text-primary hover:border-primary/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 border-l border-slate-200 pl-4">
            <button 
              onClick={() => openModal('sos', 'Emergency Protocol', (
                <div className="p-4 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Emergency className="w-8 h-8 text-red-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Emergency Assistance Needed?</h3>
                  <p className="text-slate-600 mb-6">Contacting campus security and dispatching immediate medical assistance to your last known location.</p>
                  <button className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors">
                    CONFIRM SOS ALERT
                  </button>
                </div>
              ))}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-sos text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-sos/90 transition-all shadow-lg shadow-sos/20"
            >
              <Emergency className="w-4 h-4" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            <button 
              onClick={handleNotificationClick}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative"
            >
              <Notifications className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
                <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                  <img 
                    className="h-full w-full object-cover" 
                    src="https://picsum.photos/seed/student/200" 
                    alt="Profile" 
                  />
                </div>
                <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Logout className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onViewChange('login')}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <Login className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
            
            {/* Hamburger icon removed from here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
