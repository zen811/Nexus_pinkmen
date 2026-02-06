
import React, { useState } from 'react';

interface FooterProps {
  openModal: (id: string, title: string, content: React.ReactNode) => void;
}

const Footer: React.FC<FooterProps> = ({ openModal }) => {
  const currentYear = new Date().getFullYear();

  const openInfoModal = (title: string, content: React.ReactNode) => {
    openModal('info', title, content);
  };

  const ContactUsContent = () => {
    const [submitted, setSubmitted] = useState(false);
    return (
      <div className="space-y-6">
        <p className="text-slate-600 leading-relaxed">
          Need immediate assistance? Reach us at <span className="font-bold text-primary">contact@nexus-campus.edu</span> or visit the Student Services hub in the Main Admin block.
        </p>
        
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Report a Bug or Feedback
          </h4>
          {!submitted ? (
            <div className="space-y-4">
              <textarea 
                className="w-full h-32 rounded-xl border-slate-200 focus:ring-primary/20 text-sm"
                placeholder="Describe the issue or feature request..."
              />
              <button 
                onClick={() => setSubmitted(true)}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all"
              >
                Submit Report
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-800">Report Received!</p>
              <p className="text-xs text-slate-500 mt-1">Our dev team will look into this immediately.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PrivacyPolicyContent = () => (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600 leading-relaxed">
        Your privacy is our priority. At Nexus, we are committed to protecting the personal information you share with us.
      </p>
      <ul className="text-sm text-slate-500 space-y-2 mt-4">
        <li><strong>Data Collection:</strong> We collect academic progress, dietary preferences for mess planning, and travel schedules for the carpool hub.</li>
        <li><strong>Encryption:</strong> All personal data is stored with AES-256 bit encryption and is only accessible by authorized campus staff.</li>
        <li><strong>No Third-Parties:</strong> We strictly do not sell or share student data with external marketers or entities without explicit legal warrants.</li>
      </ul>
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-400">
        Last Updated: October 2023
      </div>
    </div>
  );

  const TermsOfServiceContent = () => (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600 leading-relaxed">
        By accessing Nexus, you agree to comply with the following campus-wide digital standards.
      </p>
      <ul className="text-sm text-slate-500 space-y-2 mt-4">
        <li><strong>Account Integrity:</strong> You are responsible for all actions taken under your university credentials. Sharing logins is prohibited.</li>
        <li><strong>Exchange Hub Etiquette:</strong> Users must be truthful about skill swap offers and rental conditions. Scams will result in immediate suspension.</li>
        <li><strong>Emergency SOS:</strong> Misuse of the SOS emergency feature for non-emergencies is a punishable offense under university policy.</li>
      </ul>
    </div>
  );

  const CookiePolicyContent = () => (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600 leading-relaxed">
        We use cookies to ensure you have the best experience on our campus super app.
      </p>
      <ul className="text-sm text-slate-500 space-y-2 mt-4">
        <li><strong>Essential Cookies:</strong> Used for secure login sessions and to remember your current view state.</li>
        <li><strong>Functional Cookies:</strong> Remember preferences such as 'Veg Only' filters in the Mess or 'Co-ed' preferences in Travel.</li>
        <li><strong>No Tracking:</strong> Nexus does not use third-party tracking cookies or advertising pixels.</li>
      </ul>
    </div>
  );

  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-primary mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">N</span>
              </div>
              <h2 className="text-slate-900 text-lg font-extrabold tracking-tight">NEXUS</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering students with a unified campus experience. All your academic and campus life tools in one place.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button onClick={() => openInfoModal('Help Center', <p className="text-slate-600">Our Help Center is available 24/7 to assist with technical issues, academic queries, and campus navigation. Call 1800-CAMPUS-HELP for voice support.</p>)} className="hover:text-primary transition-colors">Help Center</button></li>
              <li><button onClick={() => openInfoModal('Contact Us', <ContactUsContent />)} className="hover:text-primary transition-colors">Contact Us</button></li>
              <li><button onClick={() => openInfoModal('Accessibility', <p className="text-slate-600">Nexus is committed to accessibility. We follow WCAG 2.1 guidelines to ensure everyone can use our platform. Use Alt+T for screen reader optimization.</p>)} className="hover:text-primary transition-colors">Accessibility</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button onClick={() => openInfoModal('Privacy Policy', <PrivacyPolicyContent />)} className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => openInfoModal('Terms of Service', <TermsOfServiceContent />)} className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button onClick={() => openInfoModal('Cookie Policy', <CookiePolicyContent />)} className="hover:text-primary transition-colors">Cookie Policy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4">System Status</h4>
            <div className="flex items-center gap-2 text-green-500 text-sm font-semibold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              All Systems Operational
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
          <p>© {currentYear} NEXUS CAMPUS SUPER APP. BUILT FOR STUDENTS.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
