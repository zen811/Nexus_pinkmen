
import React from 'react';
import { Hub, Schedule, LocationOn, ChevronRight, Bolt, School, RestaurantMenu } from './Icons';

interface ServicesPortalProps {
  onBack: () => void;
}

const ServicesPortal: React.FC<ServicesPortalProps> = ({ onBack }) => {
  const contacts = [
    { name: 'Chief Warden', role: 'General Admin', phone: '+91 98765-43210', email: 'chief.warden@nexus.edu', img: 'https://i.pravatar.cc/150?u=warden1' },
    { name: 'Dr. Ramesh Kumar', role: 'Hostel Warden (Boys)', phone: '+91 98765-43211', email: 'rkhostel@nexus.edu', img: 'https://i.pravatar.cc/150?u=warden2' },
    { name: 'Mrs. Anjali Sharma', role: 'Hostel Warden (Girls)', phone: '+91 98765-43212', email: 'asharma@nexus.edu', img: 'https://i.pravatar.cc/150?u=warden3' },
    { name: 'IT Support Desk', role: 'Tech Assistance', phone: 'Ext: 404', email: 'helpdesk@nexus.edu', img: 'https://i.pravatar.cc/150?u=tech' },
    { name: 'Campus Security', role: '24/7 Emergency', phone: '100 / 112', email: 'security@nexus.edu', img: 'https://i.pravatar.cc/150?u=sec' },
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

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Campus Services Directory</h1>
            <p className="text-slate-500 font-medium">Quick access to essential campus contacts and support staff.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Directory */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Key Contacts
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts.map((contact, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-5">
                   <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-50">
                      <img src={contact.img} alt={contact.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{contact.role}</p>
                      <h4 className="font-bold text-slate-900 truncate">{contact.name}</h4>
                      <div className="mt-2 space-y-1">
                         <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {contact.phone}
                         </div>
                      </div>
                   </div>
                   <button className="p-2.5 bg-slate-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support Links */}
          <aside className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Support Channels</h3>
            
            <div className="space-y-4">
              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform">
                    <Bolt className="w-24 h-24" />
                 </div>
                 <h4 className="font-black text-slate-900 mb-2">Technical Support</h4>
                 <p className="text-xs text-slate-500 mb-6 font-medium">System issues, login problems, or WiFi connectivity reports.</p>
                 <button className="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl hover:shadow-lg transition-all">Open Ticket</button>
              </div>

              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <h4 className="font-black text-slate-900 mb-2">Counseling Hub</h4>
                 <p className="text-xs text-slate-500 mb-6 font-medium">Confidential support for mental health and student well-being.</p>
                 <button className="w-full py-3 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all">Book Session</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServicesPortal;
