
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

interface AQIDataPoint {
  time: string;
  value: number;
}

interface AirQualityChartProps {
  data?: AQIDataPoint[];
  predictions?: AQIDataPoint[];
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ data = [], predictions = [] }) => {
  // Combine historical data and predictions for display
  const combinedData = [...data];
  
  // Add a reference line where predictions start
  const predictionStartTime = predictions.length > 0 ? predictions[0].time : null;
  
  // Find where historical data ends and add predictions with a special marker
  predictions.forEach(prediction => {
    combinedData.push({
      ...prediction,
      isPrediction: true, // Mark as prediction for styling
    });
  });
  
  // AQI thresholds for coloring
  const aqiThresholds = [
    { range: [0, 50], label: 'Good', color: 'rgba(0, 228, 0, 0.2)' },
    { range: [51, 100], label: 'Moderate', color: 'rgba(255, 255, 0, 0.2)' },
    { range: [101, 150], label: 'Unhealthy for Sensitive Groups', color: 'rgba(255, 126, 0, 0.2)' },
    { range: [151, 200], label: 'Unhealthy', color: 'rgba(255, 0, 0, 0.2)' },
    { range: [201, 300], label: 'Very Unhealthy', color: 'rgba(143, 63, 151, 0.2)' },
    { range: [301, 500], label: 'Hazardous', color: 'rgba(126, 0, 35, 0.2)' }
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={combinedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          padding={{ left: 30, right: 30 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          label={{ value: 'Air Quality Index (AQI)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          tick={{ fontSize: 12 }}
          domain={[0, 300]}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 4, border: '1px solid #ddd' }}
          formatter={(value: number, name: string) => [`${value}`, name === 'isPrediction' ? 'Predicted AQI' : 'AQI']}
          labelFormatter={(time) => `Time: ${time}`}
        />
        <Legend 
          payload={[
            { value: 'Historical AQI', type: 'line', color: '#3b82f6' },
            { value: 'Predicted AQI', type: 'line', color: '#10b981', strokeDasharray: '5 5' }
          ]}
        />
        
        {/* AQI threshold areas */}
        {aqiThresholds.map((threshold, index) => (
          <ReferenceArea 
            key={`threshold-${index}`}
            y1={threshold.range[0]} 
            y2={threshold.range[1]}
            fill={threshold.color}
            fillOpacity={0.3}
            label={{ 
              value: threshold.label, 
              position: 'insideRight',
              fill: '#666',
              fontSize: 10
            }}
          />
        ))}
        
        {/* Historical data line */}
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3b82f6" 
          dot={{ r: 3 }} 
          activeDot={{ r: 6 }} 
          strokeWidth={2}
          name="Historical"
          connectNulls
        />
        
        {/* Prediction line */}
        <Line 
          type="monotone" 
          dataKey="isPrediction" 
          stroke="#10b981" 
          strokeDasharray="5 5" 
          dot={{ r: 3 }} 
          activeDot={{ r: 6 }} 
          strokeWidth={2}
          name="Prediction"
          connectNulls
        />
        
        {/* Reference line for prediction start */}
        {predictionStartTime && (
          <ReferenceLine 
            x={predictionStartTime} 
            stroke="#888" 
            strokeDasharray="3 3" 
            label={{ value: 'Prediction Start', position: 'insideTopRight', fill: '#888' }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AirQualityChart;
