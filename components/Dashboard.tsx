
import React from 'react';
import { 
  Restaurant, AutoAwesome, Bolt, School, 
  RestaurantMenu, Mail, FindReplace, Storefront, 
  Commute, LocalLibrary, Monitoring, ChevronRight, 
  LocationOn, Star, Explore, Schedule, Hub 
} from './Icons';
import { View } from '../types';

interface DashboardProps {
  openModal: (id: string, title: string, content: React.ReactNode) => void;
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ openModal, setView }) => {
  
  const handleCardClick = (id: string, title: string, details: string) => {
    // Navigate to dedicated views
    if (id === 'mess') {
      setView('mess');
      return;
    }
    if (id === 'mail') {
      setView('mail_summarizer');
      return;
    }
    if (id === 'travel') {
      setView('travel');
      return;
    }
    if (id === 'alert') {
      setView('utility_status');
      return;
    }
    if (id === 'lost' || id === 'market' || id === 'exchange_hub') {
      setView('exchange_hub');
      return;
    }
    if (id === 'class' || id === 'academics' || id === 'gpa' || id.startsWith('g') || id.startsWith('a')) {
      setView('academics');
      return;
    }
    if (id === 'services') {
      setView('services');
      return;
    }
    if (id === 'explore') {
      setView('explore');
      return;
    }
    
    openModal(id, title, (
      <div className="p-2">
        <p className="text-slate-600 mb-6 leading-relaxed">{details}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Last Updated</span>
            <span className="text-sm font-semibold text-slate-700">10 minutes ago</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Status</span>
            <span className="text-sm font-semibold text-primary">Active</span>
          </div>
        </div>
        <button className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
          View Full Report
        </button>
      </div>
    ));
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20 py-8 space-y-10">
      
      {/* Today at a Glance */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Schedule className="w-6 h-6 text-primary" />
            Today at a Glance
          </h2>
          <button 
            onClick={() => handleCardClick('schedule', 'Full Schedule', 'Viewing your complete schedule for the fall semester.')}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Schedule
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cards */}
          <div 
            onClick={() => handleCardClick('mess', 'Mess Menu', '')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                <Restaurant className="w-6 h-6" />
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase">70% Full</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Mess Menu</h3>
            <p className="text-sm text-slate-500 mb-2 leading-tight">Butter Chicken & Paneer Tikka Masala</p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-[70%]"></div>
            </div>
          </div>

          <div 
            onClick={() => handleCardClick('mail', 'AI Mail Summary', '')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform">
                <AutoAwesome className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">3 NEW</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">AI Mail Summary</h3>
            <p className="text-sm text-slate-500 line-clamp-2 italic">"Prof. Smith sent the lab manual. Deadline shifted to Friday..."</p>
          </div>

          <div 
            onClick={() => handleCardClick('alert', 'System Alert', '')}
            className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm bg-gradient-to-br from-white to-red-50 cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                <Bolt className="w-6 h-6" />
              </div>
              <span className="animate-pulse flex h-2 w-2 rounded-full bg-red-600"></span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Power Outage</h3>
            <p className="text-sm text-red-600 font-medium">North Block: 2:00 PM</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Status: Repair in progress</p>
          </div>

          <div 
            onClick={() => handleCardClick('class', 'Next Class', '')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <School className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">IN 15 MIN</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Data Structures</h3>
            <p className="text-sm text-slate-500 mb-2 leading-tight">Room 402 • 10:15 AM</p>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i*20}/50`} alt="Classmate" />
                </div>
              ))}
              <div className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[8px] font-bold text-slate-500">
                +12
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Services Grid */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          Campus Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { id: 'mess', icon: RestaurantMenu, label: 'Mess' },
            { id: 'mail', icon: Mail, label: 'Mail' },
            { id: 'exchange_hub', icon: Storefront, label: 'Exchange Hub' },
            { id: 'travel', icon: Commute, label: 'Travel' },
            { id: 'academics', icon: LocalLibrary, label: 'Academics' },
            { id: 'services', icon: Hub, label: 'Services' },
          ].map((service) => (
            <div 
              key={service.id}
              onClick={() => handleCardClick(service.id, service.label, `Accessing ${service.label} services portal...`)}
              className="group cursor-pointer text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/20">
                <service.icon className="w-8 h-8" />
              </div>
              <span className="mt-3 text-sm font-bold text-slate-700 transition-colors group-hover:text-primary">{service.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Academic Cockpit */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Monitoring className="w-6 h-6 text-primary" />
            Academic Cockpit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CGPA Summary */}
            <div 
              onClick={() => handleCardClick('gpa', 'CGPA Analysis', 'Your performance has improved by 4% compared to the previous semester.')}
              className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current CGPA</span>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full font-bold">+0.32 this sem</span>
              </div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-7xl font-extrabold text-slate-900 tracking-tighter">9.12</span>
                <span className="text-2xl text-slate-300 font-medium">/ 10.0</span>
              </div>
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Course Completion</span>
                  <span className="font-bold text-slate-900">68%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[68%] rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Recent Grades</h3>
              <div className="space-y-5">
                {[
                  { id: 'g1', sub: 'Algorithms Lab', grade: '9.0', meta: 'Quiz #4 • Yesterday', color: 'bg-indigo-50 text-indigo-600' },
                  { id: 'g2', sub: 'Economics', grade: '8.5', meta: 'Midterm Paper • Oct 12', color: 'bg-green-50 text-green-600' },
                  { id: 'g3', sub: 'UI Design', grade: '8.0', meta: 'Portfolio Review • Oct 10', color: 'bg-yellow-50 text-yellow-600' },
                ].map((g) => (
                  <div 
                    key={g.id}
                    onClick={() => handleCardClick(g.id, g.sub, '')}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${g.color} rounded-2xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform`}>{g.grade}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{g.sub}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{g.meta}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 text-lg">Upcoming Assignments</h3>
              <button className="text-xs font-bold text-primary px-4 py-1.5 bg-primary/10 rounded-full hover:bg-primary/20 transition-all uppercase tracking-wider">3 Pending</button>
            </div>
            <div className="space-y-4">
              {[
                { id: 'a1', title: 'Final Research Proposal', meta: 'Due in 2 days • Societal Impact of AI', active: true },
                { id: 'a2', title: 'Database Schema Design', meta: 'Due Sunday • Computer Science', active: false },
              ].map((a) => (
                <div 
                  key={a.id}
                  onClick={() => handleCardClick(a.id, a.title, '')}
                  className="flex items-center p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/30 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">{a.title}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                      <Schedule className="w-4 h-4" />
                      {a.meta}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className={`h-10 w-10 rounded-full border-2 ${a.active ? 'border-primary/20' : 'border-slate-300'} flex items-center justify-center transition-all group-hover:border-primary`}>
                      {a.active && <div className="h-5 w-5 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/40"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Around You Section */}
        <aside className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <LocationOn className="w-6 h-6 text-primary" />
            Around You
          </h2>
          
          <div className="space-y-5">
            {[
              { id: 's1', name: 'Campus Coffee Lab', dist: '450m away', score: '4.8', desc: 'The best espresso on campus. Fast WiFi & Quiet Zone.', tags: ['WiFi', 'Quiet'], img: 'https://picsum.photos/seed/cafe/400/200' },
              { id: 's2', name: 'Main Library', dist: '200m away', score: '4.5', desc: '24/7 access during finals week. Printing available.', tags: ['24/7', 'Print'], img: 'https://picsum.photos/seed/library/400/200' }
            ].map((spot) => (
              <div 
                key={spot.id}
                onClick={() => handleCardClick(spot.id, spot.name, `${spot.name} is currently moderately busy. Estimated wait time is 5 minutes.`)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="h-40 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    src={spot.img} 
                    alt={spot.name} 
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/30">
                      {spot.dist}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{spot.name}</h4>
                    <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-bold ml-1">{spot.score}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed">{spot.desc}</p>
                  <div className="flex items-center gap-2">
                    {spot.tags.map(t => <span key={t} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-tighter">{t}</span>)}
                    <span className="ml-auto px-2.5 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-lg border border-green-200 uppercase">OPEN</span>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={() => handleCardClick('explore', 'Explore More Campus Spots', '')}
              className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-sm font-bold hover:bg-slate-50 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Explore className="w-6 h-6" />
              Explore More Campus Spots
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
