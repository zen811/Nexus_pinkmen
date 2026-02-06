
import React, { useState, useEffect } from 'react';
import { Storefront, Search, Notifications, Hub, Commute, Schedule, Explore, LocalLibrary, Star, School, Bolt } from './Icons';

interface HubItem {
  id: string;
  category: 'SKILL' | 'BUY' | 'RENTAL';
  title: string;
  sub: string;
  description: string;
  ratingGoal: string;
  reviewsJoined: string;
  extra1: string; // Wants or Needed
  extra2: string; // Price or Status
  img: string;
}

interface ExchangeHubProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

const ExchangeHub: React.FC<ExchangeHubProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Skill Exchange' | 'Group Buy' | 'Rentals'>('Skill Exchange');
  const [items, setItems] = useState<HubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In real app: const response = await fetch('YOUR_EXCHANGE_HUB_SHEET_CSV_URL');
        // const csvText = await response.text();
        
        // Mocking CSV data structure
        const mockCsv = `ID,Category,Title,Sub,Description,RatingGoal,ReviewsJoined,Extra1,Extra2,ImageURL
1,SKILL,Alex Rivera,CODING,Offering React & Node.js tutoring in exchange for Advanced Mathematics...,4.9,42,Calculus III,React,https://i.pravatar.cc/150?u=alex
2,SKILL,Sarah Chen,DESIGN,UI/UX fundamentals and Figma workflow. Looking for Spanish...,5.0,18,Spanish,UI/UX,https://i.pravatar.cc/150?u=sarah
3,SKILL,Marcus Lee,SCIENCE,Organic Chemistry review sessions. Can trade for help with python scripts.,4.7,12,Python,Org-Chem,https://i.pravatar.cc/150?u=marcus
4,BUY,Chemistry Lab Manuals,Set of 10,Goal: 10 people for bulk discount rate.,10 people,7,3 more needed,45.00,https://images.unsplash.com/photo-1532187863486-abf91ad9b69b?auto=format&fit=crop&q=80&w=200
5,BUY,TI-84 Plus Calculators,5 orders,Goal: 5 orders for group pricing.,5 orders,4,1 more needed,98.00,https://images.unsplash.com/photo-1543165365-07232ed12fad?auto=format&fit=crop&q=80&w=200
6,RENTAL,Canon EOS R5,Photography,Available for weekend projects or club events.,AVAILABLE,,4K Video,24-70mm lens,https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400
7,RENTAL,Digital Microscope,Lab Equipment,Reserved for Biology Dept. use until Nov 5th.,RESERVED,,X-200 Zoom,Precision Lens,https://images.unsplash.com/photo-1582719201912-34021b183624?auto=format&fit=crop&q=80&w=400
8,RENTAL,4K Mini Projector,Entertainment,Perfect for hostel movie nights. Comes with tripod.,AVAILABLE,,HDMI Cable,Portable,https://images.unsplash.com/photo-1535016120720-40c646bebbdc?auto=format&fit=crop&q=80&w=400`;

        const parsed = parseCsv(mockCsv);
        setItems(parsed);
        setLoading(false);
      } catch (err) {
        setError("Failed to sync Exchange Hub data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const parseCsv = (csv: string): HubItem[] => {
    const lines = csv.split('\n');
    const result: HubItem[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const row = lines[i].split(',');
      if (row.length >= 10) {
        result.push({
          id: row[0],
          category: row[1] as any,
          title: row[2],
          sub: row[3],
          description: row[4],
          ratingGoal: row[5],
          reviewsJoined: row[6],
          extra1: row[7],
          extra2: row[8],
          img: row[9]
        });
      }
    }
    return result;
  };

  const skills = items.filter(i => i.category === 'SKILL');
  const buys = items.filter(i => i.category === 'BUY');
  const rentals = items.filter(i => i.category === 'RENTAL');

  const sidebarItems = [
    { label: 'Home', icon: Hub, view: 'dashboard' },
    { label: 'Exchange Hub', icon: Storefront, view: 'exchange_hub' },
    { label: 'Community', icon: Explore, view: 'community' },
    { label: 'Travel Share', icon: Commute, view: 'travel' },
    { label: 'Events', icon: Schedule, view: 'events' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col p-6 sticky top-[68px] h-[calc(100vh-68px)]">
        <div className="flex items-center gap-3 mb-10 px-2">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Storefront className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">NEXUS</h2>
              <p className="text-[10px] font-bold text-slate-400">EXCHANGE HUB</p>
           </div>
        </div>

        <nav className="space-y-2 flex-1">
           {sidebarItems.map(item => (
             <button 
               key={item.label}
               onClick={() => onNavigate(item.view)}
               className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.view === 'exchange_hub' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                <item.icon className="w-5 h-5" />
                {item.label}
             </button>
           ))}
        </nav>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm mt-auto">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
           Post an Offer
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 max-w-[1400px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Exchange Hub</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-slate-400">Live Syncing with Campus Sheets</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   className="pl-11 pr-6 py-2.5 bg-slate-100/50 border-none rounded-xl text-xs w-64 focus:ring-2 focus:ring-indigo-600/20" 
                   placeholder="Search skills, rentals..." 
                 />
              </div>
              <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600">
                 <Notifications className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 mb-12">
           {['Skill Exchange', 'Group Buy', 'Rentals'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-8 py-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
             >
                {tab === 'Skill Exchange' && <School className="w-4 h-4" />}
                {tab === 'Group Buy' && <Storefront className="w-4 h-4" />}
                {tab === 'Rentals' && <LocalLibrary className="w-4 h-4" />}
                {tab}
             </button>
           ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white p-8 rounded-[2rem] border border-slate-100 h-64 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
           <div className="p-12 bg-red-50 rounded-3xl border border-red-100 text-center">
             <Bolt className="w-12 h-12 text-red-500 mx-auto mb-4" />
             <p className="font-bold text-red-600">{error}</p>
          </div>
        ) : (
          <>
            {activeTab === 'Skill Exchange' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                 {skills.map(s => (
                   <div key={s.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100">
                               <img src={s.img} alt={s.title} />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-900">{s.title}</h4>
                               <div className="flex items-center gap-1 text-orange-500 font-bold text-[10px]">
                                  <Star className="w-3 h-3 fill-current" />
                                  {s.ratingGoal} <span className="text-slate-400 font-medium">({s.reviewsJoined} reviews)</span>
                               </div>
                            </div>
                         </div>
                         <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase border border-indigo-100">{s.sub}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-8">{s.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                         <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg border border-slate-100 italic">Teaches: {s.extra2}</span>
                         <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg border border-slate-100 italic">Wants: {s.extra1}</span>
                      </div>
                      <button className="w-full py-3 bg-slate-50 text-slate-900 font-bold text-sm rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-slate-100">
                         Request Swap
                      </button>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'Group Buy' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {buys.map(g => (
                  <div key={g.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6">
                     <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                        <img src={g.img} className="w-full h-full object-cover" alt={g.title} />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                           <h4 className="font-bold text-slate-900 leading-tight pr-4">{g.title}</h4>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-4 tracking-widest">{g.description}</p>
                        
                        <div className="mb-6">
                           <div className="flex justify-between text-[10px] font-bold mb-1.5">
                              <span className="text-indigo-600">{g.reviewsJoined} joined</span>
                              <span className="text-slate-400">{g.extra1}</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(parseInt(g.reviewsJoined) / 10) * 100}%` }}></div>
                           </div>
                        </div>

                        <div className="flex items-center justify-between">
                           <div>
                              <span className="text-xl font-black text-slate-900 tracking-tight">${g.extra2}</span>
                           </div>
                           <button className="px-6 py-2 bg-indigo-600 text-white font-black text-xs rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Join Buy</button>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Rentals' && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {rentals.map(r => (
                   <div key={r.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all cursor-pointer">
                      <div className="h-48 overflow-hidden relative">
                         <img src={r.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={r.title} />
                         <div className="absolute top-4 left-4">
                            <span className={`px-2.5 py-1 text-[8px] font-black rounded-lg uppercase tracking-widest border ${r.ratingGoal === 'AVAILABLE' ? 'bg-green-500 text-white border-green-400' : 'bg-slate-500 text-white border-slate-400 opacity-80'}`}>
                               {r.ratingGoal}
                            </span>
                         </div>
                      </div>
                      <div className="p-6">
                         <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">{r.title}</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">{r.sub}</p>
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExchangeHub;
