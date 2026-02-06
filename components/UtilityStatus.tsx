
import React, { useState } from 'react';
import { Bolt, Schedule, LocationOn, LocalLibrary, Hub, RestaurantMenu, School, Notifications } from './Icons';

interface UtilityStatusProps {
  onBack: () => void;
}

const UtilityStatus: React.FC<UtilityStatusProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'Power' | 'Wi-Fi' | 'Water'>('Power');

  const affectedAreas = [
    {
      id: 1,
      name: 'Engineering Block A',
      status: 'NO POWER',
      details: 'Backup generator failed at 10:15 AM. Elevators currently disabled.',
      restoration: '12:45 PM (2h 30m)',
      type: 'critical'
    },
    {
      id: 2,
      name: 'West Dormitory',
      status: 'NO POWER',
      details: 'Total blackout reported in Wings 1 & 3. Emergency lighting active.',
      restoration: '01:15 PM (3h 00m)',
      type: 'critical'
    },
    {
      id: 3,
      name: 'Faculty Housing',
      status: 'UNSTABLE',
      details: 'Voltage drops reported. Avoid using high-wattage appliances.',
      restoration: 'Under Review',
      type: 'unstable'
    }
  ];

  const functionalSpots = [
    {
      name: 'Main Library',
      status: '100% OPERATIONAL',
      icon: LocalLibrary,
      wifi: 'Excellent',
      occupancy: '65% Full',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Admin Block',
      status: '100% OPERATIONAL',
      icon: Hub,
      wifi: 'Excellent',
      ports: 'Available',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Central Dining',
      status: 'GEN-SET ACTIVE',
      icon: RestaurantMenu,
      ac: 'Active',
      meals: 'Serving',
      color: 'text-primary',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Lab Complex',
      status: '100% OPERATIONAL',
      icon: School,
      gear: 'Protected',
      slots: 'Limited',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Power & Utility Status</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <p className="text-sm font-medium text-slate-400">Live campus infrastructure updates</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex p-1 bg-slate-200/50 rounded-xl">
                {['Campus View', 'Detailed Logs'].map(t => (
                  <button 
                    key={t}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${t === 'Campus View' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
             <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm">
                Report Issue
             </button>
          </div>
        </div>

        {/* Global Alert Banner */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 mb-12 flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 shrink-0">
              <Bolt className="w-8 h-8" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">POWER OUTAGE ONGOING</h2>
                 <span className="px-3 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase border border-red-100 inline-block w-fit mx-auto md:mx-0">High Priority</span>
              </div>
              <p className="text-slate-500 font-medium">Partial outage detected in North Campus & Engineering Blocks. Maintenance teams are on-site.</p>
           </div>
           <div className="text-center md:text-right shrink-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Updated</p>
              <p className="text-xl font-black text-slate-900">2 minutes ago</p>
           </div>
        </div>

        {/* Map & Affected Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          
          {/* Interactive Map Section */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Interactive Campus Map</h3>
                <div className="flex gap-2">
                   {[
                     { id: 'Power', icon: Bolt },
                     { id: 'Wi-Fi', icon: Notifications },
                     { id: 'Water', icon: RestaurantMenu }
                   ].map(tab => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as any)}
                       className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${activeTab === tab.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border-slate-100 hover:border-primary/30'}`}
                     >
                        <tab.icon className="w-4 h-4" />
                        {tab.id}
                     </button>
                   ))}
                </div>
             </div>
             
             {/* Mock Map View */}
             <div className="bg-slate-200/50 h-[450px] rounded-[3rem] relative overflow-hidden border border-slate-200 group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759df9a13?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 mix-blend-multiply"></div>
                
                {/* Outage Zone Overlays */}
                <div className="absolute top-1/4 left-1/4 w-40 h-32 bg-red-500/20 border-2 border-red-500 rounded-3xl backdrop-blur-[2px] flex items-center justify-center p-4">
                   <p className="text-red-700 font-black text-xs text-center uppercase leading-tight">North Zone<br/><span className="text-[8px] font-bold">OUTAGE</span></p>
                </div>

                <div className="absolute top-1/2 left-1/2 w-48 h-32 bg-orange-500/20 border-2 border-orange-500 rounded-3xl backdrop-blur-[2px] flex items-center justify-center p-4">
                   <p className="text-orange-700 font-black text-xs text-center uppercase leading-tight">Main Quad<br/>Dorms<br/><span className="text-[8px] font-bold">FLUCTUATING</span></p>
                </div>

                <div className="absolute bottom-12 right-12 w-32 h-24 bg-green-500/20 border-2 border-green-500 rounded-3xl backdrop-blur-[2px] flex items-center justify-center p-4">
                   <p className="text-green-700 font-black text-xs text-center uppercase leading-tight">Engineering<br/><span className="text-[8px] font-bold">STABLE</span></p>
                </div>

                {/* Legend */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl space-y-2">
                   {[
                     { label: 'Outage', color: 'bg-red-500' },
                     { label: 'Fluctuating', color: 'bg-orange-500' },
                     { label: 'Stable', color: 'bg-green-500' }
                   ].map(l => (
                     <div key={l.label} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${l.color}`}></div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{l.label}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Affected Areas Sidebar */}
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 tracking-tight">Affected Areas</h3>
             <div className="space-y-4">
                {affectedAreas.map(area => (
                  <div key={area.id} className={`p-6 bg-white rounded-3xl border-l-4 shadow-sm ${area.type === 'critical' ? 'border-l-red-500 border-slate-100' : 'border-l-orange-500 border-slate-100'}`}>
                     <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-slate-900">{area.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest ${area.type === 'critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                           {area.status}
                        </span>
                     </div>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">{area.details}</p>
                     <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-300 uppercase">Est. Restoration</span>
                        <span className="text-[10px] font-black text-slate-900">{area.restoration}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Safe Zones / Functional Facilities */}
        <div>
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Where can you go right now?</h3>
                 <p className="text-sm text-slate-400 font-medium mt-1">Locations with functional power and backup generators.</p>
              </div>
              <button className="text-sm font-bold text-primary hover:underline">See all safe zones</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {functionalSpots.map(spot => (
                <div key={spot.name} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                   <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 ${spot.bgColor} ${spot.color} rounded-2xl flex items-center justify-center`}>
                         <spot.icon className="w-7 h-7" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 leading-tight">{spot.name}</h4>
                         <span className={`text-[9px] font-black tracking-tighter ${spot.color}`}>{spot.status}</span>
                      </div>
                   </div>

                   <div className="space-y-3 mb-8">
                      {spot.wifi && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">Wi-Fi Signal</span>
                           <span className="text-slate-900 font-black">{spot.wifi}</span>
                        </div>
                      )}
                      {spot.occupancy && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">Current Occupancy</span>
                           <span className="text-slate-900 font-black">{spot.occupancy}</span>
                        </div>
                      )}
                      {spot.ports && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">Charging Ports</span>
                           <span className="text-slate-900 font-black">{spot.ports}</span>
                        </div>
                      )}
                      {spot.ac && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">AC / Ventilation</span>
                           <span className="text-slate-900 font-black">{spot.ac}</span>
                        </div>
                      )}
                      {spot.meals && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">Hot Meals</span>
                           <span className="text-slate-900 font-black">{spot.meals}</span>
                        </div>
                      )}
                      {spot.gear && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">Specialized Gear</span>
                           <span className="text-slate-900 font-black">{spot.gear}</span>
                        </div>
                      )}
                      {spot.slots && (
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">Lab Slots</span>
                           <span className="text-slate-900 font-black">{spot.slots}</span>
                        </div>
                      )}
                   </div>

                   <button className="w-full py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all border border-slate-100">
                      View Facilities
                   </button>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* Mini-Footer for Infra Page */}
      <div className="mt-24 py-12 border-t border-slate-100 bg-white">
         <div className="max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-black italic">N</div>
               <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">Nexus Campus</span>
            </div>
            <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
               <button className="hover:text-primary transition-colors">System Health</button>
               <button className="hover:text-primary transition-colors">Privacy Policy</button>
               <button className="hover:text-primary transition-colors">Contact Support</button>
            </div>
            <p className="text-[10px] text-slate-300 font-medium">© 2024 Nexus University Infrastructure Team</p>
         </div>
      </div>
    </div>
  );
};

export default UtilityStatus;
