
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
    // const response = await api.get('/air-quality');
    // return response.data;
    
    // For now, return mock data
    const now = new Date();
    
    // Generate historical data points (past 24 hours)
    const historicalData = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now);
      time.setHours(now.getHours() - 24 + i);
      
      // Generate realistic AQI patterns with some randomness
      let baseValue = 50; // base AQI level
      
      // Higher during rush hours (7-9 AM and 4-6 PM)
      const hour = time.getHours();
      if (hour >= 7 && hour <= 9) {
        baseValue = 70 + Math.random() * 30;
      } 
      // Higher in evening rush hour
      else if (hour >= 16 && hour <= 18) {
        baseValue = 80 + Math.random() * 35;
      }
      // Lower at night (11 PM - 5 AM)
      else if (hour >= 23 || hour <= 5) {
        baseValue = 30 + Math.random() * 20;
      }
      // Normal daytime (random variation)
      else {
        baseValue = 45 + Math.random() * 30;
      }
      
      return {
        time: `${time.getHours()}:00`,
        value: Math.round(baseValue),
      };
    });
    
    // Generate prediction data points (next 6 hours)
    const predictions = Array.from({ length: 6 }, (_, i) => {
      const time = new Date(now);
      time.setHours(now.getHours() + i + 1);
      
      // Predict future AQI based on patterns
      let predictedValue = 50; // base AQI level
      
      // Morning rush hour prediction (7-9 AM)
      const hour = time.getHours();
      if (hour >= 7 && hour <= 9) {
        predictedValue = 65 + Math.random() * 25;
      } 
      // Evening rush hour prediction (4-6 PM)
      else if (hour >= 16 && hour <= 18) {
        predictedValue = 75 + Math.random() * 30;
      }
      // Lower at night prediction (11 PM - 5 AM)
      else if (hour >= 23 || hour <= 5) {
        predictedValue = 35 + Math.random() * 15;
      }
      // Normal daytime prediction (random variation)
      else {
        predictedValue = 50 + Math.random() * 25;
      }
      
      return {
        time: `${time.getHours()}:00`,
        value: Math.round(predictedValue),
      };
    });
    
    // Simplified map data for AQI monitoring stations
    const mapData = {
      stations: [
        { id: 1, lat: 40.7128, lng: -74.0060, aqi: 78, name: 'Downtown Station', lastUpdate: '10 min ago' },
        { id: 2, lat: 40.7318, lng: -73.9960, aqi: 52, name: 'Midtown East Monitor', lastUpdate: '12 min ago' },
        { id: 3, lat: 40.7048, lng: -74.0260, aqi: 45, name: 'Financial District Sensor', lastUpdate: '8 min ago' },
        { id: 4, lat: 40.7500, lng: -73.9870, aqi: 115, name: 'Industrial Zone Monitor', lastUpdate: '15 min ago' },
        { id: 5, lat: 40.7360, lng: -74.0130, aqi: 61, name: 'Residential Area Sensor', lastUpdate: '5 min ago' },
      ]
    };
    
    return {
      stats: [
        {
          title: 'City Average AQI',
          value: 65,
          change: -7,
          description: 'Current city-wide air quality index',
          format: 'Moderate'
        },
        {
          title: 'Hourly PM2.5',
          value: 38,
          change: -12,
          description: 'Fine particulate matter concentration',
          format: 'μg/m³'
        },
        {
          title: 'Ozone Level',
          value: 0.048,
          change: 5,
          description: 'Current ground-level ozone concentration',
          format: 'ppm'
        }
      ],
      historicalData,
      predictions,
      mapData
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};
