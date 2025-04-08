
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface TrafficPoint {
  id: number;
  lat: number;
  lng: number;
  congestion: number;
  name: string;
  lastUpdate: string;
}

interface TrafficRoute {
  id: number;
  points: [number, number][];
  congestion: number;
  name: string;
}

interface TrafficMapProps {
  trafficData?: {
    points: TrafficPoint[];
    routes: TrafficRoute[];
  };
}

const TrafficMap: React.FC<TrafficMapProps> = ({ trafficData }) => {
  const defaultCenter: [number, number] = [40.7128, -74.0060]; // NYC coordinates
  
  // Helper function to determine color based on congestion level
  const getCongestionColor = (level: number) => {
    if (level < 3) return '#10b981'; // green for low congestion
    if (level < 7) return '#f59e0b'; // amber for medium congestion
    return '#ef4444'; // red for high congestion
  };
  
  if (!trafficData) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100">
        <p>No traffic data available.</p>
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
      
      {/* Traffic Routes as Polylines */}
      {trafficData.routes.map((route) => (
        <Polyline
          key={`route-${route.id}`}
          positions={route.points}
          pathOptions={{ 
            color: getCongestionColor(route.congestion),
            weight: 5,
            opacity: 0.7
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{route.name}</h3>
              <p>Congestion Level: {route.congestion}/10</p>
            </div>
          </Popup>
        </Polyline>
      ))}
      
      {/* Traffic Points as Markers */}
      {trafficData.points.map((point) => (
        <Marker 
          key={`point-${point.id}`}
          position={[point.lat, point.lng]}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{point.name}</h3>
              <p>Congestion Level: {point.congestion}/10</p>
              <p>Updated: {point.lastUpdate}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TrafficMap;
