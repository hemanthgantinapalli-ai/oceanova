import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWorkstreams } from '../../services/api';
import { Workstream } from '../../types';
import { Filter, Compass, MapPin, UserCheck, ArrowRight, Zap, Trees, Cpu } from 'lucide-react';

export const Workstreams: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pillarFilter, setPillarFilter] = useState(searchParams.get('pillar') || '');
  const [statusFilter, setStatusFilter] = useState('');
  const [workstreams, setWorkstreams] = useState<Workstream[]>([]);

  useEffect(() => {
    fetchWorkstreams({ pillar: pillarFilter, status: statusFilter }).then(setWorkstreams).catch(console.error);
  }, [pillarFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Workstreams Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
            OceaNova 12 Strategic Workstreams
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Comprehensive portfolio of solar navigation, mangrove bio-shields, marine AI robotics, and coastal livelihood programs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-ocean-900/60 p-4 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Filter className="w-4 h-4 text-cyan-400" /> Filter Workstreams:
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPillarFilter('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!pillarFilter ? 'bg-cyan-500 text-ocean-950' : 'bg-ocean-900 text-gray-400 border border-gray-700'}`}
            >
              All Pillars
            </button>
            <button
              onClick={() => setPillarFilter('SAHAJA')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pillarFilter === 'SAHAJA' ? 'bg-cyan-500 text-ocean-950' : 'bg-ocean-900 text-gray-400 border border-gray-700'}`}
            >
              SAHAJA (Renewable)
            </button>
            <button
              onClick={() => setPillarFilter('SHRAMA')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pillarFilter === 'SHRAMA' ? 'bg-emerald-500 text-ocean-950' : 'bg-ocean-900 text-gray-400 border border-gray-700'}`}
            >
              SHRAMA (Empowerment)
            </button>
            <button
              onClick={() => setPillarFilter('SPARSHA')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pillarFilter === 'SPARSHA' ? 'bg-blue-500 text-ocean-950' : 'bg-ocean-900 text-gray-400 border border-gray-700'}`}
            >
              SPARSHA (Science)
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-ocean-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
            >
              <option value="">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Scaling">Scaling</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Workstreams 12 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workstreams.map((ws) => (
            <div key={ws._id} className="glass-panel p-6 rounded-3xl border border-cyan-500/20 glass-panel-hover flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {ws.code}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    ws.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                    ws.status === 'Scaling' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                    'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  }`}>
                    {ws.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{ws.name}</h3>

                <div className="text-xs text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {ws.location} ({ws.district})
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{ws.impactSummary}</p>
              </div>

              <div className="border-t border-gray-800 pt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Primary KPI:</span>
                  <span className="font-semibold text-white">{ws.kpi}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Lead Owner:</span>
                  <span className="font-semibold text-cyan-300">{ws.projectOwner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
