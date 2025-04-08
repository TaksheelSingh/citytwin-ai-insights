
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
    // const response = await api.get('/traffic/data');
    // return response.data;
    
    // For now, return mock data
    return {
      stats: [
        {
          title: "Current Traffic Level",
          description: "Average congestion across monitored routes",
          value: 6.2,
          change: 12,
          type: "increase",
          max: 10
        },
        {
          title: "Congestion Forecast",
          description: "Predicted peak in the next 2 hours",
          value: 7.5,
          change: -5,
          type: "decrease",
          max: 10
        },
        {
          title: "Travel Time Increase",
          description: "Average travel time increase due to congestion",
          value: 24,
          unit: "%",
          change: 8,
          type: "increase"
        }
      ],
      historicalData: [
        { time: "08:00", value: 3 },
        { time: "09:00", value: 4.5 },
        { time: "10:00", value: 5.2 },
        { time: "11:00", value: 6.1 },
        { time: "12:00", value: 6.8 },
        { time: "13:00", value: 6.2 },
        { time: "14:00", value: 5.9 }
      ],
      predictions: [
        { time: "15:00", value: 6.3 },
        { time: "16:00", value: 7.1 },
        { time: "17:00", value: 7.8 },
        { time: "18:00", value: 7.5 },
        { time: "19:00", value: 6.4 },
        { time: "20:00", value: 5.1 }
      ],
      mapData: {
        points: [
          { id: 1, lat: 40.7128, lng: -74.0060, congestion: 8, name: "Downtown Junction", lastUpdate: "10 min ago" },
          { id: 2, lat: 40.7218, lng: -73.9960, congestion: 5, name: "Midtown East", lastUpdate: "5 min ago" },
          { id: 3, lat: 40.7048, lng: -74.0160, congestion: 3, name: "Financial District", lastUpdate: "2 min ago" },
          { id: 4, lat: 40.7338, lng: -73.9978, congestion: 7, name: "Chelsea Corridor", lastUpdate: "7 min ago" },
          { id: 5, lat: 40.7228, lng: -74.0060, congestion: 6, name: "SoHo Intersection", lastUpdate: "8 min ago" }
        ],
        routes: [
          { 
            id: 1, 
            points: [[40.7128, -74.0060], [40.7218, -73.9960]] as [number, number][], 
            congestion: 7, 
            name: "Main Street Route" 
          },
          { 
            id: 2, 
            points: [[40.7218, -73.9960], [40.7338, -73.9978]] as [number, number][], 
            congestion: 5, 
            name: "Midtown Connector" 
          },
          { 
            id: 3, 
            points: [[40.7048, -74.0160], [40.7128, -74.0060]] as [number, number][], 
            congestion: 2, 
            name: "South Route" 
          },
          { 
            id: 4, 
            points: [[40.7228, -74.0060], [40.7338, -73.9978]] as [number, number][], 
            congestion: 8, 
            name: "West Side Highway" 
          }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    throw error;
  }
};
