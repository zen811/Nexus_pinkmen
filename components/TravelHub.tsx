
import React, { useState } from 'react';
import { Commute, Search, Schedule, Star, LocationOn, Bolt, ChevronRight, Notifications } from './Icons';

interface TravelHubProps {
  onBack: () => void;
}

const TravelHub: React.FC<TravelHubProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [travelType, setTravelType] = useState('All Pools');
  const [coedAllowed, setCoedAllowed] = useState(true);
  const [femaleOnly, setFemaleOnly] = useState(false);

  const carpools = [
    {
      id: 1,
      from: 'Campus Gate 2',
      to: 'Chandigarh Sec 17',
      time: 'Today, 5:30 PM',
      price: '150',
      filled: 2,
      total: 4,
      host: 'Arjun V.',
      verified: true,
      co2: '-2.4kg',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400&h=250'
    },
    {
      id: 2,
      from: 'Main Library',
      to: 'Delhi Airport T1',
      time: 'Tomorrow, 04:00 AM',
      price: '650',
      filled: 1,
      total: 4,
      host: 'Sanya K.',
      verified: false,
      co2: '-8.1kg',
      femaleOnly: true,
      image: 'https://images.unsplash.com/photo-1517059159616-3f13ad012700?auto=format&fit=crop&q=80&w=400&h=250'
    },
    {
      id: 3,
      from: 'Engineering Block',
      to: 'Cyber Hub, Gurgaon',
      time: 'Fri, 26 Oct - 6:00 PM',
      price: '400',
      filled: 3,
      total: 4,
      host: 'Rahul M.',
      verified: true,
      co2: '-5.7kg',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400&h=250'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white">
                <Commute className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Travel Sharing Hub</h1>
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

      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Filters</h3>
              
              {/* Travel Type */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Travel Type</p>
                <div className="space-y-2">
                  {['All Pools', 'Cab Pooling'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setTravelType(type)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                        travelType === type 
                        ? 'bg-primary/5 text-primary border-primary' 
                        : 'text-slate-500 border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <Commute className="w-4 h-4" />
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Preferences</p>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Co-ed Allowed</span>
                    <input 
                      type="checkbox" 
                      checked={coedAllowed} 
                      onChange={() => setCoedAllowed(!coedAllowed)}
                      className="w-5 h-5 rounded text-primary border-slate-300 focus:ring-primary/20" 
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Female Only</span>
                    <input 
                      type="checkbox" 
                      checked={femaleOnly} 
                      onChange={() => setFemaleOnly(!femaleOnly)}
                      className="w-5 h-5 rounded text-primary border-slate-300 focus:ring-primary/20" 
                    />
                  </label>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Date & Time</p>
                <button className="w-full flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary transition-all">
                   <Schedule className="w-5 h-5 text-slate-400" />
                   Today, 24 Oct
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Price Range</p>
                <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                   <span>₹0</span>
                   <span>₹1000+</span>
                </div>
              </div>

              <button className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 mb-4">
                 Apply Filters
              </button>
              <button className="w-full text-xs font-bold text-slate-400 hover:text-slate-600">
                 Reset Filters
              </button>
            </div>

            {/* Sustainability Widget */}
            <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.58 17.585c.414.415 1.086.415 1.5 0l2.5-2.5a1.06 1.06 0 000-1.5l-2.5-2.5a1.06 1.06 0 00-1.5 1.5l1.75 1.75H2a1 1 0 100 2h1.33l-1.75 1.75a1.06 1.06 0 001.5 1.5z" clipRule="evenodd" /></svg>
               </div>
               <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-4">Campus Sustainability</p>
               <h3 className="text-4xl font-black mb-2 tracking-tighter">1,240kg</h3>
               <p className="text-xs text-white/80 font-medium leading-relaxed">CO2 saved this month by student carpooling.</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-10">
            
            {/* Search Bar Area */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <LocationOn className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Where are you heading? (e.g. Chandigarh, Delhi Airport...)"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all transform active:scale-95">
                  Search
                </button>
              </div>
              
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Quick Routes:</span>
                {['Chandigarh Sec-17', 'IGI Airport T3', 'Delhi NCR', 'Railway Station'].map(route => (
                  <button key={route} className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200 hover:border-primary/50 transition-all">
                    {route}
                  </button>
                ))}
              </div>
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Carpools (24)</h2>
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  Sort by: <span className="text-primary cursor-pointer hover:underline">Soonest Departure</span>
               </div>
            </div>

            {/* Carpool Cards List */}
            <div className="space-y-6">
              {carpools.map(pool => (
                <div key={pool.id} className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 overflow-hidden group">
                   {/* Map/Image Area */}
                   <div className="w-full md:w-1/3 h-48 rounded-[2rem] overflow-hidden relative">
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#10b981] text-white text-[10px] font-bold rounded-lg border border-[#10b981]/30">
                         {pool.co2} CO2
                      </div>
                      <img src={pool.image} alt="Route" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>

                   {/* Content Area */}
                   <div className="flex-1 py-4 flex flex-col justify-between">
                      <div>
                         <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors pr-2">
                               {pool.from} <span className="text-slate-300 font-normal mx-1">→</span> {pool.to}
                            </h3>
                            <div className="text-right">
                               <p className="text-2xl font-black text-slate-900 tracking-tight">₹{pool.price}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PER SEAT</p>
                            </div>
                         </div>
                         <p className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-6">
                            <Schedule className="w-4 h-4" />
                            Departs: {pool.time}
                         </p>

                         {/* Profile and occupancy */}
                         <div className="flex items-center gap-10">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden">
                                  <img src={`https://picsum.photos/seed/${pool.host}/100`} alt={pool.host} />
                               </div>
                               <div>
                                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">Hosted by</p>
                                  <div className="flex items-center gap-1">
                                     <span className="text-sm font-bold text-slate-800">{pool.host}</span>
                                     {pool.verified && (
                                       <div className="bg-primary/10 p-0.5 rounded-full">
                                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                                       </div>
                                     )}
                                  </div>
                               </div>
                            </div>
                            
                            <div className="flex-1 max-w-[200px]">
                               <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-400">
                                  <span>{pool.filled}/{pool.total} filled</span>
                               </div>
                               <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${(pool.filled / pool.total) * 100}%` }}></div>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                         <div className="flex gap-2">
                            {pool.femaleOnly && (
                               <span className="px-3 py-1 bg-pink-50 text-pink-600 text-[9px] font-bold rounded-lg border border-pink-100 uppercase tracking-widest flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                                  Female Only
                               </span>
                            )}
                         </div>
                         <button className="bg-primary hover:bg-primary/90 text-white font-extrabold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-95 text-sm">
                            Join Trip
                         </button>
                      </div>
                   </div>
                </div>
              ))}

              <button className="w-full py-6 bg-white border border-slate-200 rounded-[2rem] text-slate-500 text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                 Show 15 more trips
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 z-50">
         <button className="bg-[#3abff8] hover:bg-[#2eaee8] text-white font-black py-4 px-8 rounded-full shadow-2xl shadow-primary/50 flex items-center gap-3 group transition-all transform active:scale-90">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </div>
            Post a Trip
         </button>
      </div>
    </div>
  );
};

export default TravelHub;
