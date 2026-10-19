import React from 'react';
import { Camera, Play, Video } from 'lucide-react';

export const Media: React.FC = () => {
  const mediaItems = [
    { title: 'Surya Boat 1.0 Maiden Voyage', type: 'Drone Video', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80' },
    { title: 'Coringa Mangrove Sapling Nursery Drive', type: 'Field Photo', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
    { title: 'Youth Bio-Makerspace Robotics Workshop', type: 'Field Photo', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Krishna Delta Aerial Bio-Shield Survey', type: 'Drone Video', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="border-b border-cyan-500/20 pb-8">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Media & Field Footage
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
            OceaNova Photo & Video Archive
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaItems.map((item, idx) => (
            <div key={idx} className="glass-panel rounded-3xl overflow-hidden border border-cyan-500/20 group relative cursor-pointer">
              <img src={item.url} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{item.type}</span>
                <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
