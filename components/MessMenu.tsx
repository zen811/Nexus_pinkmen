
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
}

/** 
 * IMPORTANT: To use your own sheet:
 * 1. Open Google Sheet
 * 2. File -> Share -> Publish to web
 * 3. Select "Entire Document" and "Comma-separated values (.csv)"
 * 4. Paste that URL here.
 */
const MESS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3xJFl76PqRk5V2ZKYFLns4b_Q4heCTOAvihAlCB8d_iYxM2mt97eXhJraZwMHqMHo6eNBcw9ehuNv/pub?output=csv';

const MessMenu: React.FC<MessMenuProps> = ({ onBack }) => {
  const [activeMeal, setActiveMeal] = useState('Lunch');
  const [activeFilter, setActiveFilter] = useState('All Items');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const meals = ['Breakfast', 'Lunch', 'Dinner'];
  const filters = ['All Items', 'Veg Only', 'High Protein', 'Low Carb', 'Gluten-Free'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(MESS_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const csvText = await response.text();
        const parsedDishes = parseCsv(csvText);
        setDishes(parsedDishes);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch mess data:", err);
        setError("Unable to sync with Google Sheets. Using offline cache...");
        // Fallback mock data if fetch fails
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCsv = (csv: string): Dish[] => {
    const lines = csv.split(/\r?\n/);
    const result: Dish[] = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      // Robust CSV parsing to handle quoted fields with commas
      const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (!matches || matches.length < 5) continue;

      const clean = (val: string) => val.replace(/^"|"$/g, '').trim();

      result.push({
        id: `dish-${i}`,
        name: clean(matches[0]),
        kcal: clean(matches[1]),
        type: clean(matches[2]),
        // Column 4: Tags (comma separated inside the cell)
        tags: clean(matches[3]).split(',').map(s => s.trim()).filter(s => s),
        // Column 5: Veg?
        veg: ['TRUE', 'YES', 'VEG', '1'].includes(clean(matches[4]).toUpperCase()),
        // Column 6: Image (Optional)
        image: matches[5] ? clean(matches[5]) : `https://picsum.photos/seed/${i}/300/200`,
        // Column 7: Meal (Optional, defaults to Lunch)
        meal: matches[6] ? clean(matches[6]) : 'Lunch'
      });
    }
    return result;
  };

  const filteredDishes = dishes.filter(dish => {
    const mealMatch = dish.meal.toLowerCase() === activeMeal.toLowerCase();
    const filterMatch = activeFilter === 'All Items' || 
                       (activeFilter === 'Veg Only' && dish.veg) ||
                       (activeFilter === 'High Protein' && dish.type.toLowerCase().includes('protein')) ||
                       (activeFilter === 'Low Carb' && dish.type.toLowerCase().includes('carb')) ||
                       (activeFilter === 'Gluten-Free' && dish.tags.some(t => t.toLowerCase().includes('gluten')));
    return mealMatch && filterMatch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white">
                <Restaurant className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">NEXUS Mess Menu</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`w-1.5 h-1.5 ${error ? 'bg-orange-500' : 'bg-green-500'} rounded-full animate-pulse`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {loading ? 'Syncing...' : error ? 'Offline Mode' : 'Live Sync Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <Notifications className="w-6 h-6" />
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

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                    activeFilter === filter 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 h-32 animate-pulse flex gap-5">
                    <div className="w-24 h-full bg-slate-100 rounded-2xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
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
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-400 font-bold">No dishes found in the cloud for {activeMeal}.</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Dining Insights</h3>
              <div className="space-y-6">
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
                  <Schedule className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-xl font-black text-slate-900">01:15 PM</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Best Time to Visit</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] text-center border border-slate-100">
                  <p className="font-bold text-slate-800 mb-6 text-sm">How was your meal today?</p>
                  <div className="flex justify-center gap-4 text-2xl">
                    {['😞', '😐', '😊', '🤩'].map(emoji => (
                      <button key={emoji} className="hover:scale-125 transition-transform">{emoji}</button>
                    ))}
                  </div>
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
