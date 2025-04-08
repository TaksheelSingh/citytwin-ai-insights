
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface EnergyPoint {
  id: number;
  lat: number;
  lng: number;
  usage: number;
  capacity: number;
  type: string;
  name: string;
  lastUpdate: string;
}

interface EnergyMapProps {
  energyData?: {
    stations: EnergyPoint[];
  };
}

const EnergyMap: React.FC<EnergyMapProps> = ({ energyData }) => {
  const defaultCenter: [number, number] = [40.7128, -74.0060]; // NYC coordinates
  
  // Helper function to determine color based on energy usage level
  const getEnergyColor = (usage: number, capacity: number) => {
    const percentUsage = (usage / capacity) * 100;
    if (percentUsage < 60) return '#10b981'; // green for low usage
    if (percentUsage < 80) return '#f59e0b'; // amber for medium usage
    return '#ef4444'; // red for high usage
  };
  
  if (!energyData) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100">
        <p>No energy data available.</p>
      </div>
    );
  }
  
  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Energy Stations with Circles for Capacity/Usage */}
      {energyData.stations.map((station) => (
        <React.Fragment key={`station-${station.id}`}>
          <Circle
            center={[station.lat, station.lng]}
            radius={800} // 800m radius
            pathOptions={{ 
              color: getEnergyColor(station.usage, station.capacity),
              fillColor: getEnergyColor(station.usage, station.capacity),
              fillOpacity: 0.3
            }}
          />
          <Marker 
            position={[station.lat, station.lng]}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{station.name}</h3>
                <p>Type: {station.type}</p>
                <p>Current Usage: {station.usage.toLocaleString()} kWh</p>
                <p>Capacity: {station.capacity.toLocaleString()} kWh</p>
                <p>Usage: {((station.usage / station.capacity) * 100).toFixed(1)}%</p>
                <p>Updated: {station.lastUpdate}</p>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default EnergyMap;
