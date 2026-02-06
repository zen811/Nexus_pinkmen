
import React, { useState, useEffect } from 'react';
import { Storefront, Search, Notifications, Hub, Commute, Schedule, Explore, LocalLibrary, Star, School, Bolt, ChevronRight } from './Icons';

interface HubItem {
  id: string;
  category: 'SKILL' | 'BUY' | 'RENTAL';
  title: string;
  sub: string;
  description: string;
  ratingGoal: string;
  reviewsJoined: string;
  extra1: string;
  extra2: string;
  img: string;
  tags?: string[];
}

interface ExchangeHubProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

const EXCHANGE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3xJFl76PqRk5V2ZKYFLns4b_Q4heCTOAvihAlCB8d_iYxM2mt97eXhJraZwMHqMHo6eNBcw9ehuNv/pub?gid=1510222014&single=true&output=csv';

const MOCK_DATA: HubItem[] = [
  // Skill Exchange
  {
    id: 's1',
    category: 'SKILL',
    title: 'Python for Data Science',
    sub: 'Tutor: Alex Chen',
    description: 'Learn Pandas, NumPy and Matplotlib. I can help with your semester projects or interview prep.',
    ratingGoal: '4.9',
    reviewsJoined: '42 students helped',
    extra1: 'Advanced',
    extra2: 'Swap for: UI Design',
    img: 'https://i.pravatar.cc/150?u=alex',
    tags: ['Python', 'Data Science', 'Tutoring']
  },
  {
    id: 's2',
    category: 'SKILL',
    title: 'Acoustic Guitar Basics',
    sub: 'Tutor: Maria Garcia',
    description: 'Master chords, strumming patterns, and your favorite pop songs in 4 weeks.',
    ratingGoal: '4.8',
    reviewsJoined: '15 sessions',
    extra1: 'Beginner',
    extra2: 'Swap for: Math 101',
    img: 'https://i.pravatar.cc/150?u=maria',
    tags: ['Music', 'Guitar', 'Hobby']
  },
  {
    id: 's3',
    category: 'SKILL',
    title: 'UI/UX Design with Figma',
    sub: 'Tutor: Jordan Smith',
    description: 'Build high-fidelity prototypes and learn design systems. Portfolio review included.',
    ratingGoal: '5.0',
    reviewsJoined: '8 projects',
    extra1: 'Expert',
    extra2: 'Swap for: Coffee Treats',
    img: 'https://i.pravatar.cc/150?u=jordan',
    tags: ['Design', 'Figma', 'Skill']
  },
  // Group Buy
  {
    id: 'b1',
    category: 'BUY',
    title: 'Netflix Family Plan',
    sub: 'Organized by: Sam R.',
    description: 'Looking for 3 more people to split a 4K UHD Family Plan. Only ₹175/month.',
    ratingGoal: 'Verified',
    reviewsJoined: '2 slots left',
    extra1: 'Subscription',
    extra2: '₹175 / month',
    img: 'https://logo.clearbit.com/netflix.com',
    tags: ['Digital', 'Saving']
  },
  {
    id: 'b2',
    category: 'BUY',
    title: 'Bulk Organic Coffee Beans',
    sub: 'Organized by: Leo T.',
    description: 'Ordering 5kg of Blue Tokai beans. Split shipping and get 20% bulk discount.',
    ratingGoal: 'Pending',
    reviewsJoined: '4/10 orders',
    extra1: 'Grocery',
    extra2: '₹450 / 500g',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=100',
    tags: ['Coffee', 'Bulk']
  },
  // Rentals
  {
    id: 'r1',
    category: 'RENTAL',
    title: 'TI-84 Plus CE Calculator',
    sub: 'Owner: Kevin L.',
    description: 'Essential for Calc III exams. Perfect condition with charger included.',
    ratingGoal: 'Safe',
    reviewsJoined: 'Available Now',
    extra1: 'Stationary',
    extra2: '₹50 / day',
    img: 'https://images.unsplash.com/photo-1574607383476-f517f220d356?auto=format&fit=crop&q=80&w=100',
    tags: ['Exam', 'Math']
  },
  {
    id: 'r2',
    category: 'RENTAL',
    title: 'PS5 DualSense Controller',
    sub: 'Owner: Priya S.',
    description: 'Extra controller for your weekend gaming session. Haptic feedback works perfect.',
    ratingGoal: 'Clean',
    reviewsJoined: 'Book for Weekend',
    extra1: 'Gaming',
    extra2: '₹100 / day',
    img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=100',
    tags: ['Gaming', 'Weekend']
  }
];

const ExchangeHub: React.FC<ExchangeHubProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Skill Exchange' | 'Group Buy' | 'Rentals'>('Skill Exchange');
  const [items, setItems] = useState<HubItem[]>(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(EXCHANGE_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const csvText = await response.text();
        const parsed = parseCsv(csvText);
        // Combine mock data with fetched data for a rich experience
        if (parsed.length > 0) {
           setItems([...MOCK_DATA, ...parsed]);
        }
        setLoading(false);
      } catch (err) {
        console.warn("Sync Error: Using locally cached listings.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const parseCsv = (csv: string): HubItem[] => {
    const lines = csv.split(/\r?\n/);
    const result: HubItem[] = [];
    const clean = (val: string) => val?.replace(/^"|"$/g, '').trim() || '';

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (row && row.length >= 10) {
        result.push({
          id: `cloud-${clean(row[0])}`,
          category: clean(row[1]) as any,
          title: clean(row[2]),
          sub: clean(row[3]),
          description: clean(row[4]),
          ratingGoal: clean(row[5]),
          reviewsJoined: clean(row[6]),
          extra1: clean(row[7]),
          extra2: clean(row[8]),
          img: clean(row[9]),
          tags: ['Community']
        });
      }
    }
    return result;
  };

  const currentItems = items.filter(i => {
    if (activeTab === 'Skill Exchange') return i.category === 'SKILL';
    if (activeTab === 'Group Buy') return i.category === 'BUY';
    return i.category === 'RENTAL';
  });

  return (
    <div className="bg-slate-50 min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col p-6 sticky top-[68px] h-[calc(100vh-68px)]">
        <div className="flex items-center gap-3 mb-10 px-2">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Storefront className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">NEXUS</h2>
              <p className="text-[10px] font-bold text-slate-400">EXCHANGE HUB</p>
           </div>
        </div>
        <nav className="space-y-2 flex-1">
           {[
             { label: 'Dashboard', view: 'dashboard', icon: Hub },
             { label: 'Marketplace', view: 'exchange_hub', icon: Storefront },
             { label: 'Travel Pool', view: 'travel', icon: Commute },
           ].map(item => (
             <button 
               key={item.view}
               onClick={() => onNavigate(item.view)}
               className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab && item.view === 'exchange_hub' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                <item.icon className="w-5 h-5" />
                {item.label}
             </button>
           ))}
        </nav>
        
        <div className="mt-auto p-4 bg-slate-900 rounded-2xl text-white">
           <p className="text-[10px] font-black uppercase text-white/50 mb-1">New Listings</p>
           <p className="text-sm font-bold leading-tight">12 items posted in the last hour</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-8 lg:p-12 max-w-[1400px]">
        <div className="flex items-center justify-between mb-10">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Exchange Hub</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-1.5 h-1.5 ${error ? 'bg-orange-500' : 'bg-green-500'} rounded-full animate-pulse`}></div>
                <p className="text-sm font-medium text-slate-400">{loading ? 'Syncing with cloud...' : 'Live Community Marketplace'}</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search listings..." 
                   className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                 />
              </div>
              <button className="px-6 py-2 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                 Post Item
              </button>
           </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-1 border-b border-slate-200 mb-10">
           {['Skill Exchange', 'Group Buy', 'Rentals'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-8 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
             >
                {tab}
             </button>
           ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-white p-8 rounded-[2rem] border border-slate-100 h-64 animate-pulse">
                <div className="flex gap-4 mb-6">
                   <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                   <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                   </div>
                </div>
                <div className="h-20 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map(item => (
              <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={item.img} className="w-14 h-14 rounded-2xl border border-slate-100 object-cover" alt={item.title} />
                    {item.ratingGoal.includes('4.') || item.ratingGoal === '5.0' ? (
                      <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-[8px] font-black px-1 rounded-md border border-white">TOP</div>
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 truncate leading-none mb-1.5">{item.title}</h4>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{item.sub}</span>
                  </div>
                </div>

                <div className="flex-1">
                   <p className="text-xs text-slate-500 mb-6 leading-relaxed line-clamp-3">{item.description}</p>
                   
                   <div className="flex flex-wrap gap-2 mb-6">
                      {(item.tags || []).map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[9px] font-black rounded-lg border border-slate-100 uppercase tracking-tighter">
                           {tag}
                        </span>
                      ))}
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                   <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1.5">
                         <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                         <span className="text-xs font-black text-slate-900">{item.ratingGoal}</span>
                         <span className="text-[10px] text-slate-400 font-bold ml-1">{item.reviewsJoined}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.extra1}</span>
                   </div>
                   
                   <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                          {activeTab === 'Skill Exchange' ? 'Requirements' : activeTab === 'Group Buy' ? 'Contribution' : 'Price'}
                        </p>
                        <p className="text-sm font-black text-slate-900 tracking-tight">{item.extra2}</p>
                      </div>
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-50 text-indigo-600 font-black text-xs rounded-xl hover:bg-indigo-600 hover:text-white transition-all group/btn uppercase tracking-widest">
                         {activeTab === 'Skill Exchange' ? 'Swap' : activeTab === 'Group Buy' ? 'Join' : 'Rent'}
                         <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
              </div>
            ))}
            
            {/* Call to Action Card */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col items-center justify-center text-center shadow-xl shadow-indigo-200">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <Bolt className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-black mb-2">Can't find what you're looking for?</h3>
               <p className="text-white/70 text-xs mb-8">Post your own listing and start exchanging with the campus community today.</p>
               <button className="w-full py-4 bg-white text-indigo-600 font-black text-xs rounded-2xl shadow-lg shadow-black/10 uppercase tracking-widest hover:scale-105 transition-all">
                  Create Listing
               </button>
            </div>
          </div>
        )}
        
        {/* Statistics/Insights Bar */}
        {!loading && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                   <p className="text-xl font-black text-slate-900">₹1.2k</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saved by Community</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                   <p className="text-xl font-black text-slate-900">450+</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Members</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                   <p className="text-xl font-black text-slate-900">98%</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust Rating</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeHub;
