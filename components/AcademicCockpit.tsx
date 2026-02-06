
import React from 'react';
import { School, Schedule, Star, LocationOn, ChevronRight, Notifications, AutoAwesome } from './Icons';

interface AcademicCockpitProps {
  onBack: () => void;
}

const AcademicCockpit: React.FC<AcademicCockpitProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          BACK TO HUB
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Academic Cockpit</h1>
            <p className="text-slate-500 font-medium">Your academic command center for Spring 2024</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-primary font-bold text-sm rounded-xl hover:bg-blue-100 transition-all border border-blue-100">
            <Schedule className="w-4 h-4" />
            View Full Schedule
          </button>
        </div>

        {/* Hero & GPA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Next Class Hero */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600" 
                className="w-full h-full object-cover" 
                alt="Workspace" 
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-primary/20">
                  LIVE NOW
                </span>
              </div>
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">CURRENT / NEXT CLASS</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Intro to UX Design</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <Schedule className="w-5 h-5 text-primary" />
                  10:00 - 11:30 AM
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <LocationOn className="w-5 h-5 text-primary" />
                  Room 402
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img src="https://i.pravatar.cc/100?u=sarah" alt="Prof" />
                  </div>
                  Dr. Sarah Jenkins
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-primary text-white font-black text-sm rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform active:scale-95">
                  Join Virtual Room
                </button>
                <button className="flex-1 py-4 bg-slate-50 text-slate-600 font-black text-sm rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                  Course Syllabus
                </button>
              </div>
            </div>
          </div>

          {/* GPA Stats */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current CGPA</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">3.85</span>
                </div>
                <p className="text-[10px] font-bold text-green-500 tracking-tight">↗ +0.05 this term</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary" strokeDasharray="96, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black text-slate-900">96%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-8 right-8 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Semester GPA</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">3.92</h3>
              <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                GPA Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Timeline & Assignments Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-12">
            
            {/* Today's Timeline */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <Schedule className="w-6 h-6 text-primary" />
                  Today's Timeline
                </h3>
                <span className="text-xs font-bold text-slate-400">Friday, Oct 24</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { time: '08:00 - 09:30', title: 'Web Dev Lab', sub: 'Bldg C, R21', active: false },
                  { time: '10:00 - 11:30', title: 'Intro to UX Design', sub: 'Room 402', active: true },
                  { time: '13:00 - 14:30', title: 'Cognitive Psychology', sub: 'Hall B', active: false },
                ].map((item, i) => (
                  <div key={i} className={`min-w-[280px] p-6 rounded-[2rem] border transition-all ${item.active ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-white border-slate-100 text-slate-900'}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${item.active ? 'text-white/70' : 'text-slate-400'}`}>{item.time}</p>
                    <h4 className="font-black text-lg mb-1">{item.title}</h4>
                    <p className={`text-xs font-medium ${item.active ? 'text-white/80' : 'text-slate-500'}`}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Grid */}
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-8">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                Assignments
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Upcoming */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UPCOMING</p>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">2 Items</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Final Prototype', sub: 'UX Design', status: 'DUE IN 2 DAYS', active: true, avatars: 2 },
                      { title: 'User Research Report', sub: 'Psychology', status: 'DUE OCT 29', active: false },
                    ].map((a, i) => (
                      <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tight">{a.sub}</p>
                            <h4 className="font-black text-slate-900 group-hover:text-primary transition-colors">{a.title}</h4>
                          </div>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black tracking-widest ${a.active ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-400'}`}>
                            {a.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">Submit high-fidelity interactive Figma file with user flow.</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <div className="flex -space-x-2">
                             {[...Array(a.avatars || 1)].map((_, j) => (
                               <div key={j} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200"></div>
                             ))}
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-primary transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submitted */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SUBMITTED</p>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">12 Items</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Wireframing Basics', sub: 'Visual Design', grade: 'A (94%)' },
                      { title: 'Component Library Quiz', sub: 'Design Systems', grade: 'B+ (88%)' },
                    ].map((a, i) => (
                      <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tight">{a.sub}</p>
                            <h4 className="font-black text-slate-900">{a.title}</h4>
                          </div>
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-400 uppercase tracking-widest">Grade</span>
                          <span className="font-black text-slate-900">{a.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Academic Insights */}
          <aside className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-10">
                  <MonitoringIcon className="w-6 h-6 text-primary" />
                  Academic Insights
               </h3>

               <div className="space-y-10">
                  {/* Credit Completion */}
                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">CREDIT COMPLETION</span>
                        <span className="text-xs font-black text-slate-900">85 / 120</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                        <div className="bg-primary h-full rounded-full" style={{ width: '70.8%' }}></div>
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium">On track to graduate in May 2025</p>
                  </div>

                  {/* Total Assignments */}
                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">TOTAL ASSIGNMENTS</span>
                        <span className="text-xs font-black text-slate-900">14 / 20</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '70%' }}></div>
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium italic">2 assignments currently in draft mode</p>
                  </div>

                  {/* Weekly Goal */}
                  <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">WEEKLY GOAL</p>
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-blue-100/50">
                           <Schedule className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-xl font-black text-slate-900">18 / 25 Hours</p>
                           <p className="text-[10px] text-slate-400 font-medium">Studied 4 hours today</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Recommendation Card */}
            <div className="bg-gradient-to-br from-primary to-[#2eaee8] rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-primary/30">
               <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-125 transition-transform duration-700">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
               </div>
               <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <h4 className="text-xl font-black mb-3 leading-tight pr-10">Recommended for your UX Project</h4>
                  <p className="text-white/80 text-xs font-medium mb-8 leading-relaxed italic">"Nielsen's 10 Usability Heuristics" is trending for your class.</p>
                  <button className="w-full py-3 bg-white text-primary font-black text-xs rounded-xl hover:bg-slate-50 transition-all shadow-lg shadow-black/5">
                     Read Now
                  </button>
               </div>
            </div>
          </aside>
        </div>

        {/* Footer info for Academics view */}
        <div className="mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
           <p>© 2024 NEXUS ACADEMIC SYSTEMS. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <button className="hover:text-primary">Privacy Policy</button>
              <button className="hover:text-primary">Campus Map</button>
              <button className="hover:text-primary">Support Hub</button>
           </div>
        </div>

      </div>
    </div>
  );
};

const MonitoringIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);

export default AcademicCockpit;
