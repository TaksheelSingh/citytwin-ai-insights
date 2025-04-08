
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface EnergyData {
  currentUsage: number;
  capacity: number;
  change: number;
  prediction: number;
  sources: {
    name: string;
    percentage: number;
  }[];
}

interface EnergyOverviewProps {
  data: EnergyData;
  isOverview: boolean;
}

const EnergyOverview: React.FC<EnergyOverviewProps> = ({ data, isOverview }) => {
  const percentOfCapacity = (data.currentUsage / data.capacity) * 100;
  
  const getEnergyColor = (percent: number) => {
    if (percent < 60) return 'bg-green-500';
    if (percent < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getChangeIndicator = (change: number) => {
    // For energy, negative change is good (lower usage = more efficient)
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
            <span className="text-2xl font-bold">{data.currentUsage.toLocaleString()}</span>
            <span className="text-xs ml-1 text-muted-foreground">kWh</span>
          </div>
          <div className={cn("text-sm font-medium flex items-center", changeIndicator.color)}>
            <span className="mr-1">{changeIndicator.icon}</span>
            <span>{Math.abs(data.change)}%</span>
          </div>
        </div>
        <Progress value={percentOfCapacity} className={cn("h-2", getEnergyColor(percentOfCapacity))} />
        <div className="text-xs text-muted-foreground">{percentOfCapacity.toFixed(1)}% of capacity</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium">Current Usage</span>
          <span className="text-sm text-muted-foreground">{data.currentUsage.toLocaleString()} kWh</span>
        </div>
        <Progress value={percentOfCapacity} className={cn("h-2", getEnergyColor(percentOfCapacity))} />
        <div className="text-xs text-right text-muted-foreground">Capacity: {data.capacity.toLocaleString()} kWh</div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm">Prediction (next day)</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{data.prediction.toLocaleString()} kWh</span>
          <div className={cn("text-xs font-medium", changeIndicator.color)}>
            <span>{changeIndicator.icon} {Math.abs(data.change)}%</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Energy Sources</h4>
        <div className="space-y-2">
          {data.sources.map((source, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{source.name}</span>
                <span>{source.percentage}%</span>
              </div>
              <Progress value={source.percentage} className="h-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyOverview;
