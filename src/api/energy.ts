
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
    // const response = await api.get('/energy');
    // return response.data;
    
    // For now, return mock data
    const now = new Date();
    
    // Generate historical data points (past 24 hours)
    const historicalData = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now);
      time.setHours(now.getHours() - 24 + i);
      
      // Generate realistic energy consumption patterns with morning and evening peaks
      let baseValue = 50000; // base energy consumption (kWh)
      
      // Higher in morning (7-9 AM) 
      const hour = time.getHours();
      if (hour >= 7 && hour <= 9) {
        baseValue = 90000 + Math.random() * 20000;
      } 
      // Peak in evening (6-9 PM)
      else if (hour >= 18 && hour <= 21) {
        baseValue = 110000 + Math.random() * 30000;
      }
      // Lower at night (11 PM - 5 AM)
      else if (hour >= 23 || hour <= 5) {
        baseValue = 30000 + Math.random() * 15000;
      }
      // Normal daytime (random variation)
      else {
        baseValue = 70000 + Math.random() * 25000;
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
      
      // Predict future energy consumption based on patterns
      let predictedValue = 50000; // base consumption level
      
      // Morning peak prediction (7-9 AM)
      const hour = time.getHours();
      if (hour >= 7 && hour <= 9) {
        predictedValue = 85000 + Math.random() * 25000;
      } 
      // Evening peak prediction (6-9 PM)
      else if (hour >= 18 && hour <= 21) {
        predictedValue = 105000 + Math.random() * 35000;
      }
      // Lower at night prediction (11 PM - 5 AM)
      else if (hour >= 23 || hour <= 5) {
        predictedValue = 35000 + Math.random() * 10000;
      }
      // Normal daytime prediction (random variation)
      else {
        predictedValue = 75000 + Math.random() * 20000;
      }
      
      return {
        time: `${time.getHours()}:00`,
        value: Math.round(predictedValue),
      };
    });
    
    // Energy distribution data (by sector)
    const distribution = [
      { name: 'Residential', value: 42000, color: '#3b82f6' },
      { name: 'Commercial', value: 65000, color: '#10b981' },
      { name: 'Industrial', value: 87000, color: '#f59e0b' },
      { name: 'Public Services', value: 28000, color: '#8b5cf6' },
      { name: 'Transportation', value: 13000, color: '#ec4899' }
    ];
    
    // Energy stations map data
    const mapData = {
      stations: [
        { 
          id: 1, 
          lat: 40.7128, 
          lng: -74.0060, 
          usage: 85000, 
          capacity: 110000, 
          type: 'Commercial', 
          name: 'Downtown Grid Hub', 
          lastUpdate: '5 min ago' 
        },
        { 
          id: 2, 
          lat: 40.7318, 
          lng: -73.9960, 
          usage: 42000, 
          capacity: 60000, 
          type: 'Residential', 
          name: 'Midtown Residential Zone', 
          lastUpdate: '8 min ago' 
        },
        { 
          id: 3, 
          lat: 40.7048, 
          lng: -74.0260, 
          usage: 95000, 
          capacity: 120000, 
          type: 'Industrial', 
          name: 'Manufacturing District', 
          lastUpdate: '12 min ago' 
        },
        { 
          id: 4, 
          lat: 40.7500, 
          lng: -73.9870, 
          usage: 28000, 
          capacity: 45000, 
          type: 'Public', 
          name: 'Government Complex', 
          lastUpdate: '3 min ago' 
        },
        { 
          id: 5, 
          lat: 40.7360, 
          lng: -74.0130, 
          usage: 18000, 
          capacity: 35000, 
          type: 'Mixed Use', 
          name: 'Urban Center', 
          lastUpdate: '7 min ago' 
        },
      ]
    };
    
    return {
      stats: [
        {
          title: 'Total Consumption',
          value: 235000,
          change: -3,
          description: 'Current city-wide energy usage',
          format: 'kWh'
        },
        {
          title: 'Capacity Utilization',
          value: '68%',
          change: -5,
          description: 'Percentage of grid capacity in use',
          format: 'Of total grid capacity'
        },
        {
          title: 'Renewable Share',
          value: '42%',
          change: 8,
          description: 'Energy from renewable sources',
          format: 'Target: 50% by 2025'
        }
      ],
      historicalData,
      predictions,
      distribution,
      mapData
    };
  } catch (error) {
    console.error('Error fetching energy data:', error);
    throw error;
  }
};
