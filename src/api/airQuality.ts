
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

// Mock data for air quality dashboard
export const fetchAirQualityData = async () => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.get('/air-quality/data');
    // return response.data;
    
    // For now, return mock data
    return {
      stats: [
        {
          title: "Current AQI",
          description: "Average Air Quality Index",
          value: 62,
          change: -5,
          type: "decrease", // decrease is good for AQI
          status: "Moderate"
        },
        {
          title: "AQI Forecast",
          description: "Predicted AQI in 24 hours",
          value: 58,
          change: -7,
          type: "decrease",
          status: "Moderate"
        },
        {
          title: "Primary Pollutant",
          description: "Most significant air pollutant",
          value: "PM2.5",
          level: 65,
          change: 0,
          type: "neutral"
        }
      ],
      historicalData: [
        { time: "08:00", value: 70 },
        { time: "09:00", value: 67 },
        { time: "10:00", value: 65 },
        { time: "11:00", value: 63 },
        { time: "12:00", value: 62 },
        { time: "13:00", value: 61 },
        { time: "14:00", value: 62 }
      ],
      predictions: [
        { time: "15:00", value: 61 },
        { time: "16:00", value: 60 },
        { time: "17:00", value: 59 },
        { time: "18:00", value: 58 },
        { time: "19:00", value: 57 },
        { time: "20:00", value: 55 }
      ],
      mapData: {
        stations: [
          { id: 1, lat: 40.7328, lng: -74.0220, aqi: 72, name: "Downtown Monitor Station", lastUpdate: "15 min ago" },
          { id: 2, lat: 40.7028, lng: -73.9860, aqi: 45, name: "Riverside Air Station", lastUpdate: "12 min ago" },
          { id: 3, lat: 40.7158, lng: -74.0360, aqi: 118, name: "Industrial Zone Monitor", lastUpdate: "8 min ago" },
          { id: 4, lat: 40.7288, lng: -73.9888, aqi: 56, name: "Central Park Station", lastUpdate: "10 min ago" },
          { id: 5, lat: 40.7098, lng: -74.0048, aqi: 81, name: "Harbor Monitor", lastUpdate: "5 min ago" }
        ]
      },
      pollutants: [
        { name: "PM2.5", level: 65, change: -3, limit: 100 },
        { name: "Ozone", level: 35, change: -8, limit: 100 },
        { name: "NO2", level: 20, change: 5, limit: 100 },
        { name: "SO2", level: 10, change: -2, limit: 100 },
        { name: "CO", level: 15, change: 0, limit: 100 }
      ]
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};