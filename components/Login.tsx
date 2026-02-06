
import React, { useState } from 'react';
import { Hub } from './Icons';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Hub className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Log in to your Nexus campus account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">University Email</label>
            <input 
              type="email" 
              required
              className="w-full rounded-2xl border-slate-200 focus:border-primary focus:ring focus:ring-primary/20 py-3 px-5 transition-all outline-none" 
              placeholder="s.johnson@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot password?</button>
            </div>
            <input 
              type="password" 
              required
              className="w-full rounded-2xl border-slate-200 focus:border-primary focus:ring focus:ring-primary/20 py-3 px-5 transition-all outline-none" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 px-1">
            <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary" />
            <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer">Keep me logged in on this device</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]"
          >
            Sign In to Nexus
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-slate-400">
            Don't have an account? <button className="text-primary font-bold hover:underline">Register now</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
