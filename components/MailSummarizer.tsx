
import React, { useState } from 'react';
import { AutoAwesome, Schedule, ChevronRight, Notifications, Star } from './Icons';

interface MailSummarizerProps {
  onBack: () => void;
}

const MailSummarizer: React.FC<MailSummarizerProps> = ({ onBack }) => {
  const [inputText, setInputText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = () => {
    if (!inputText.trim()) return;
    setIsSummarizing(true);
    // Simulate API delay
    setTimeout(() => setIsSummarizing(false), 1500);
  };

  const recentSummaries = [
    { title: 'Intramural Soccer Schedule', meta: 'Processed 2 hours ago • Action: 1', icon: '⚽', color: 'bg-green-100' },
    { title: 'Financial Aid: FAFSA Update', meta: 'Processed yesterday • Actions: 3', icon: '💵', color: 'bg-purple-100' },
    { title: 'Library: Overdue Book Notice', meta: 'Processed 5 hours ago • Action: 1', icon: '📚', color: 'bg-orange-100' },
    { title: 'Internship Opportunity: Google', meta: 'Processed 8 hours ago • Actions: 2', icon: '🚀', color: 'bg-blue-100' },
    { title: 'Security Alert: North Gate', meta: 'Processed 1 day ago • Action: 0', icon: '🛡️', color: 'bg-red-100' },
    { title: 'Hackathon 2024 Registration', meta: 'Processed 2 days ago • Actions: 1', icon: '💻', color: 'bg-indigo-100' }
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

        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">AI Mail Summarizer</h1>
          <p className="text-slate-500 font-medium">Turn long college emails into clear actions</p>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 mb-12">
          <textarea 
            className="w-full h-48 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 p-6 text-slate-700 placeholder:text-slate-400 resize-none transition-all"
            placeholder="Paste your long professor email, club announcement, or department update here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supports up to 5,000 characters</span>
            <button 
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="flex items-center gap-3 bg-[#3abff8] hover:bg-[#2eaee8] text-white font-extrabold py-3.5 px-8 rounded-2xl shadow-lg shadow-[#3abff8]/30 transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {isSummarizing ? (
                <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
              ) : (
                <AutoAwesome className="w-5 h-5" />
              )}
              {isSummarizing ? 'Analyzing...' : 'Summarize with AI'}
            </button>
          </div>
        </div>

        {/* Main Summary Display */}
        <div className="space-y-10">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Main Summary</h2>
          
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">CS 401: Final Project Guidelines & Lab Logistics</h3>
                <p className="text-xs font-bold text-slate-400">From: Prof. Sarah Jenkins • Received: Oct 24, 2:14 PM</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase border border-blue-100">Academic</span>
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase border border-red-100">High Priority</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              The professor has released the finalized requirements for the CS 401 term project. The primary focus is on implementing a distributed consensus algorithm. You must submit your group selection by Wednesday, and the initial architectural draft is due next Monday. Lab attendance this Friday is mandatory for a live peer-review session.
            </p>

            {/* Deadline Box */}
            <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100 flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Schedule className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Main Deadline</p>
                <p className="text-lg font-black text-slate-900">Friday, Nov 1st @ 11:59 PM</p>
              </div>
            </div>

            {/* Required Actions */}
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Required Actions</h4>
              <div className="space-y-4">
                {[
                  { text: 'Confirm project group members via the Canvas survey by Wednesday.', checked: true },
                  { text: "Prepare a 5-slide architectural draft for Friday's peer review.", checked: false },
                  { text: 'Book a slot for the mandatory T.A. check-in next Tuesday.', checked: false },
                ].map((action, i) => (
                  <label key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked={action.checked} className="w-5 h-5 rounded text-primary border-slate-300 focus:ring-primary/20" />
                    <span className={`text-sm font-medium ${action.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{action.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-50">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                Copy Summary
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-primary font-bold text-sm rounded-xl hover:bg-blue-100 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Add to Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Recent Summaries */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Summaries</h2>
            <button className="text-xs font-bold text-primary hover:underline">View History</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentSummaries.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all cursor-pointer group">
                <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center text-2xl`}>{s.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{s.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{s.meta}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MailSummarizer;
