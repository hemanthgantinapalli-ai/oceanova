import React, { useState, useEffect } from 'react';
import { fetchImpactSummary } from '../../services/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { CountUp } from '../../components/ui/CountUp';
import { Filter, Download, Activity, Trees, Users, Zap, Shield } from 'lucide-react';

export const Impact: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [impactData, setImpactData] = useState<any>(null);

  useEffect(() => {
    fetchImpactSummary(selectedYear).then(setImpactData).catch(console.error);
  }, [selectedYear]);

  const summary = impactData?.summary || {
    mangrovesRestoredHa: 500,
    householdsReached: 29500,
    youthTrained: 2500,
    carbonAvoidedTons: 3300,
    renewableEnergyKwh: 1450000,
    inlandWaterwaysKm: 1800
  };

  const chartData = [
    { year: '2024', Ha: 140, Carbon: 920, Households: 8200, Youth: 750 },
    { year: '2025', Ha: 350, Carbon: 2370, Households: 20600, Youth: 1850 },
    { year: '2026', Ha: 500, Carbon: 3300, Households: 29500, Youth: 2500 },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0A2540] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-300 pb-8">
          <div>
            <span className="text-xs font-bold text-[#147EA8] uppercase tracking-widest px-3 py-1 rounded-full bg-[#E8F6F8] border border-[#38B7C9]/30">
              Climate-Tech Analytics Platform
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-[#0A2540] mt-2">
              OceaNova Live Impact Analytics
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Verified ecological restoration metrics, carbon accounting, and coastal household empowerment logs.
            </p>
          </div>

          {/* Controls: Year Filter & Export */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1 text-xs shadow-sm">
              <Filter className="w-3.5 h-3.5 text-[#147EA8] ml-2" />
              <button
                onClick={() => setSelectedYear(undefined)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${!selectedYear ? 'bg-[#147EA8] text-white' : 'text-gray-600 hover:text-[#0A2540]'}`}
              >
                All Years
              </button>
              <button
                onClick={() => setSelectedYear(2024)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${selectedYear === 2024 ? 'bg-[#147EA8] text-white' : 'text-gray-600 hover:text-[#0A2540]'}`}
              >
                2024
              </button>
              <button
                onClick={() => setSelectedYear(2025)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${selectedYear === 2025 ? 'bg-[#147EA8] text-white' : 'text-gray-600 hover:text-[#0A2540]'}`}
              >
                2025
              </button>
              <button
                onClick={() => setSelectedYear(2026)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${selectedYear === 2026 ? 'bg-[#147EA8] text-white' : 'text-gray-600 hover:text-[#0A2540]'}`}
              >
                2026
              </button>
            </div>

            <button
              onClick={() => alert("Downloading verified impact CSV report...")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#147EA8] text-xs font-bold text-[#147EA8] hover:bg-[#147EA8] hover:text-white transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> CSV Export
            </button>
          </div>
        </div>

        {/* KPI Cards Grid (Background: #E8F6F8, Numbers: #0A2540, Icons: #43A047, Accents: #38B7C9) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="bg-[#E8F6F8] p-5 rounded-2xl border border-[#38B7C9]/30 text-center shadow-sm hover:shadow-md transition-all">
            <Trees className="w-6 h-6 text-[#43A047] mx-auto mb-2" />
            <div className="text-2xl font-black text-[#0A2540]">
              <CountUp end={summary.mangrovesRestoredHa} suffix=" Ha" />
            </div>
            <div className="text-xs font-bold text-[#147EA8] mt-1">Mangroves Restored</div>
          </div>

          <div className="bg-[#E8F6F8] p-5 rounded-2xl border border-[#38B7C9]/30 text-center shadow-sm hover:shadow-md transition-all">
            <Users className="w-6 h-6 text-[#43A047] mx-auto mb-2" />
            <div className="text-2xl font-black text-[#0A2540]">
              <CountUp end={summary.householdsReached} suffix="+" />
            </div>
            <div className="text-xs font-bold text-[#147EA8] mt-1">Households Reached</div>
          </div>

          <div className="bg-[#E8F6F8] p-5 rounded-2xl border border-[#38B7C9]/30 text-center shadow-sm hover:shadow-md transition-all">
            <Zap className="w-6 h-6 text-[#43A047] mx-auto mb-2" />
            <div className="text-2xl font-black text-[#0A2540]">
              <CountUp end={summary.carbonAvoidedTons} suffix=" tCO2e" />
            </div>
            <div className="text-xs font-bold text-[#147EA8] mt-1">Carbon Avoided/yr</div>
          </div>

          <div className="bg-[#E8F6F8] p-5 rounded-2xl border border-[#38B7C9]/30 text-center shadow-sm hover:shadow-md transition-all">
            <Shield className="w-6 h-6 text-[#43A047] mx-auto mb-2" />
            <div className="text-2xl font-black text-[#0A2540]">
              <CountUp end={summary.youthTrained} suffix="+" />
            </div>
            <div className="text-xs font-bold text-[#147EA8] mt-1">Youth STEM Fellows</div>
          </div>

          <div className="bg-[#E8F6F8] p-5 rounded-2xl border border-[#38B7C9]/30 text-center shadow-sm hover:shadow-md transition-all">
            <Activity className="w-6 h-6 text-[#43A047] mx-auto mb-2" />
            <div className="text-2xl font-black text-[#0A2540]">
              <CountUp end={1450} suffix=" MWh" />
            </div>
            <div className="text-xs font-bold text-[#147EA8] mt-1">Renewable Energy</div>
          </div>

          <div className="bg-[#E8F6F8] p-5 rounded-2xl border border-[#38B7C9]/30 text-center shadow-sm hover:shadow-md transition-all">
            <Activity className="w-6 h-6 text-[#43A047] mx-auto mb-2" />
            <div className="text-2xl font-black text-[#0A2540]">
              <CountUp end={summary.inlandWaterwaysKm} suffix=" km" />
            </div>
            <div className="text-xs font-bold text-[#147EA8] mt-1">Clean Waterways</div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Mangrove & Carbon Trend */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
              <Trees className="w-5 h-5 text-[#43A047]" /> Mangrove Hectares & Carbon Trajectory
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorHa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#43A047" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#43A047" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#147EA8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#147EA8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="year" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#38B7C9', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="Ha" stroke="#43A047" fillOpacity={1} fill="url(#colorHa)" name="Hectares (Ha)" />
                  <Area type="monotone" dataKey="Carbon" stroke="#147EA8" fillOpacity={1} fill="url(#colorCarbon)" name="tCO2e Avoided" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Beneficiaries & Youth Training */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#147EA8]" /> Beneficiary Household Growth
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="year" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#38B7C9', borderRadius: '12px' }} />
                  <Bar dataKey="Households" fill="#147EA8" radius={[6, 6, 0, 0]} name="Households Reached" />
                  <Bar dataKey="Youth" fill="#43A047" radius={[6, 6, 0, 0]} name="Youth Trained" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

