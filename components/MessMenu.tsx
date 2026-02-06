
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

// Replace with your actual Google Sheet CSV URL
// Format: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3xJFl76PqRk5V2ZKYFLns4b_Q4heCTOAvihAlCB8d_iYxM2mt97eXhJraZwMHqMHo6eNBcw9ehuNv/pubhtml';

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
        // Using a mock fetch delay for aesthetics, though real fetch would be here
        // const response = await fetch(GOOGLE_SHEET_URL);
        // const csvText = await response.text();
        
        // Mocking CSV data structure as if it came from the sheet
        // Columns: Name, Calories, Type, Tags (comma-sep), Veg(TRUE/FALSE), ImageURL, Meal
        const mockCsv = `Name,Calories,Type,Tags,Veg,ImageURL,Meal
Grilled Paneer Tikka,350 kcal,Low Carb,"Popular, Contains Dairy",TRUE,https://images.unsplash.com/photo-1567184109171-969977ecbd90?auto=format&fit=crop&q=80&w=300&h=200,Lunch
Veg Pulao & Raita,420 kcal,Main Course,Gluten Free,TRUE,https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=300&h=200,Lunch
Home-style Chicken Curry,510 kcal,High Protein,Weekly Top,FALSE,https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=300&h=200,Lunch
Greek Salad Bowl,180 kcal,Low Carb,Vegetarian,TRUE,https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=300&h=200,Lunch
Oatmeal with Fruits,280 kcal,High Fiber,"Healthy, Breakfast",TRUE,https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=300&h=200,Breakfast
Tandoori Chicken,450 kcal,High Protein,Spicy,FALSE,https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=300&h=200,Dinner`;

        const parsedDishes: Dish[] = parseCsv(mockCsv);
        setDishes(parsedDishes);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch mess data:", err);
        setError("Unable to sync with Google Sheets. Please check your connection.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCsv = (csv: string): Dish[] => {
    const lines = csv.split('\n');
    const result: Dish[] = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      
      // Simple regex to handle quoted commas in tags
      const currentline = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      
      if (currentline && currentline.length >= 7) {
        result.push({
          id: i,
          name: currentline[0].replace(/"/g, ''),
          kcal: currentline[1].replace(/"/g, ''),
          type: currentline[2].replace(/"/g, ''),
          tags: currentline[3].replace(/"/g, '').split(',').map(s => s.trim()),
          veg: currentline[4].replace(/"/g, '').toUpperCase() === 'TRUE',
          image: currentline[5].replace(/"/g, ''),
          meal: currentline[6].replace(/"/g, '')
        });
      }
    }
    return result;
  };

  const filteredDishes = dishes.filter(dish => {
    const mealMatch = dish.meal === activeMeal;
    const filterMatch = activeFilter === 'All Items' || 
                       (activeFilter === 'Veg Only' && dish.veg) ||
                       (activeFilter === 'High Protein' && dish.type === 'High Protein') ||
                       (activeFilter === 'Low Carb' && dish.type === 'Low Carb') ||
                       (activeFilter === 'Gluten-Free' && dish.tags.includes('Gluten Free'));
    return mealMatch && filterMatch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Overlay */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
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
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Sync: Google Sheets</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <Notifications className="w-6 h-6" />
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-100">
               <img src="https://picsum.photos/seed/student/200" alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Menu Section */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-3xl font-extrabold text-slate-900">Today's Selection</h2>
               <span className="text-xs font-bold text-slate-400">Oct 24, 2024</span>
            </div>
            
            {/* Meal Tabs */}
            <div className="flex gap-1 border-b border-slate-200">
              {meals.map(meal => (
                <button
                  key={meal}
                  onClick={() => setActiveMeal(meal)}
                  className={`px-8 py-4 text-sm font-bold transition-all border-b-2 ${
                    activeMeal === meal 
                    ? 'text-primary border-primary' 
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Current Meal Hero */}
          <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8 overflow-hidden">
            <div className="w-full md:w-2/5 h-64 rounded-[2rem] overflow-hidden bg-slate-100">
              {loading ? (
                <div className="w-full h-full animate-pulse bg-slate-200"></div>
              ) : (
                <img 
                  className="w-full h-full object-cover" 
                  src={activeMeal === 'Lunch' ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" : "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=600"} 
                  alt="Main Meal" 
                />
              )}
            </div>
            <div className="flex-1 py-4 pr-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-100 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  Normal Crowd
                </span>
                <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                   <StarIcon className="w-4 h-4 fill-current" />
                   4.2/5
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Current Meal: {activeMeal}</h3>
              <p className="text-slate-400 font-medium flex items-center gap-2 mb-8">
                <Schedule className="w-5 h-5" />
                {activeMeal === 'Breakfast' ? '07:30 AM - 09:30 AM' : activeMeal === 'Lunch' ? '12:30 PM - 02:30 PM' : '07:30 PM - 09:30 PM'}
              </p>
              <button className="w-full bg-[#3abff8] hover:bg-[#2eaee8] text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-[#3abff8]/30 transition-all transform active:scale-[0.98]">
                Check In Now
              </button>
            </div>
          </div>

          {/* Filters */}
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

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 h-32 animate-pulse flex gap-5">
                   <div className="w-24 h-full bg-slate-100 rounded-2xl"></div>
                   <div className="flex-1 space-y-3">
                      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                   </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full p-12 bg-red-50 rounded-3xl border border-red-100 text-center">
                 <Bolt className="w-12 h-12 text-red-500 mx-auto mb-4" />
                 <p className="font-bold text-red-600">{error}</p>
                 <button onClick={() => window.location.reload()} className="mt-4 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-700">Retry Sync</button>
              </div>
            ) : filteredDishes.length > 0 ? (
              filteredDishes.map(dish => (
                <div key={dish.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-5 group cursor-pointer">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900 truncate pr-2">{dish.name}</h4>
                      {dish.veg ? (
                         <div className="w-4 h-4 border border-green-600 flex items-center justify-center p-0.5 shrink-0"><div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div></div>
                      ) : (
                         <div className="w-4 h-4 border border-red-600 flex items-center justify-center p-0.5 shrink-0"><div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div></div>
                      )}
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
                  <div className="flex flex-col justify-end">
                     <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.704a2 2 0 011.94 2.66l-2.127 7.126a2 2 0 01-1.94 1.414H6.83a2 2 0 01-1.94-1.414L2.763 12.66A2 2 0 014.704 10H9.42L8.338 4.69a.93.93 0 011.603-.717L14 10z" /></svg>
                     </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                 <p className="text-slate-400 font-bold">No dishes found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Insights */}
        <aside className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
               <MonitoringIcon className="w-6 h-6 text-primary" />
               Dining Insights
            </h3>

            <div className="space-y-8">
              {/* Best Time */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Best Time to Visit</p>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                     <Schedule className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">01:15 PM</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Shortest Queue Duration</p>
                  </div>
                </div>
              </div>

              {/* Most Liked */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Most Liked Dish This Week</p>
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Butter Chicken</p>
                    <p className="text-[10px] text-slate-500 font-medium">Served every Friday</p>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-slate-50 p-8 rounded-[2rem] text-center border border-slate-100">
                <p className="font-bold text-slate-800 mb-6 text-sm tracking-tight">How was your meal today?</p>
                <div className="flex justify-center gap-4">
                   {['😞', '😐', '😊', '🤩'].map(emoji => (
                     <button key={emoji} className="text-2xl hover:scale-125 transition-transform p-1">{emoji}</button>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Meal Preview */}
          <div className="bg-gradient-to-br from-primary to-[#2eaee8] rounded-[2.5rem] p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl shadow-primary/30">
            <div className="absolute -right-10 -bottom-10 opacity-20 transform group-hover:scale-125 transition-transform duration-700">
               <Restaurant className="w-48 h-48" />
            </div>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-4">Next Meal Preview</p>
            <h3 className="text-3xl font-black mb-1">Dinner</h3>
            <p className="text-white/80 font-medium text-sm mb-6">Paneer Butter Masala & Garlic Naan</p>
            
            <div className="flex items-center justify-between mt-auto">
               <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">07:30 PM - 09:30 PM</span>
               <button className="flex items-center gap-1.5 text-xs font-bold hover:underline">
                  <Notifications className="w-4 h-4" />
                  Remind Me
               </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const MonitoringIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);

export default MessMenu;
