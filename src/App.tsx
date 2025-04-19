import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Traffic from "./pages/Traffic";
import AirQuality from "./pages/AirQuality";
import Energy from "./pages/Energy";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard"; // ✅ Corrected path

import { fetchAirQualityData } from './api/airQuality';
import { fetchTrafficData } from './api/traffic';
import { fetchEnergyData } from './api/energy';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [trafficData, setTrafficData] = useState<any>(null);
  const [energyData, setEnergyData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const airQuality = await fetchAirQualityData(selectedCity);
      const traffic = await fetchTrafficData(selectedCity);
      const energy = await fetchEnergyData(selectedCity);

      setAirQualityData(airQuality);
      setTrafficData(traffic);
      setEnergyData(energy);
    };

    loadData();
  }, [selectedCity]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* ✅ Added Dashboard route */}
            <Route path="/traffic" element={<Traffic data={trafficData} />} />
            <Route path="/air-quality" element={<AirQuality data={airQualityData} />} />
            <Route path="/energy" element={<Energy data={energyData} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Optional: move this into a Layout if needed globally */}
        <div className="city-selection">
          <label htmlFor="city">Select City: </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="city-dropdown"
          >
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
          </select>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
