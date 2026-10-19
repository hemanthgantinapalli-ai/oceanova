import React, { useEffect, useState } from 'react';
import { fetchVessels } from '../../services/api';
import { getSocket } from '../../services/socket';
import { Vessel } from '../../types';
import { Activity, Battery, Sun, Zap, Compass, ShieldCheck } from 'lucide-react';

export const Vessels: React.FC = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [liveSurya, setLiveSurya] = useState<any>(null);

  useEffect(() => {
    fetchVessels().then(setVessels).catch(console.error);

    const socket = getSocket();
    socket.on('telemetry:surya1', (data) => setLiveSurya(data));

    return () => {
      socket.off('telemetry:surya1');
    };
  }, []);

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-electric-cyan text-xs font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> LIVE TELEMETRY STREAM
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
            Eco-Vessel Digital Twin Fleet
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Real-time IoT telemetry from Surya Boat 1.0 (Solar Passenger Catamaran) and AI Mangrove Boat 2.0 (Autonomous Debris Interceptor).
          </p>
        </div>

        {/* Vessels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* SURYA BOAT 1.0 */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wider">WS-01 Solar Inland Mobility</span>
                <h2 className="text-2xl font-bold text-white mt-1">Surya Boat 1.0</h2>
                <p className="text-xs text-gray-400">25-Person Solar Passenger Catamaran</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                ● Operational
              </span>
            </div>

            {/* Live Telemetry Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ocean-900/80 p-4 rounded-2xl border border-cyan-500/20">
              <div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Battery className="w-3 h-3 text-emerald-400" /> Battery
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-1">
                  {liveSurya?.batteryPercent || 88}%
                </div>
              </div>

              <div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Sun className="w-3 h-3 text-yellow-400" /> Solar
                </div>
                <div className="text-lg font-bold text-yellow-400 mt-1">
                  {liveSurya?.solarInputKw || 4.2} kW
                </div>
              </div>

              <div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> CO2 Avoided
                </div>
                <div className="text-lg font-bold text-cyan-400 mt-1">
                  {liveSurya?.co2AvoidedKg || 842} kg
                </div>
              </div>

              <div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-blue-400" /> Distance
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {liveSurya?.totalDistanceKm || 1240.5} km
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Passenger Capacity:</span> <span className="text-white font-medium">25 Persons</span>
                </div>
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Hull Material:</span> <span className="text-white font-medium">Composite Fiber</span>
                </div>
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Propulsion:</span> <span className="text-white font-medium">Dual 10kW BLDC</span>
                </div>
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Solar Array:</span> <span className="text-white font-medium">8.5 kW Flexible</span>
                </div>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
              alt="Surya Boat 1.0"
              className="w-full h-48 object-cover rounded-2xl border border-cyan-500/20"
            />
          </div>

          {/* AI MANGROVE BOAT 2.0 */}
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-emerald-400 tracking-wider">WS-03 Robotics & Waste</span>
                <h2 className="text-2xl font-bold text-white mt-1">AI Mangrove Boat 2.0</h2>
                <p className="text-xs text-gray-400">Autonomous Riverine Debris Interceptor</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                ● Operational
              </span>
            </div>

            {/* Telemetry Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ocean-900/80 p-4 rounded-2xl border border-emerald-500/20">
              <div>
                <div className="text-[10px] text-gray-400">Battery</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">94.5%</div>
              </div>

              <div>
                <div className="text-[10px] text-gray-400">Solar</div>
                <div className="text-lg font-bold text-yellow-400 mt-1">6.8 kW</div>
              </div>

              <div>
                <div className="text-[10px] text-gray-400">Debris Extracted</div>
                <div className="text-lg font-bold text-cyan-400 mt-1">45 Tons</div>
              </div>

              <div>
                <div className="text-[10px] text-gray-400">Range</div>
                <div className="text-lg font-bold text-white mt-1">1890 km</div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Navigation:</span> <span className="text-white font-medium">Autonomous LiDAR</span>
                </div>
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Debris Payload:</span> <span className="text-white font-medium">500 kg Conveyor</span>
                </div>
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Water Testing:</span> <span className="text-white font-medium">Multi-parameter Sonde</span>
                </div>
                <div className="p-2.5 bg-ocean-900 rounded-lg border border-gray-800">
                  <span className="text-gray-500">Battery Capacity:</span> <span className="text-white font-medium">64 kWh LFP</span>
                </div>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
              alt="AI Mangrove Boat 2.0"
              className="w-full h-48 object-cover rounded-2xl border border-emerald-500/20"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
