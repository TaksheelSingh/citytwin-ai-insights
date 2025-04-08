
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface AQIDataPoint {
  time: string;
  value: number;
}

interface CombinedDataPoint extends AQIDataPoint {
  isPrediction?: boolean;
}

interface AirQualityChartProps {
  data?: AQIDataPoint[];
  predictions?: AQIDataPoint[];
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ data = [], predictions = [] }) => {
  // Combine historical data and predictions for display
  const combinedData: CombinedDataPoint[] = [...data];
  
  // Add a reference line where predictions start
  const predictionStartTime = predictions.length > 0 ? predictions[0].time : null;
  
  // Find where historical data ends and add predictions with a special marker
  predictions.forEach(prediction => {
    combinedData.push({
      ...prediction,
      isPrediction: true, // Mark as prediction for styling
    });
  });
  
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
          label={{ value: 'Air Quality Index', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 4, border: '1px solid #ddd' }}
          formatter={(value: number, name: string) => [`${value}`, name === 'isPrediction' ? 'Predicted' : 'Historical']}
          labelFormatter={(time) => `Time: ${time}`}
        />
        <Legend 
          payload={[
            { value: 'Historical Data', type: 'line', color: '#3b82f6' },
            { value: 'AI Prediction', type: 'line', color: '#10b981' }
          ]}
        />
        
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
          dataKey="value" 
          stroke="#10b981" 
          strokeDasharray="5 5" 
          dot={{ r: 3 }} 
          activeDot={{ r: 6 }} 
          strokeWidth={2}
          name="Prediction"
          connectNulls
          data={combinedData.filter(d => d.isPrediction)}
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
