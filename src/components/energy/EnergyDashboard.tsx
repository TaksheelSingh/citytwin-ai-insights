
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { fetchEnergyData } from '@/api/energy';
import EnergyMap from './EnergyMap';
import EnergyChart from './EnergyChart';
import EnergyStats from './EnergyStats';
import EnergyFilters from './EnergyFilters';
import EnergyDistribution from './EnergyDistribution';
import { AlertCircle } from 'lucide-react';

const EnergyDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['energyData'],
    queryFn: fetchEnergyData,
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
            <p>Unable to load energy consumption data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Energy Consumption</h1>
          <p className="text-muted-foreground">
            Real-time energy usage monitoring and AI-powered efficiency insights.
          </p>
        </div>
        <EnergyFilters />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <EnergyStats stat={stat} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="distribution">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="distribution">Energy Distribution</TabsTrigger>
          <TabsTrigger value="map">Energy Map</TabsTrigger>
          <TabsTrigger value="trends">Usage Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="distribution" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Distribution by Sector</CardTitle>
              <CardDescription>
                Cluster analysis of energy consumption across different sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <EnergyDistribution data={data?.distribution} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <EnergyMap energyData={data?.mapData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Over Time</CardTitle>
              <CardDescription>
                Historical usage patterns and AI-predicted future consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <EnergyChart data={data?.historicalData} predictions={data?.predictions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnergyDashboard;
