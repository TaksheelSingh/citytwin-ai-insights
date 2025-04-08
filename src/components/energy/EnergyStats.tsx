
import React from 'react';
import { cn } from '@/lib/utils';

interface EnergyStat {
  title: string;
  value: string | number;
  change: number;
  description: string;
  format?: string;
}

interface EnergyStatsProps {
  stat: EnergyStat;
}

const EnergyStats: React.FC<EnergyStatsProps> = ({ stat }) => {
  const getChangeIndicator = (change: number) => {
    // For energy, negative change is typically good (less consumption = more efficient)
    if (change > 0) return { icon: '↑', color: 'text-red-500' };
    if (change < 0) return { icon: '↓', color: 'text-green-500' };
    return { icon: '→', color: 'text-gray-500' };
  };

  const changeIndicator = getChangeIndicator(stat.change);

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</div>
        <div className={cn("text-sm font-medium flex items-center", changeIndicator.color)}>
          <span className="mr-1">{changeIndicator.icon}</span>
          <span>{Math.abs(stat.change)}%</span>
        </div>
      </div>
      {stat.format && <div className="text-xs text-muted-foreground">{stat.format}</div>}
    </div>
  );
};

export default EnergyStats;
