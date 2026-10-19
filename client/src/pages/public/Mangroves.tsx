import React, { useEffect, useState } from 'react';
import { fetchMangroveSites } from '../../services/api';
import { MangroveSite } from '../../types';
import { MangroveMap } from '../../components/maps/MangroveMap';
import { BeforeAfterSlider } from '../../components/ui/BeforeAfterSlider';
import { Trees, CheckCircle2, Calendar, MapPin, Users } from 'lucide-react';

export const Mangroves: React.FC = () => {
  const [sites, setSites] = useState<MangroveSite[]>([]);

  useEffect(() => {
    fetchMangroveSites().then(setSites).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Ecosystem Restoration Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
            Estuarine Mangrove Bio-Shield Restoration
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Interactive geospatial catalog of native Avicennia marina and Rhizophora mucronata mangrove bio-barriers along Godavari and Krishna deltaic estuaries.
          </p>
        </div>

        {/* Leaflet Map */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" /> Active Restoration Site Map
          </h3>
          <MangroveMap sites={sites} />
        </div>

        {/* Restoration Sites List */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Trees className="w-5 h-5 text-emerald-400" /> Restoration Site Dossiers
          </h3>

          <div className="grid grid-cols-1 gap-10">
            {sites.map((site) => (
              <div key={site._id} className="glass-panel p-8 rounded-3xl border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {site.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      District: {site.district}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{site.siteName}</h3>

                  <div className="grid grid-cols-3 gap-3 text-xs text-gray-300">
                    <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
                      <div className="text-gray-500">Area</div>
                      <div className="text-lg font-bold text-white mt-0.5">{site.hectares} Ha</div>
                    </div>
                    <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
                      <div className="text-gray-500">Survival</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">{site.survivalRatePercent}%</div>
                    </div>
                    <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
                      <div className="text-gray-500">Volunteers</div>
                      <div className="text-lg font-bold text-cyan-400 mt-0.5">{site.volunteersCount}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Planted Species</h4>
                    <div className="flex flex-wrap gap-2">
                      {site.species.map((s, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-ocean-900 border border-gray-700 text-cyan-300 italic">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Site Progress Timeline</h4>
                    <div className="space-y-2">
                      {site.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className={`w-4 h-4 ${step.status === 'completed' ? 'text-emerald-400' : 'text-gray-500'}`} />
                          <span className="text-gray-300">{step.step}</span>
                          <span className="text-gray-500 ml-auto">{step.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-center">
                  <BeforeAfterSlider
                    beforeImage={site.beforeImageUrl}
                    afterImage={site.afterImageUrl}
                    beforeLabel="Baseline"
                    afterLabel="Restored Bio-Shield"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
