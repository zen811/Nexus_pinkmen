
import React, { useState } from 'react';
import { Bolt, Schedule, LocationOn, LocalLibrary, Hub, RestaurantMenu, School, Notifications } from './Icons';

interface UtilityStatusProps {
  onBack: () => void;
  openModal: (id: string, title: string, content: React.ReactNode) => void;
}

const UtilityStatus: React.FC<UtilityStatusProps> = ({ onBack, openModal }) => {
  const [activeTab, setActiveTab] = useState<'Power' | 'Wi-Fi' | 'Water'>('Power');

  const handleReportIssue = () => {
    openModal('report_issue', 'Report Infrastructure Issue', (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bolt className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-900">Facing an issue?</h3>
          <p className="text-sm text-slate-600 leading-relaxed italic">"Please contact on the given details to report power failures, leaks, or connectivity drops."</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-4">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Emergency Hotline</p>
            <p className="text-lg font-black text-slate-900">+91 99887 76655</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
            <p className="text-lg font-black text-primary">infra.support@nexus.edu</p>
          </div>
        </div>
        <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all">CLOSE</button>
      </div>
    ));
  };

  const openSpotDetail = (spotName: string) => {
    let content: React.ReactNode;
    let title = spotName;

    if (spotName === 'Main Library') {
      content = (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Wi-Fi Signal</p>
              <p className="text-lg font-black text-slate-900">98% Strong</p>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Seats Available</p>
              <p className="text-lg font-black text-slate-900">42 / 150</p>
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 mb-4 uppercase tracking-tighter">Library Timings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Working Days</span>
                <span className="text-slate-900 font-bold">08:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Weekends</span>
                <span className="text-slate-900 font-bold">10:00 AM - 06:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (spotName === 'Admin Block') {
      content = (
        <div className="space-y-6">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Official Contact Details</h4>
              <div className="space-y-4">
                 <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Campus Address</p>
                    <p className="text-sm font-black text-slate-900">Building A, Ground Floor, North Gate Campus</p>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Telephone Number</p>
                    <p className="text-sm font-black text-primary">+91 11 2345 6789</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else if (spotName === 'Lab Complex') {
      content = (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
              <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Lab Slots</p>
              <p className="text-lg font-black text-slate-900">3 Available</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Specified Gear</p>
              <p className="text-sm font-black text-slate-900">ESD Kit Req.</p>
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Lab Timings</h4>
            <p className="text-sm font-black text-slate-900">Daily: 09:00 AM - 05:00 PM</p>
            <p className="text-[10px] text-slate-400 mt-1 italic">Extended slots available during project week.</p>
          </div>
        </div>
      );
    } else if (spotName === 'Central Dining') {
      content = (
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <h4 className="font-black text-slate-900 mb-4 uppercase tracking-tighter">Dining Hall Details</h4>
           <p className="text-sm text-slate-500 leading-relaxed mb-4">Backup generators active. Full ventilation and standard meal services operational.</p>
           <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400">Current Occupancy</span>
              <span className="font-black text-slate-900">High (Wait time: 5m)</span>
           </div>
        </div>
      );
    }

    if (content) openModal('spot_detail', title, content);
  };

  const functionalSpots = [
    { name: 'Main Library', status: '100% OPERATIONAL', icon: LocalLibrary, color: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Admin Block', status: '100% OPERATIONAL', icon: Hub, color: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Central Dining', status: 'GEN-SET ACTIVE', icon: RestaurantMenu, color: 'text-primary', bgColor: 'bg-blue-100' },
    { name: 'Lab Complex', status: '100% OPERATIONAL', icon: School, color: 'text-green-600', bgColor: 'bg-green-100' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 shadow-sm transition-all">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Power & Utility Status</h1>
              <p className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-2">
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                 Live campus infrastructure updates
              </p>
            </div>
          </div>
          <button onClick={handleReportIssue} className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm">
            Report Issue
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 mb-12 flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 shrink-0"><Bolt className="w-8 h-8" /></div>
           <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">POWER OUTAGE ONGOING</h2>
              <p className="text-slate-500 font-medium">Partial outage detected in North Campus. Maintenance teams are on-site.</p>
           </div>
        </div>

        <div>
           <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Where can you go right now?</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {functionalSpots.map(spot => (
                <div 
                  key={spot.name} 
                  onClick={() => openSpotDetail(spot.name)}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                >
                   <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 ${spot.bgColor} ${spot.color} rounded-2xl flex items-center justify-center`}><spot.icon className="w-7 h-7" /></div>
                      <div>
                         <h4 className="font-bold text-slate-900 leading-tight">{spot.name}</h4>
                         <span className={`text-[9px] font-black tracking-tighter ${spot.color}`}>{spot.status}</span>
                      </div>
                   </div>
                   <button className="w-full py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all">View Details</button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityStatus;
