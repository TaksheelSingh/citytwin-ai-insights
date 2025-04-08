
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

// Mock data for dashboard overview
export const fetchOverviewData = async () => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.get('/dashboard/overview');
    // return response.data;
    
    // For now, return mock data
    return {
      traffic: {
        currentLevel: 6,
        change: 12,
        prediction: 7,
        hotspots: [
          'Downtown Main St & 5th Ave',
          'Highway I-95 North',
          'Central Business District'
        ]
      },
      airQuality: {
        aqi: 62,
        change: -5,
        prediction: 58,
        pollutants: [
          { name: 'PM2.5', level: 65 },
          { name: 'Ozone', level: 35 },
          { name: 'NO2', level: 20 }
        ]
      },
      energy: {
        currentUsage: 120500,
        capacity: 150000,
        change: -3,
        prediction: 117000,
        sources: [
          { name: 'Solar', percentage: 25 },
          { name: 'Wind', percentage: 20 },
          { name: 'Hydro', percentage: 15 },
          { name: 'Natural Gas', percentage: 40 }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard overview data:', error);
    throw error;
  }
};

// Mock data for map visualization
export const fetchMapData = async () => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.get('/dashboard/map');
    // return response.data;
    
    // For now, return mock data
    return {
      trafficPoints: [
        { id: 1, lat: 40.7128, lng: -74.0060, value: 8, lastUpdate: '10 min ago' },
        { id: 2, lat: 40.7218, lng: -73.9960, value: 5, lastUpdate: '5 min ago' },
        { id: 3, lat: 40.7048, lng: -74.0160, value: 3, lastUpdate: '2 min ago' }
      ],
      airQualityPoints: [
        { id: 1, lat: 40.7328, lng: -74.0220, value: 72, status: 'Moderate', lastUpdate: '15 min ago' },
        { id: 2, lat: 40.7028, lng: -73.9860, value: 45, status: 'Good', lastUpdate: '12 min ago' },
        { id: 3, lat: 40.7158, lng: -74.0360, value: 118, status: 'Unhealthy for Sensitive Groups', lastUpdate: '8 min ago' }
      ],
      energyPoints: [
        { id: 1, lat: 40.7428, lng: -74.0120, value: 85000, type: 'Commercial', lastUpdate: '20 min ago' },
        { id: 2, lat: 40.7028, lng: -74.0260, value: 42000, type: 'Residential', lastUpdate: '18 min ago' },
        { id: 3, lat: 40.7228, lng: -73.9760, value: 103000, type: 'Industrial', lastUpdate: '15 min ago' }
      ]
    };
  } catch (error) {
    console.error('Error fetching map data:', error);
    throw error;
  }
};
