
import React, { useState, useMemo } from 'react';
import { School, Schedule, Star, LocationOn, ChevronRight, Notifications, AutoAwesome, Monitoring } from './Icons';

interface AcademicCockpitProps {
  onBack: () => void;
  openModal: (id: string, title: string, content: React.ReactNode) => void;
}

interface SubjectRecord {
  id: string;
  name: string;
  credits: number;
  grade: number;
}

const AcademicCockpit: React.FC<AcademicCockpitProps> = ({ onBack, openModal }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorRows, setCalculatorRows] = useState<SubjectRecord[]>([
    { id: '1', name: 'Computer Architecture', credits: 4, grade: 9 },
    { id: '2', name: 'Database Systems', credits: 3, grade: 10 },
    { id: '3', name: 'Software Testing', credits: 3, grade: 8 },
  ]);

  const calculatedCGPA = useMemo(() => {
    const totalCredits = calculatorRows.reduce((sum, row) => sum + (row.credits || 0), 0);
    const weightedSum = calculatorRows.reduce((sum, row) => sum + ((row.credits || 0) * (row.grade || 0)), 0);
    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';
  }, [calculatorRows]);

  const addRow = () => {
    setCalculatorRows([...calculatorRows, { id: Date.now().toString(), name: '', credits: 0, grade: 0 }]);
  };

  const removeRow = (id: string) => {
    setCalculatorRows(calculatorRows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: keyof SubjectRecord, value: string | number) => {
    setCalculatorRows(calculatorRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleJoinVirtualRoom = () => {
    openModal('virtual_room', 'Join Virtual Lecture', (
      <div className="space-y-8 text-center">
        <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 inline-block mx-auto">
          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black text-slate-900">Choose Your Platform</h3>
          <p className="text-sm text-slate-500">You are about to join: <strong>Intro to UX Design</strong></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href="https://zoom.us" 
            target="_blank" 
            className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
          >
             <div className="w-12 h-12 bg-[#2D8CFF]/10 text-[#2D8CFF] rounded-2xl flex items-center justify-center font-black">Z</div>
             <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Open Zoom</span>
          </a>
          <a 
            href="https://meet.google.com" 
            target="_blank" 
            className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
          >
             <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center font-black">G</div>
             <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Open Google Meet</span>
          </a>
        </div>
      </div>
    ));
  };

  const handleViewSyllabus = () => {
    openModal('course_syllabus', 'Intro to UX Design Syllabus', (
      <div className="prose prose-slate max-w-none">
        <div className="flex justify-between items-center mb-6">
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Spring 2024</span>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Code: UX401</span>
        </div>
        <h4 className="font-black text-slate-900">1. Course Description</h4>
        <p className="text-sm text-slate-600 leading-relaxed">This course covers fundamentals of user research, wireframing, and interactive prototyping using Figma. Students will complete a real-world term project.</p>
        
        <h4 className="font-black text-slate-900 mt-6">2. Learning Modules</h4>
        <ul className="text-sm text-slate-600 space-y-2">
           <li><strong>Week 1-3:</strong> User Psychology & Empathy Mapping</li>
           <li><strong>Week 4-6:</strong> Information Architecture & User Flows</li>
           <li><strong>Week 7-10:</strong> Visual Design Principles & Accessibility</li>
           <li><strong>Week 11-14:</strong> Prototyping & Usability Testing</li>
        </ul>

        <h4 className="font-black text-slate-900 mt-6">3. Grading Policy</h4>
        <p className="text-sm text-slate-600">Midterm: 30%, Final Project: 50%, Participation: 20%</p>
        
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
           <button className="text-xs font-black text-primary uppercase tracking-widest">Download PDF Version</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          BACK TO DASHBOARD
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Academic Cockpit</h1>
            <p className="text-slate-500 font-medium tracking-tight">University Performance Analytics & Planning</p>
          </div>
          <button 
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            <Monitoring className="w-4 h-4" />
            {showCalculator ? 'Close CGPA Tool' : 'Calculate CGPA'}
          </button>
        </div>

        {/* CGPA Calculator Feature */}
        {showCalculator && (
          <div className="mb-12 bg-white rounded-[2.5rem] p-10 border-2 border-primary/20 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Interactive CGPA Calculator</h3>
                <p className="text-sm text-slate-500 mt-1">Estimating your Semester Grade Point Average on a 10.0 scale.</p>
              </div>
              <div className="bg-primary/5 px-10 py-6 rounded-3xl border border-primary/10 text-center">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Live CGPA Estimate</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter">{calculatedCGPA}</span>
                  <span className="text-xl text-slate-300 font-bold ml-1">/ 10.0</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex gap-4 px-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <div className="flex-1">Subject Name</div>
               <div className="w-32">Credits (Weight)</div>
               <div className="w-32">Grade (0 - 10)</div>
               <div className="w-10"></div>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8 scrollbar-thin">
              {calculatorRows.map((row) => (
                <div key={row.id} className="flex flex-col sm:flex-row gap-4 items-end sm:items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                  <div className="flex-1 w-full">
                    <label className="sm:hidden text-[10px] font-bold text-slate-400 mb-1 block">Subject Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Data Science"
                      className="w-full bg-white border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-primary focus:border-primary transition-all"
                      value={row.name}
                      onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="sm:hidden text-[10px] font-bold text-slate-400 mb-1 block">Credits</label>
                    <input 
                      type="number" 
                      placeholder="Credits"
                      className="w-full bg-white border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-primary focus:border-primary"
                      value={row.credits || ''}
                      onChange={(e) => updateRow(row.id, 'credits', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="sm:hidden text-[10px] font-bold text-slate-400 mb-1 block">Grade Point</label>
                    <input 
                      type="number" 
                      placeholder="0-10"
                      max="10"
                      min="0"
                      className="w-full bg-white border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-primary focus:border-primary"
                      value={row.grade || ''}
                      onChange={(e) => updateRow(row.id, 'grade', parseFloat(e.target.value))}
                    />
                  </div>
                  <button onClick={() => removeRow(row.id)} className="p-2.5 text-slate-300 hover:text-red-500 rounded-lg transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-8">
              <button onClick={addRow} className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-200 transition-all border border-slate-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Add Subject Row
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Next Class Hero */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-64 md:h-auto relative">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Workspace" />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">CURRENT CLASS</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Intro to UX Design</h2>
              <div className="flex gap-4">
                <button onClick={handleJoinVirtualRoom} className="flex-1 py-4 bg-primary text-white font-black text-sm rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                  Join Virtual Room
                </button>
                <button onClick={handleViewSyllabus} className="flex-1 py-4 bg-slate-50 text-slate-600 font-black text-sm rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                  Course Syllabus
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Overall CGPA</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">9.12</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCockpit;
