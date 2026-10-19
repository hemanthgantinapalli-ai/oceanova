import React, { useEffect, useState } from 'react';
import { fetchCarbonMetrics } from '../../services/api';
import { ShieldCheck, Download, AlertCircle, FileText, CheckCircle } from 'lucide-react';

export const Carbon: React.FC = () => {
  const [carbonData, setCarbonData] = useState<any>(null);

  useEffect(() => {
    fetchCarbonMetrics().then(setCarbonData).catch(console.error);
  }, []);

  const total = carbonData?.totalAvoided || 3300;
  const verified = carbonData?.verified || 1450;
  const pending = carbonData?.pending || 930;
  const projected = carbonData?.projected || 920;

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Carbon Intelligence Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
            Blue Carbon Sequestration & Decarbonization
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Independent drone LIDAR, sediment core sampling, and telemetry-verified blue carbon credits across Andhra Pradesh estuarine ecosystems.
          </p>
        </div>

        {/* Verification Status Banner */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400" />
            <span>Transparency Standard: All projected & pending credits are clearly marked. Verified credits undergo third-party auditor validation.</span>
          </div>
          <span className="font-bold text-white bg-ocean-900 px-3 py-1 rounded-full border border-gray-700">
            Demonstration Data
          </span>
        </div>

        {/* Carbon Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30">
            <div className="text-xs text-gray-400 font-medium">Total Avoided / Sequestered</div>
            <div className="text-4xl font-black text-white mt-2">{total.toLocaleString()} <span className="text-lg text-cyan-400">tCO2e</span></div>
            <div className="text-xs text-cyan-300 mt-2">Cumulative Annual Reduction</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30">
            <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Verified Sequestration
            </div>
            <div className="text-4xl font-black text-emerald-400 mt-2">{verified.toLocaleString()} <span className="text-lg text-emerald-300">tCO2e</span></div>
            <div className="text-xs text-emerald-300 mt-2">Sediment Core & Drone Audited</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-yellow-500/30">
            <div className="text-xs text-gray-400 font-medium">Pending Audit</div>
            <div className="text-4xl font-black text-yellow-400 mt-2">{pending.toLocaleString()} <span className="text-lg text-yellow-300">tCO2e</span></div>
            <div className="text-xs text-yellow-300 mt-2">Currently Under Audit Cycle</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-blue-500/30">
            <div className="text-xs text-gray-400 font-medium">Projected Sequestration</div>
            <div className="text-4xl font-black text-blue-400 mt-2">{projected.toLocaleString()} <span className="text-lg text-blue-300">tCO2e</span></div>
            <div className="text-xs text-blue-300 mt-2">2026 Sapling Maturity Target</div>
          </div>
        </div>

        {/* Methodology & Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-cyan-500/20 space-y-4">
            <h3 className="text-xl font-bold text-white">Sequestration Methodology</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              OceaNova utilizes a dual-tier accounting methodology combining VCS (Verified Carbon Standard) VM0033 methodology for tidal wetland restoration with IoT buoy emissions telemetry. Sediment core samples are collected at 30cm and 100cm depths to quantify organic carbon density (SOC).
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 bg-ocean-900 rounded-xl border border-gray-800">
                <div className="font-bold text-white mb-1">Aboveground Biomass (AGB)</div>
                <div className="text-gray-400">Measured via multispectral LiDAR drone canopy height models.</div>
              </div>
              <div className="p-4 bg-ocean-900 rounded-xl border border-gray-800">
                <div className="font-bold text-white mb-1">Soil Organic Carbon (SOC)</div>
                <div className="text-gray-400">Elemental CHN analyzer core laboratory testing.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 glass-panel p-8 rounded-3xl border border-cyan-500/20 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" /> Audit Reports
              </h3>
              <p className="text-xs text-gray-400 mt-2">
                Download the 2026 Annual Blue Carbon Accounting & Verification PDF Dossier.
              </p>
            </div>
            <button
              onClick={() => alert("Downloading OceaNova 2026 Carbon Report PDF...")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-ocean-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Carbon Report PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
