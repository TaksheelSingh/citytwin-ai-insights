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

interface AQIPoint {
  id: number;
  lat: number;
  lng: number;
  aqi: number;
  name: string;
  lastUpdate: string;
}

interface AirQualityMapProps {
  aqiData?: {
    stations: AQIPoint[];
  };
}

const AirQualityMap: React.FC<AirQualityMapProps> = ({ aqiData }) => {
  const defaultCenter: [number, number] = [22.9734, 78.6569]; // Center of India

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10b981';
    if (aqi <= 100) return '#f59e0b';
    if (aqi <= 150) return '#fb923c';
    if (aqi <= 200) return '#ef4444';
    if (aqi <= 300) return '#9333ea';
    return '#7f1d1d';
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (!aqiData) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100">
        <p>No air quality data available.</p>
      </div>
    );
  }

  return (
    <MapContainer 
      center={defaultCenter}
      zoom={5} // Zoomed out to see India
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {aqiData.stations.map((station) => (
        <React.Fragment key={`station-${station.id}`}>
          <Circle
            center={[station.lat, station.lng]}
            radius={1000}
            pathOptions={{
              color: getAQIColor(station.aqi),
              fillColor: getAQIColor(station.aqi),
              fillOpacity: 0.3
            }}
          />
          <Marker position={[station.lat, station.lng]}>
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{station.name}</h3>
                <p>AQI: {station.aqi} - {getAQIStatus(station.aqi)}</p>
                <p>Updated: {station.lastUpdate}</p>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default AirQualityMap;
