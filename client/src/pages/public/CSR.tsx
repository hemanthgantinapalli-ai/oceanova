import React, { useState } from 'react';
import { CSRImpactCalculator } from '../../components/ui/CSRImpactCalculator';
import { Building2, ShieldCheck, Download, Send, CheckCircle2 } from 'lucide-react';

export const CSR: React.FC = () => {
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerName && partnerEmail && company) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Corporate Social Responsibility
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            CSR & ESG Blue Economy Partnerships
          </h1>
          <p className="text-sm text-gray-300">
            Sponsor workstreams, sponsor mangrove bio-shield restoration, or deploy solar marine mobility assets with verified CSR ESG impact reporting.
          </p>
        </div>

        {/* CSR Impact Calculator */}
        <CSRImpactCalculator />

        {/* Partnership Form & Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-cyan-400" /> Request Corporate CSR Partnership
            </h3>

            {submitted ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm rounded-2xl space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <div className="font-bold">Partnership Inquiry Submitted!</div>
                <div className="text-xs">Our CSR Executive Team will schedule an introductory call within 24 business hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-300 font-semibold block mb-1">Contact Executive Name</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 font-semibold block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 font-semibold block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-ocean-950 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit CSR Partnership Proposal Request
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">CSR Compliance Dossier</span>
              <h3 className="text-xl font-bold text-white mt-1">Download OceaNova CSR Partnership Framework</h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Detailed 80G tax exemption documents, Schedule VII CSR alignment checklist, independent auditor verification methodology, and past corporate partner impact case studies.
              </p>
            </div>

            <div className="space-y-2 text-xs text-gray-300 border-y border-gray-800 py-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MCA Schedule VII Item (iv) Environmental Sustainability
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Audit Trail with Geo-Tagged Photos & Satellite Verification
              </div>
            </div>

            <button
              onClick={() => alert("Downloading OceaNova CSR Partnership Prospectus PDF...")}
              className="w-full py-3 rounded-xl font-bold text-xs bg-ocean-900 border border-cyan-500/40 text-cyan-300 hover:bg-ocean-800 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download CSR Prospectus (PDF)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
