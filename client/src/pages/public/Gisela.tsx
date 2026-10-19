import React from 'react';
import { Heart, Award, Users, CheckCircle2, BookOpen } from 'lucide-react';

export const Gisela: React.FC = () => {
  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Social Impact & Community Empowerment
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            GISELA Coastal Women Green-Tech Fellowship
          </h1>
          <p className="text-sm text-gray-300">
            Dedicated social initiative providing technical education, solar maintenance certifications, and eco-tourism livelihoods to coastal women across East Godavari estuaries.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-bold text-white">Empowering Women as Coastal Climate Leaders</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              The GISELA Fellowship bridges gender disparities in green technology. Women from estuarine fishing villages undergo intensive 6-month hands-on training in solar battery diagnostics, mangrove nursery management, and water quality testing.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-ocean-900 rounded-2xl border border-cyan-500/20">
                <Users className="w-6 h-6 text-emerald-400 mb-1" />
                <div className="text-lg font-bold text-white">150+ Fellows</div>
                <div className="text-gray-400">Graduated Women Fellows</div>
              </div>
              <div className="p-4 bg-ocean-900 rounded-2xl border border-cyan-500/20">
                <Award className="w-6 h-6 text-cyan-400 mb-1" />
                <div className="text-lg font-bold text-white">100% Certified</div>
                <div className="text-gray-400">Green Tech Credentials</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
              alt="GISELA Fellows"
              className="w-full h-80 object-cover rounded-3xl border border-emerald-500/30 shadow-2xl"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
