import React, { useEffect, useState } from 'react';
import { getSocket } from '../../services/socket';
import { Activity, Users, CheckSquare, Database, ShieldAlert, Cpu, Trees, Zap } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    const socket = getSocket();
    socket.on('telemetry:surya1', (data) => setTelemetry(data));
    return () => {
      socket.off('telemetry:surya1');
    };
  }, []);

  return (
    <div className="space-y-8">
      
      {/* SaaS Dashboard Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-500/20 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Operations Command Center</h1>
          <p className="text-xs text-gray-400">OceaNova Blue Economy Internal SaaS System • Live Telemetry Stream</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> System Online • Socket.IO Connected
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-ocean-950 rounded-2xl border border-cyan-500/30 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Active Workstreams</span>
            <CheckSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">12 / 12</div>
          <div className="text-[10px] text-cyan-300">Across 6 Coastal Districts</div>
        </div>

        <div className="p-5 bg-ocean-950 rounded-2xl border border-emerald-500/30 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Restored Bio-Shield</span>
            <Trees className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">500 Ha</div>
          <div className="text-[10px] text-emerald-300">Avicennia & Rhizophora</div>
        </div>

        <div className="p-5 bg-ocean-950 rounded-2xl border border-yellow-500/30 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Surya 1.0 Battery</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-400">{telemetry?.batteryPercent || 88}%</div>
          <div className="text-[10px] text-yellow-300">Solar Input: {telemetry?.solarInputKw || 4.2} kW</div>
        </div>

        <div className="p-5 bg-ocean-950 rounded-2xl border border-blue-500/30 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Certified Trainees</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">2,500+</div>
          <div className="text-[10px] text-blue-300">QR-Verifiable Credentials</div>
        </div>
      </div>

      {/* Live Stream Panel */}
      <div className="p-6 bg-ocean-950 rounded-3xl border border-cyan-500/30 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" /> Real-time Vessel Telemetry Feed (Socket.IO)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
            <div className="text-gray-400">Vessel ID</div>
            <div className="font-bold text-cyan-400 mt-1">{telemetry?.vesselId || 'SURYA-01'}</div>
          </div>

          <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
            <div className="text-gray-400">GPS Position</div>
            <div className="font-bold text-white mt-1">
              {telemetry?.currentLat?.toFixed(4) || '16.9891'}, {telemetry?.currentLng?.toFixed(4) || '82.2475'}
            </div>
          </div>

          <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
            <div className="text-gray-400">Total Energy Gen</div>
            <div className="font-bold text-yellow-400 mt-1">{telemetry?.totalEnergyGeneratedKwh || 1248.5} kWh</div>
          </div>

          <div className="p-3 bg-ocean-900 rounded-xl border border-gray-800">
            <div className="text-gray-400">CO2 Avoided</div>
            <div className="font-bold text-emerald-400 mt-1">{telemetry?.co2AvoidedKg || 842.0} kg</div>
          </div>
        </div>
      </div>

    </div>
  );
};
