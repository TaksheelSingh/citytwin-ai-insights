
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface EnergyDataPoint {
  time: string;
  value: number;
}

interface EnergyChartProps {
  data?: EnergyDataPoint[];
  predictions?: EnergyDataPoint[];
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data = [], predictions = [] }) => {
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
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={combinedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          padding={{ left: 30, right: 30 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          label={{ value: 'Energy Consumption (kWh)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 4, border: '1px solid #ddd' }}
          formatter={(value: number, name: string) => [`${value.toLocaleString()} kWh`, name === 'isPrediction' ? 'Predicted' : 'Historical']}
          labelFormatter={(time) => `Time: ${time}`}
        />
        <Legend 
          payload={[
            { value: 'Historical Data', type: 'line', color: '#3b82f6' },
            { value: 'AI Prediction', type: 'line', color: '#10b981' }
          ]}
        />
        
        {/* Historical data area */}
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#3b82f6" 
          fill="#3b82f680" 
          name="Historical"
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
        
        {/* Prediction area */}
        <Area 
          type="monotone" 
          dataKey="isPrediction" 
          stroke="#10b981" 
          fill="#10b98150" 
          name="Prediction"
          strokeDasharray="5 5"
          activeDot={{ r: 6 }}
          strokeWidth={2}
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
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EnergyChart;
