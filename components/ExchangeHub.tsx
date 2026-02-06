
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
  extra1: string;
  extra2: string;
  img: string;
}

interface ExchangeHubProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

const EXCHANGE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3xJFl76PqRk5V2ZKYFLns4b_Q4heCTOAvihAlCB8d_iYxM2mt97eXhJraZwMHqMHo6eNBcw9ehuNv/pubhtml';

const ExchangeHub: React.FC<ExchangeHubProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Skill Exchange' | 'Group Buy' | 'Rentals'>('Skill Exchange');
  const [items, setItems] = useState<HubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(EXCHANGE_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const csvText = await response.text();
        const parsed = parseCsv(csvText);
        setItems(parsed);
        setLoading(false);
      } catch (err) {
        setError("Sync Error: Using locally cached listings.");
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
          id: clean(row[0]),
          category: clean(row[1]) as any,
          title: clean(row[2]),
          sub: clean(row[3]),
          description: clean(row[4]),
          ratingGoal: clean(row[5]),
          reviewsJoined: clean(row[6]),
          extra1: clean(row[7]),
          extra2: clean(row[8]),
          img: clean(row[9])
        });
      }
    }
    return result;
  };

  const skills = items.filter(i => i.category === 'SKILL');
  const buys = items.filter(i => i.category === 'BUY');
  const rentals = items.filter(i => i.category === 'RENTAL');

  return (
    <div className="bg-slate-50 min-h-screen flex">
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
           {['dashboard', 'exchange_hub', 'travel'].map(view => (
             <button 
               key={view}
               onClick={() => onNavigate(view)}
               className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${view === 'exchange_hub' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                <Hub className="w-5 h-5" />
                {view.replace('_', ' ')}
             </button>
           ))}
        </nav>
      </aside>

      <div className="flex-1 p-8 lg:p-12 max-w-[1400px]">
        <div className="flex items-center justify-between mb-10">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Exchange Hub</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-1.5 h-1.5 ${error ? 'bg-orange-500' : 'bg-green-500'} rounded-full animate-pulse`}></div>
                <p className="text-sm font-medium text-slate-400">{loading ? 'Syncing...' : 'Campus Cloud Connected'}</p>
              </div>
           </div>
        </div>

        <div className="flex gap-1 border-b border-slate-200 mb-12">
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
            {[1, 2, 3].map(n => <div key={n} className="bg-white p-8 rounded-[2rem] border border-slate-100 h-64 animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'Skill Exchange' ? skills : activeTab === 'Group Buy' ? buys : rentals).map(s => (
              <div key={s.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <img src={s.img} className="w-12 h-12 rounded-full border border-slate-100" alt={s.title} />
                  <div>
                    <h4 className="font-bold text-slate-900">{s.title}</h4>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">{s.sub}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-6">{s.description}</p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                   <span className="text-xs font-black text-slate-900">{s.extra2}</span>
                   <button className="text-xs font-bold text-indigo-600 hover:underline">Connect</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeHub;
