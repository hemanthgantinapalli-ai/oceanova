import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WaveDivider } from '../ui/WaveDivider';
import { OceaNovaLogo } from '../common/OceaNovaLogo';
import { ShieldCheck, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#0A2540] text-white border-t border-[#147EA8]/20 pt-12 overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <WaveDivider flip={true} fill="#0A2540" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <OceaNovaLogo size="lg" />

          <p className="text-sm text-gray-200 leading-relaxed max-w-sm pt-2">
            India’s reference digital platform for the Blue Economy — driving climate technology, estuarine mangrove restoration, autonomous solar marine mobility, and coastal community resilience.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-[#38B7C9]">
            <ShieldCheck className="w-4 h-4 text-[#43A047]" />
            <span>Registered Section 8 Non-Profit • 80G Tax Exempted</span>
          </div>
        </div>

        {/* Col 2: Three Pillars */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#38B7C9] pl-2">
            Three Pillars
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li><Link to="/workstreams?pillar=SAHAJA" className="hover:text-[#38B7C9] transition-colors">SAHAJA — Renewable Energy</Link></li>
            <li><Link to="/workstreams?pillar=SHRAMA" className="hover:text-[#38B7C9] transition-colors">SHRAMA — Rural Empowerment</Link></li>
            <li><Link to="/workstreams?pillar=SPARSHA" className="hover:text-[#38B7C9] transition-colors">SPARSHA — Marine AI & STEM</Link></li>
            <li><Link to="/workstreams" className="hover:text-[#38B7C9] transition-colors">12 Workstreams Directory</Link></li>
            <li><Link to="/vessels" className="hover:text-[#38B7C9] transition-colors">Surya Boat 1.0 Digital Twin</Link></li>
          </ul>
        </div>

        {/* Col 3: Research & Impact */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#43A047] pl-2">
            Ecosystem
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li><Link to="/impact" className="hover:text-[#38B7C9] transition-colors">Live Impact Dashboard</Link></li>
            <li><Link to="/carbon" className="hover:text-[#38B7C9] transition-colors">Carbon Intelligence</Link></li>
            <li><Link to="/mangroves" className="hover:text-[#38B7C9] transition-colors">Mangrove Bio-Shields</Link></li>
            <li><Link to="/research" className="hover:text-[#38B7C9] transition-colors">Research Data Repository</Link></li>
            <li><Link to="/csr" className="hover:text-[#38B7C9] transition-colors">CSR Partnership Portal</Link></li>
            <li><Link to="/gisela" className="hover:text-[#38B7C9] transition-colors">GISELA Social Impact</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-2 border-[#147EA8] pl-2">
            Blue Intelligence Dispatch
          </h4>
          <p className="text-xs text-gray-300">
            Subscribe for monthly scientific publications, mangrove restoration updates, and carbon report releases.
          </p>

          {subscribed ? (
            <div className="p-3 bg-[#43A047]/20 border border-[#43A047]/40 rounded-xl text-xs text-[#D8EEDB]">
              ✓ Subscribed to Blue Intelligence Dispatch!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter organization email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#071A2E] border border-gray-600 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#38B7C9]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#147EA8] hover:bg-[#38B7C9] text-white rounded-lg font-bold text-xs flex items-center transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#071A2E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300 gap-4">
          <div>
            © 2026 OceaNova Blue Economy Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Governance</Link>
            <Link to="/" className="hover:text-white transition-colors">WCAG 2.1 AA Accessibility</Link>
            <Link to="/admin" className="text-[#38B7C9] font-semibold hover:underline">SaaS Operations Login</Link>
          </div>
        </div>
      </div>

      {/* Subtle animated ocean wave bottom SVG */}
      <div className="w-full overflow-hidden leading-none opacity-30">
        <WaveDivider fill="#38B7C9" />
      </div>
    </footer>
  );
};

