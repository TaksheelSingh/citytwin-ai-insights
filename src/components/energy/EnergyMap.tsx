import React, { useState, useEffect } from 'react';
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

// Energy data interface (similar to air quality)
interface EnergyPoint {
  id: number;
  lat: number;
  lng: number;
  energyConsumption: number;  // Energy consumption in kWh
  energyEfficiency: number;  // Efficiency rating (percentage)
  peakDemand: number;       // Peak demand in kW
  location: string;
  lastUpdate: string;
}

interface EnergyMapProps {
  energyData: {
    stations: EnergyPoint[];
  };
}

const EnergyMap: React.FC<EnergyMapProps> = ({ energyData }) => {
  const defaultCenter: [number, number] = [20.5937, 78.9629]; // Center of India coordinates

  // Helper function to determine color based on energy consumption
  const getEnergyColor = (energyConsumption: number) => {
    if (energyConsumption <= 100) return '#10b981'; // Green: Low consumption
    if (energyConsumption <= 200) return '#f59e0b'; // Amber: Moderate consumption
    if (energyConsumption <= 300) return '#f97316'; // Orange: High consumption
    return '#ef4444'; // Red: Very high consumption
  };

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={5}  // Zoomed out to show multiple locations
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Energy Stations with Circles for Energy Consumption */}
      {energyData.stations.map((station) => (
        <React.Fragment key={`station-${station.id}`}>
          <Circle
            center={[station.lat, station.lng]}
            radius={800} // 800m radius
            pathOptions={{ 
              color: getEnergyColor(station.energyConsumption),
              fillColor: getEnergyColor(station.energyConsumption),
              fillOpacity: 0.3
            }}
          />
          <Marker 
            position={[station.lat, station.lng]}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{station.location}</h3>
                <p>Energy Consumption: {station.energyConsumption} kWh</p>
                <p>Energy Efficiency: {station.energyEfficiency}%</p>
                <p>Peak Demand: {station.peakDemand} kW</p>
                <p>Last Update: {station.lastUpdate}</p>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

// Example of energy data (similar to air quality data)
const energyData = {
  stations: [
    {
      id: 1,
      lat: 28.6139,   // Delhi Latitude
      lng: 77.2090,   // Delhi Longitude
      energyConsumption: 250,  // kWh
      energyEfficiency: 80,    // 80% efficiency
      peakDemand: 500,         // Peak demand in kW
      location: 'Delhi',
      lastUpdate: '2025-04-13 10:00:00',
    },
    {
      id: 2,
      lat: 12.9716,   // Bangalore Latitude
      lng: 77.5946,   // Bangalore Longitude
      energyConsumption: 150,  // kWh
      energyEfficiency: 85,    // 85% efficiency
      peakDemand: 300,         // Peak demand in kW
      location: 'Bangalore',
      lastUpdate: '2025-04-13 10:00:00',
    },
    {
      id: 3,
      lat: 19.0760,   // Mumbai Latitude
      lng: 72.8777,   // Mumbai Longitude
      energyConsumption: 180,  // kWh
      energyEfficiency: 78,    // 78% efficiency
      peakDemand: 400,         // Peak demand in kW
      location: 'Mumbai',
      lastUpdate: '2025-04-13 10:00:00',
    },
  ],
};

const App = () => (
  <div style={{ height: '100vh' }}>
    <EnergyMap energyData={energyData} />
  </div>
);

export default App;
