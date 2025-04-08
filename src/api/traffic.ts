
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

// Mock data for traffic dashboard
export const fetchTrafficData = async () => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.get('/traffic');
    // return response.data;
    
    // For now, return mock data
    const now = new Date();
    
    // Generate historical data points (past 24 hours)
    const historicalData = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now);
      time.setHours(now.getHours() - 24 + i);
      
      // Generate realistic traffic patterns with morning and evening peaks
      let baseValue = 3; // base congestion level
      
      // Morning peak (7-9 AM)
      const hour = time.getHours();
      if (hour >= 7 && hour <= 9) {
        baseValue = 7 + Math.random() * 2;
      } 
      // Evening peak (4-6 PM)
      else if (hour >= 16 && hour <= 18) {
        baseValue = 8 + Math.random() * 2;
      }
      // Lower at night (10 PM - 5 AM)
      else if (hour >= 22 || hour <= 5) {
        baseValue = 1 + Math.random() * 2;
      }
      // Normal daytime (random variation)
      else {
        baseValue = 3 + Math.random() * 3;
      }
      
      return {
        time: `${time.getHours()}:00`,
        value: parseFloat(baseValue.toFixed(1)),
      };
    });
    
    // Generate prediction data points (next 6 hours)
    const predictions = Array.from({ length: 6 }, (_, i) => {
      const time = new Date(now);
      time.setHours(now.getHours() + i + 1);
      
      // Predict future congestion based on patterns
      let predictedValue = 3; // base congestion level
      
      // Morning peak prediction (7-9 AM)
      const hour = time.getHours();
      if (hour >= 7 && hour <= 9) {
        predictedValue = 7.5 + Math.random() * 1.5;
      } 
      // Evening peak prediction (4-6 PM)
      else if (hour >= 16 && hour <= 18) {
        predictedValue = 8.5 + Math.random() * 1.5;
      }
      // Lower at night prediction (10 PM - 5 AM)
      else if (hour >= 22 || hour <= 5) {
        predictedValue = 1.5 + Math.random() * 1.5;
      }
      // Normal daytime prediction (random variation)
      else {
        predictedValue = 3.5 + Math.random() * 2.5;
      }
      
      return {
        time: `${time.getHours()}:00`,
        value: parseFloat(predictedValue.toFixed(1)),
      };
    });
    
    // Simplified map data
    const mapData = {
      points: [
        { id: 1, lat: 40.7128, lng: -74.0060, congestion: 8, name: 'Downtown Junction', lastUpdate: '5 min ago' },
        { id: 2, lat: 40.7218, lng: -73.9960, congestion: 6, name: 'Midtown East', lastUpdate: '3 min ago' },
        { id: 3, lat: 40.7048, lng: -74.0160, congestion: 4, name: 'Financial District', lastUpdate: '7 min ago' },
        { id: 4, lat: 40.7500, lng: -73.9970, congestion: 9, name: 'Times Square', lastUpdate: '2 min ago' },
        { id: 5, lat: 40.7360, lng: -74.0030, congestion: 3, name: 'Chelsea', lastUpdate: '10 min ago' },
      ],
      routes: [
        { 
          id: 1, 
          points: [
            [40.7128, -74.0060],
            [40.7150, -74.0040],
            [40.7180, -74.0000],
            [40.7218, -73.9960]
          ],
          congestion: 7,
          name: 'Main Avenue'
        },
        { 
          id: 2, 
          points: [
            [40.7048, -74.0160],
            [40.7080, -74.0130],
            [40.7110, -74.0100],
            [40.7128, -74.0060]
          ],
          congestion: 4,
          name: 'Downtown Expressway'
        },
        { 
          id: 3, 
          points: [
            [40.7500, -73.9970],
            [40.7450, -73.9990],
            [40.7400, -74.0010],
            [40.7360, -74.0030]
          ],
          congestion: 8,
          name: 'Midtown Boulevard'
        },
      ]
    };
    
    return {
      stats: [
        {
          title: 'Average Congestion',
          value: 6.5,
          change: 8,
          description: 'Current city-wide traffic level',
          format: 'Scale: 1-10'
        },
        {
          title: 'Travel Time Index',
          value: 1.8,
          change: 12,
          description: 'Ratio of peak to free-flow travel time',
          format: 'Higher is worse'
        },
        {
          title: 'Affected Routes',
          value: 24,
          change: -5,
          description: 'Major routes with congestion level > 7',
          format: 'Out of 120 monitored routes'
        }
      ],
      historicalData,
      predictions,
      mapData
    };
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    throw error;
  }
};
