import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const cityData = [
  {
    name: "Delhi",
    lat: 28.6139,
    lon: 77.2090,
    airQuality: "Moderate",
    traffic: "High",
    energy: "75%",
  },
  {
    name: "Mumbai",
    lat: 19.0760,
    lon: 72.8777,
    airQuality: "Poor",
    traffic: "Very High",
    energy: "82%",
  },
  {
    name: "Bengaluru",
    lat: 12.9716,
    lon: 77.5946,
    airQuality: "Good",
    traffic: "Moderate",
    energy: "68%",
  },
];

const FitBounds = ({ bounds }: { bounds: [number, number][] }) => {
  const map = useMap();
  map.fitBounds(L.latLngBounds(bounds));
  return null;
};

const DashboardMap = () => {
  const bounds: [number, number][] = cityData.map((city) => [city.lat, city.lon]);

  return (
    <MapContainer
      center={[22.5, 80.9]} // Central India
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBounds bounds={bounds} />
      {cityData.map((city, idx) => (
        <Marker key={idx} position={[city.lat, city.lon]}>
          <Popup>
            <strong>{city.name}</strong><br />
            Air Quality: {city.airQuality}<br />
            Traffic: {city.traffic}<br />
            Energy Usage: {city.energy}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DashboardMap;
