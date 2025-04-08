
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { fetchTrafficData } from '@/api/traffic';
import TrafficMap from './TrafficMap';
import TrafficChart from './TrafficChart';
import TrafficStats from './TrafficStats';
import TrafficFilters from './TrafficFilters';
import { AlertCircle } from 'lucide-react';

const TrafficDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trafficData'],
    queryFn: fetchTrafficData,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-red-50 text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <CardTitle className="text-lg">Error Loading Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p>Unable to load traffic data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Traffic Analysis</h1>
          <p className="text-muted-foreground">
            Real-time traffic flow and predictive congestion data.
          </p>
        </div>
        <TrafficFilters />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficStats stat={stat} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="map">Traffic Map</TabsTrigger>
          <TabsTrigger value="analysis">Time Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <TrafficMap trafficData={data?.mapData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Flow Over Time</CardTitle>
              <CardDescription>
                Historical and predicted traffic patterns based on LSTM analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <TrafficChart data={data?.historicalData} predictions={data?.predictions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrafficDashboard;
