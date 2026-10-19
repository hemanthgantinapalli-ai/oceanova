import React, { useState } from 'react';
import { CountUp } from './CountUp';
import { Shield, Trees, Users, Award } from 'lucide-react';

export const CSRImpactCalculator: React.FC = () => {
  const [budget, setBudget] = useState<number>(1000000); // 10 Lakhs INR default

  // Calculations per 1 Lakh INR (100,000 INR)
  // ~ 0.2 Ha Mangroves, ~ 12 Households, ~ 1.5 tCO2e/yr, ~ 1 Youth trained
  const factor = budget / 100000;
  const hectares = Math.round(factor * 0.2 * 10) / 10;
  const households = Math.round(factor * 12);
  const carbonTons = Math.round(factor * 1.5 * 10) / 10;
  const youthTrained = Math.round(factor * 1);

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 max-w-4xl mx-auto shadow-2xl">
      <div className="text-center mb-8">
        <span className="text-electric-cyan text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          Interactive CSR Planner
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-3">
          CSR Investment Impact Calculator
        </h3>
        <p className="text-gray-400 text-sm mt-2">
          Adjust your CSR outlay to calculate projected environmental & community outcomes.
        </p>
      </div>

      {/* Slider Input */}
      <div className="mb-10 bg-ocean-900/60 p-6 rounded-2xl border border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm text-gray-300 font-medium">Proposed CSR Investment</label>
          <span className="text-2xl font-bold text-electric-cyan">
            ₹{budget.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={100000}
          max={10000000}
          step={100000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-ocean-800 rounded-lg appearance-none cursor-pointer accent-electric-cyan"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>₹1 Lakh</span>
          <span>₹50 Lakhs</span>
          <span>₹1 Crore</span>
        </div>
      </div>

      {/* Grid Outcomes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-ocean-900/40 rounded-xl border border-cyan-500/20 text-center">
          <Trees className="w-6 h-6 text-electric-emerald mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            <CountUp end={hectares} suffix=" Ha" />
          </div>
          <div className="text-xs text-gray-400 mt-1">Mangrove Bio-Shield</div>
        </div>

        <div className="p-4 bg-ocean-900/40 rounded-xl border border-cyan-500/20 text-center">
          <Users className="w-6 h-6 text-electric-cyan mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            <CountUp end={households} suffix=" HH" />
          </div>
          <div className="text-xs text-gray-400 mt-1">Households Reached</div>
        </div>

        <div className="p-4 bg-ocean-900/40 rounded-xl border border-cyan-500/20 text-center">
          <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            <CountUp end={carbonTons} suffix=" tCO2e" />
          </div>
          <div className="text-xs text-gray-400 mt-1">Annual Carbon Avoided</div>
        </div>

        <div className="p-4 bg-ocean-900/40 rounded-xl border border-cyan-500/20 text-center">
          <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            <CountUp end={youthTrained} suffix=" Fellows" />
          </div>
          <div className="text-xs text-gray-400 mt-1">Youth STEM Fellows</div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 italic">
        * Note: All numbers above are estimated project metrics and illustrative calculations for CSR planning purposes.
      </div>
    </div>
  );
};
