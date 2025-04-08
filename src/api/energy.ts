
import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:8000';

// Create basic axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for energy dashboard
export const fetchEnergyData = async () => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.get('/energy/data');
    // return response.data;
    
    // For now, return mock data
    return {
      stats: [
        {
          title: "Current Energy Usage",
          description: "Total consumption across the city",
          value: 120500,
          unit: "kWh",
          change: -3,
          type: "decrease", // decrease is good for energy
          percentage: 80
        },
        {
          title: "Renewable Energy",
          description: "Percentage of energy from renewable sources",
          value: 45,
          unit: "%",
          change: 5,
          type: "increase",
          max: 100
        },
        {
          title: "Predicted Peak",
          description: "Forecasted peak usage in the next 12 hours",
          value: 145000,
          unit: "kWh",
          change: 2,
          type: "increase",
          max: 200000
        }
      ],
      historicalData: [
        { time: "08:00", value: 110000 },
        { time: "09:00", value: 115000 },
        { time: "10:00", value: 118000 },
        { time: "11:00", value: 122000 },
        { time: "12:00", value: 125000 },
        { time: "13:00", value: 123000 },
        { time: "14:00", value: 120500 }
      ],
      predictions: [
        { time: "15:00", value: 122000 },
        { time: "16:00", value: 130000 },
        { time: "17:00", value: 138000 },
        { time: "18:00", value: 145000 },
        { time: "19:00", value: 140000 },
        { time: "20:00", value: 135000 }
      ],
      mapData: {
        stations: [
          { 
            id: 1, 
            lat: 40.7428, 
            lng: -74.0120, 
            usage: 85000, 
            capacity: 100000,
            type: "Commercial", 
            name: "Downtown Energy Hub", 
            lastUpdate: "20 min ago" 
          },
          { 
            id: 2, 
            lat: 40.7028, 
            lng: -74.0260, 
            usage: 42000, 
            capacity: 60000,
            type: "Residential", 
            name: "Westside Residential Grid", 
            lastUpdate: "18 min ago" 
          },
          { 
            id: 3, 
            lat: 40.7228, 
            lng: -73.9760, 
            usage: 103000, 
            capacity: 120000,
            type: "Industrial", 
            name: "East Manufacturing Zone", 
            lastUpdate: "15 min ago" 
          },
          { 
            id: 4, 
            lat: 40.7358, 
            lng: -73.9910, 
            usage: 24000, 
            capacity: 40000,
            type: "Mixed Use", 
            name: "Midtown Grid Station", 
            lastUpdate: "12 min ago" 
          },
          { 
            id: 5, 
            lat: 40.7108, 
            lng: -74.0080, 
            usage: 31500, 
            capacity: 50000,
            type: "Residential", 
            name: "South Residential Grid", 
            lastUpdate: "10 min ago" 
          }
        ]
      },
      distribution: [
        { name: "Commercial", value: 85000, color: "#2563eb" },
        { name: "Residential", value: 73500, color: "#10b981" },
        { name: "Industrial", value: 103000, color: "#f97316" },
        { name: "Public Services", value: 25000, color: "#8b5cf6" },
        { name: "Transportation", value: 10000, color: "#ec4899" }
      ]
    };
  } catch (error) {
    console.error('Error fetching energy data:', error);
    throw error;
  }
};
