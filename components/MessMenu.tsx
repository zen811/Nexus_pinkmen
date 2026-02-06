
import React, { useState, useEffect } from 'react';
import { Restaurant, Star, Schedule, ChevronRight, Notifications, Star as StarIcon, Bolt } from './Icons';

interface Dish {
  id: string | number;
  name: string;
  kcal: string;
  type: string;
  tags: string[];
  veg: boolean;
  image: string;
  meal: string;
}

interface MessMenuProps {
  onBack: () => void;
  openModal: (id: string, title: string, content: React.ReactNode) => void;
}

const MESS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3xJFl76PqRk5V2ZKYFLns4b_Q4heCTOAvihAlCB8d_iYxM2mt97eXhJraZwMHqMHo6eNBcw9ehuNv/pub?output=csv';

const MessMenu: React.FC<MessMenuProps> = ({ onBack, openModal }) => {
  const [activeMeal, setActiveMeal] = useState('Lunch');
  const [activeFilter, setActiveFilter] = useState('All Items');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(MESS_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Cloud Sync Failed');
        const csvText = await response.text();
        const parsedDishes = parseCsv(csvText);
        setDishes(parsedDishes);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch mess data:", err);
        setError("Unable to sync. Using default campus menu.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCsv = (csv: string): Dish[] => {
    const lines = csv.split(/\r?\n/);
    const result: Dish[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (!matches || matches.length < 5) continue;
      const clean = (val: string) => val.replace(/^"|"$/g, '').trim();
      result.push({
        id: `dish-${i}`,
        name: clean(matches[0]),
        kcal: clean(matches[1]),
        type: clean(matches[2]),
        tags: clean(matches[3]).split(',').map(s => s.trim()).filter(s => s),
        veg: ['TRUE', 'YES', 'VEG', '1'].includes(clean(matches[4]).toUpperCase()),
        image: matches[5] ? clean(matches[5]) : `https://picsum.photos/seed/${i}/300/200`,
        meal: matches[6] ? clean(matches[6]) : 'Lunch'
      });
    }
    return result;
  };

  const handleCheckIn = () => {
    openModal('mess_checkin', 'Mess Check-In & Analytics', (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Crowd Status</h4>
            <p className="text-lg font-black text-slate-900">70% Capacity</p>
            <p className="text-xs text-slate-500 mt-1 italic">Peak predicted at 1:30 PM</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Student Rating</h4>
            <div className="flex items-center gap-1">
              <span className="text-lg font-black text-slate-900">4.8</span>
              <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Based on 240+ reviews today</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Nutritional Tracking & Allergen Warnings</h4>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">Daily Calorie Goal</span>
                <span className="text-sm font-black text-primary">650 / 2200 kcal</span>
             </div>
             <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase border border-red-100">Contains Dairy</span>
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase border border-red-100">Contains Gluten</span>
             </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Popularity Trends</h4>
          <div className="p-4 bg-slate-900 rounded-2xl text-white">
             <p className="text-xs font-bold text-white/60 mb-2 uppercase">#1 Trending Dish</p>
             <h5 className="text-lg font-black tracking-tight">Butter Chicken Special</h5>
             <p className="text-xs text-white/50 mt-1">Claimed by 85 students in the last 15 minutes.</p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-primary to-blue-600 rounded-[2rem] text-white">
           <h4 className="text-sm font-black mb-1 uppercase tracking-widest">Personalized Recommendation</h4>
           <p className="text-xs text-white/80 leading-relaxed mb-4">"Based on your 2400kcal goal and high-protein preference, we recommend a double serving of Dal Tadka with whole-wheat Roti."</p>
           <button className="w-full py-2 bg-white text-primary font-black text-xs rounded-xl shadow-lg shadow-black/5 uppercase">Log Meal</button>
        </div>

        <button className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
           CONFIRM CHECK-IN
        </button>
      </div>
    ));
  };

  const filteredDishes = dishes.filter(dish => dish.meal.toLowerCase() === activeMeal.toLowerCase());

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white"><Restaurant className="w-5 h-5" /></div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">NEXUS Mess</h1>
            </div>
          </div>
          <button 
            onClick={handleCheckIn}
            className="px-6 py-2.5 bg-primary text-white font-black text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest"
          >
            Check In
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-1 border-b border-slate-200">
              {meals.map(meal => (
                <button
                  key={meal}
                  onClick={() => setActiveMeal(meal)}
                  className={`px-8 py-4 text-sm font-bold transition-all border-b-2 ${
                    activeMeal === meal ? 'text-primary border-primary' : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                [1, 2, 3, 4].map(i => <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 h-32 animate-pulse"></div>)
              ) : filteredDishes.length > 0 ? (
                filteredDishes.map(dish => (
                  <div key={dish.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-5 group cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 truncate pr-2">{dish.name}</h4>
                        <div className={`w-4 h-4 border ${dish.veg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5 shrink-0`}>
                          <div className={`w-1.5 h-1.5 ${dish.veg ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></div>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-tight">{dish.kcal} | {dish.type}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {dish.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[9px] font-bold rounded-lg border border-orange-100 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-400 font-bold italic">No cloud menu data found.</div>
              )}
            </div>
          </div>
          <aside className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Meal Timing</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                    <span className="text-xs font-bold text-slate-400 uppercase">Breakfast</span>
                    <span className="text-sm font-black text-slate-900">07:30 - 09:30</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <span className="text-xs font-bold text-primary uppercase">Lunch</span>
                    <span className="text-sm font-black text-slate-900">12:30 - 14:30</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                    <span className="text-xs font-bold text-slate-400 uppercase">Dinner</span>
                    <span className="text-sm font-black text-slate-900">19:30 - 21:30</span>
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MessMenu;
