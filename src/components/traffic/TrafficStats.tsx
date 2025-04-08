
import React from 'react';
import { cn } from '@/lib/utils';

interface TrafficStat {
  title: string;
  value: string | number;
  change: number;
  description: string;
  format?: string;
}

interface TrafficStatsProps {
  stat: TrafficStat;
}

const TrafficStats: React.FC<TrafficStatsProps> = ({ stat }) => {
  const getChangeIndicator = (change: number) => {
    if (change > 0) return { icon: '↑', color: 'text-red-500' };
    if (change < 0) return { icon: '↓', color: 'text-green-500' };
    return { icon: '→', color: 'text-gray-500' };
  };

  const changeIndicator = getChangeIndicator(stat.change);

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">{stat.value}</div>
        <div className={cn("text-sm font-medium flex items-center", changeIndicator.color)}>
          <span className="mr-1">{changeIndicator.icon}</span>
          <span>{Math.abs(stat.change)}%</span>
        </div>
      </div>
      {stat.format && <div className="text-xs text-muted-foreground">{stat.format}</div>}
    </div>
  );
};

export default TrafficStats;
