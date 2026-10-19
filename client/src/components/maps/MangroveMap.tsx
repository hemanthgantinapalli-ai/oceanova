import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MangroveSite } from '../../types';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MangroveMapProps {
  sites: MangroveSite[];
}

export const MangroveMap: React.FC<MangroveMapProps> = ({ sites }) => {
  const centerLat = sites.length > 0 ? sites[0].lat : 16.8912;
  const centerLng = sites.length > 0 ? sites[0].lng : 82.3124;

  return (
    <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-glass">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={9}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site) => (
          <Marker key={site._id} position={[site.lat, site.lng]} icon={customIcon}>
            <Popup>
              <div className="p-2 min-w-[220px]">
                <h4 className="font-bold text-base text-electric-cyan">{site.siteName}</h4>
                <p className="text-xs text-gray-300 mb-2">District: {site.district}</p>
                <div className="space-y-1 text-xs text-gray-200">
                  <div>🌱 Hectares: <span className="font-semibold text-white">{site.hectares} Ha</span></div>
                  <div>💚 Survival Rate: <span className="font-semibold text-emerald-400">{site.survivalRatePercent}%</span></div>
                  <div>👥 Volunteers: <span className="font-semibold text-white">{site.volunteersCount}</span></div>
                  <div>📅 Planting Date: <span className="font-semibold text-gray-400">{site.plantingDate}</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
