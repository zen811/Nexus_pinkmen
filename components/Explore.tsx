
import React, { useState } from 'react';
import { Explore, Star, LocationOn, Search, ChevronRight, Bolt, LocalLibrary, Restaurant, Schedule } from './Icons';

interface ExploreProps {
  onBack: () => void;
}

const ExplorePage: React.FC<ExploreProps> = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState('All Spots');

  const filters = [
    { label: 'All Spots', icon: '✨' },
    { label: 'Chill', icon: '☕' },
    { label: 'Study', icon: '📖' },
    { label: 'Food', icon: '🍽️' },
    { label: 'Date Spot', icon: '❤️' },
    { label: 'Late Night', icon: '🌙' },
    { label: 'Quiet Zone', icon: '🔇' }
  ];

  const trending = [
    { name: 'The Daily Grind', location: 'Main Street', dist: '0.5 km away', rating: '4.8', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400' },
    { name: 'Central Library Hall', location: 'North Wing', dist: '0.2 km away', rating: '4.9', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400' },
    { name: 'Nexus Plaza', location: 'Campus Heart', dist: '0.1 km away', rating: '4.7', img: 'https://images.unsplash.com/photo-1541339907198-e08759df9a13?auto=format&fit=crop&q=80&w=400' }
  ];

  const insideCampus = [
    { name: 'Solar Roof Garden', location: 'Science Block, 4th Floor', tag: 'Study-friendly', price: 'Free', features: ['High Speed', '4 min'], img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=400' },
    { name: 'Rec Center Lounge', location: 'South Student Hub', tag: 'Chill Zone', price: 'Free', features: ['PS5 Available', '2 min'], img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=400' }
  ];

  const outsideCampus = [
    { name: 'Burger & Co.', location: 'Downtown, Sector 5', tag: 'Student Favorite', price: '₹', features: ['10 min drive', '15% Student Discount'], badge: 'Cheap Eats', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400' },
    { name: 'Neon Night Hub', location: 'West Avenue', tag: 'Party', price: '₹₹', features: ['Campus Approved', 'Live Music Fri-Sat'], img: 'https://images.unsplash.com/photo-1514525253361-bee8d419b74e?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Explore More</h1>
            <p className="text-slate-500 font-medium">Discover the most popular & crazy student spots on and off campus.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-black text-sm rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Explore className="w-4 h-4" />
            Open Full Map
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-10">
          {filters.map(filter => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`whitespace-nowrap flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all border ${
                activeFilter === filter.label 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-primary/30'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-3 space-y-16">
            
            {/* Trending Right Now */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <Bolt className="w-6 h-6 text-yellow-500" />
                  Trending Right Now
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-primary transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-primary transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trending.map(spot => (
                  <div key={spot.name} className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all">
                    <img src={spot.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={spot.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-yellow-400 text-black text-[9px] font-black rounded-lg flex items-center gap-1 uppercase tracking-widest">
                        <Bolt className="w-3 h-3" />
                        Trending
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between mb-2">
                         <h3 className="text-xl font-black text-white tracking-tight">{spot.name}</h3>
                         <div className="flex items-center gap-1 text-yellow-400 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold">
                            {spot.rating} ★
                         </div>
                      </div>
                      <p className="text-white/70 text-xs font-medium flex items-center gap-2">
                        <LocationOn className="w-3 h-3" />
                        {spot.location} • {spot.dist}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inside Campus */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Inside Campus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {insideCampus.map(spot => (
                  <div key={spot.name} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col">
                    <div className="relative h-48">
                      <img src={spot.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={spot.name} />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[9px] font-black rounded-full uppercase tracking-widest">
                        {spot.tag}
                      </div>
                    </div>
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-black text-slate-900">{spot.name}</h3>
                          <span className="text-xs font-bold text-primary">{spot.price}</span>
                       </div>
                       <p className="text-xs text-slate-400 font-medium mb-6">{spot.location}</p>
                       <div className="flex items-center gap-6">
                          {spot.features.map(f => (
                            <div key={f} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                               {f}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Outside Campus */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Outside Campus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {outsideCampus.map(spot => (
                  <div key={spot.name} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img src={spot.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt={spot.name} />
                      <div className="absolute top-4 left-4 flex gap-2">
                         <span className="px-3 py-1 bg-primary text-white text-[9px] font-black rounded-full uppercase tracking-widest">
                           {spot.badge || spot.tag}
                         </span>
                         {spot.badge && (
                           <span className="px-3 py-1 bg-green-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
                              Cheap Eats
                           </span>
                         )}
                      </div>
                      <div className="absolute top-4 right-4">
                         <span className="px-3 py-1 bg-pink-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
                            {spot.name.includes('Hub') ? 'Party' : 'Chill'}
                         </span>
                      </div>
                    </div>
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-black text-slate-900">{spot.name}</h3>
                          <span className="text-xs font-bold text-primary">{spot.price}</span>
                       </div>
                       <p className="text-xs text-slate-400 font-medium mb-6">{spot.location}</p>
                       <div className="flex items-center gap-6">
                          {spot.features.map(f => (
                            <div key={f} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                               {f}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Spots Near You */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <LocationOn className="w-5 h-5 text-primary" />
                  Spots Near You
               </h3>
               
               <div className="aspect-square bg-slate-200 rounded-[2rem] mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/campus-map/400')] bg-cover opacity-50 transition-transform duration-[5s] group-hover:scale-150"></div>
                  {/* Mock Map Pins */}
                  <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg animate-bounce"></div>
                  <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-lg"></div>
               </div>

               <div className="space-y-3 mb-8">
                  {[
                    { label: 'Campus Study Halls', color: 'bg-primary' },
                    { label: 'Dining & Cafes', color: 'bg-red-500' },
                    { label: 'Leisure Spots', color: 'bg-yellow-500' }
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${l.color}`}></div>
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{l.label}</span>
                    </div>
                  ))}
               </div>

               <button className="w-full py-4 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/10">
                  View Interactive Map
               </button>
            </div>

            {/* Adventurous Card */}
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-primary/30">
               <div className="absolute -right-10 -bottom-10 opacity-20 transform group-hover:scale-125 transition-transform duration-700">
                  <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
               </div>
               
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h4 className="text-xl font-black mb-2 tracking-tight">Feeling adventurous?</h4>
                  <p className="text-white/80 text-xs font-medium mb-8 leading-relaxed">Let our AI pick a random "Hidden Gem" spot for your study group today!</p>
                  
                  <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-sm rounded-2xl hover:bg-white/20 transition-all">
                     Surprise Me
                  </button>
               </div>
            </div>
          </aside>
        </div>

        {/* Explore Footer */}
        <div className="mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-black italic text-lg">N</div>
              <span>NEXUS</span>
              <span className="opacity-50">© 2024 University Campus Super App</span>
           </div>
           <div className="flex gap-8">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Help Center</button>
              <button className="hover:text-primary transition-colors">Safety</button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ExplorePage;
