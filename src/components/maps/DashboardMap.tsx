
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import { fetchMapData } from '@/api/dashboard';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Create custom icons for different data points
const trafficIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const airQualityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const energyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Center map on specific coordinates
const MapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

const DashboardMap = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['mapData'],
    queryFn: fetchMapData,
  });
  
  // Default center (city center)
  const defaultCenter: [number, number] = [40.7128, -74.0060]; // NYC coordinates
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
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
      
      <MapCenter center={defaultCenter} />
      
      {data?.trafficPoints.map((point) => (
        <Marker 
          key={`traffic-${point.id}`}
          position={[point.lat, point.lng]}
          icon={trafficIcon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">Traffic Point {point.id}</h3>
              <p>Congestion Level: {point.value}/10</p>
              <p>Updated: {point.lastUpdate}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {data?.airQualityPoints.map((point) => (
        <Marker 
          key={`air-${point.id}`}
          position={[point.lat, point.lng]}
          icon={airQualityIcon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">Air Quality Station {point.id}</h3>
              <p>AQI: {point.value}</p>
              <p>Status: {point.status}</p>
              <p>Updated: {point.lastUpdate}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {data?.energyPoints.map((point) => (
        <Marker 
          key={`energy-${point.id}`}
          position={[point.lat, point.lng]}
          icon={energyIcon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">Energy Station {point.id}</h3>
              <p>Usage: {point.value} kWh</p>
              <p>Type: {point.type}</p>
              <p>Updated: {point.lastUpdate}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DashboardMap;
