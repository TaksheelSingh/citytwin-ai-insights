import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface AirQualityData {
  aqi: number;
  change: number;
  prediction: number;
  pollutants: {
    name: string;
    level: number;
  }[];
}

interface AirQualityOverviewProps {
  data: AirQualityData;
  isOverview: boolean;
}

const AirQualityOverview: React.FC<AirQualityOverviewProps> = ({ data, isOverview }) => {
  // Function to determine AQI color
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to get AQI status
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  // Function to get change indicator
  const getChangeIndicator = (change: number) => {
    if (change > 0) return { icon: '↑', color: 'text-red-500' };
    if (change < 0) return { icon: '↓', color: 'text-green-500' };
    return { icon: '→', color: 'text-gray-500' };
  };

  // Get the change indicator based on the change in AQI
  const changeIndicator = getChangeIndicator(data.change);

  if (isOverview) {
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold">{data.aqi}</span>
            <span className="text-xs ml-1 text-muted-foreground">AQI</span>
          </div>
          <div className={cn("text-sm font-medium flex items-center", changeIndicator.color)}>
            <span className="mr-1">{changeIndicator.icon}</span>
            <span>{Math.abs(data.change)}%</span>
          </div>
        </div>
        <Progress value={(data.aqi / 300) * 100} className={cn("h-2", getAQIColor(data.aqi))} />
        <div className="text-xs text-muted-foreground">Status: {getAQIStatus(data.aqi)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium">Current AQI</span>
          <span className="text-sm text-muted-foreground">{data.aqi} - {getAQIStatus(data.aqi)}</span>
        </div>
        <Progress value={(data.aqi / 300) * 100} className={cn("h-2", getAQIColor(data.aqi))} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm">Prediction (24h)</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{data.prediction}</span>
          <div className={cn("text-xs font-medium", changeIndicator.color)}>
            <span>{changeIndicator.icon} {Math.abs(data.change)}%</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Key Pollutants</h4>
        <div className="space-y-2">
          {data.pollutants.map((pollutant, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{pollutant.name}</span>
                <span>{pollutant.level}%</span>
              </div>
              <Progress value={pollutant.level} className="h-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirQualityOverview;
