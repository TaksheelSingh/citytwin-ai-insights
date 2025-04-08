
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TrafficData {
  currentLevel: number;
  change: number;
  prediction: number;
  hotspots: string[];
}

interface TrafficOverviewProps {
  data: TrafficData;
  isOverview: boolean;
}

const TrafficOverview: React.FC<TrafficOverviewProps> = ({ data, isOverview }) => {
  const getTrafficColor = (level: number) => {
    if (level < 4) return 'bg-green-500';
    if (level < 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) return { icon: '↑', color: 'text-red-500' };
    if (change < 0) return { icon: '↓', color: 'text-green-500' };
    return { icon: '→', color: 'text-gray-500' };
  };

  const changeIndicator = getChangeIndicator(data.change);

  if (isOverview) {
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold">{data.currentLevel}</span>
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
          <div className={cn("text-sm font-medium flex items-center", changeIndicator.color)}>
            <span className="mr-1">{changeIndicator.icon}</span>
            <span>{Math.abs(data.change)}%</span>
          </div>
        </div>
        <Progress value={data.currentLevel * 10} className={cn("h-2", getTrafficColor(data.currentLevel))} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium">Current Congestion</span>
          <span className="text-sm text-muted-foreground">{data.currentLevel}/10</span>
        </div>
        <Progress value={data.currentLevel * 10} className={cn("h-2", getTrafficColor(data.currentLevel))} />
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm">Prediction (next hour)</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{data.prediction}/10</span>
          <div className={cn("text-xs font-medium", changeIndicator.color)}>
            <span>{changeIndicator.icon} {Math.abs(data.change)}%</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Congestion Hotspots</h4>
        <ul className="text-sm space-y-1">
          {data.hotspots.map((hotspot, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
              <span>{hotspot}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrafficOverview;
