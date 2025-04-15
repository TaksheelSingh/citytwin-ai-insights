import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { fetchOverviewData } from '@/api/dashboard';
import DashboardMap from './maps/DashboardMap';
import TrafficOverview from './traffic/TrafficOverview';
import AirQualityOverview from './air-quality/AirQualityOverview';
import EnergyOverview from './energy/EnergyOverview';
import DashboardFilters from './DashboardFilters';
import { AlertCircle } from 'lucide-react';
import Dropdown from '@/components/Dropdown'; // Ensure this path is correct

const Dashboard = () => {
  const [city, setCity] = useState<string>('delhi'); // Default to Delhi
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardOverview', city], // Pass city to refetch the data on city change
    queryFn: () => fetchOverviewData(city),
  });

  // Log data to check structure
  console.log(data);

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
            <p>Unable to load dashboard data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Smart City Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights and AI-powered predictions for urban management.
          </p>
        </div>
        {/* Dropdown for City Selection */}
        <Dropdown setCity={setCity} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Traffic Congestion</CardTitle>
            <CardDescription>Current traffic levels across the city</CardDescription>
          </CardHeader>
          <CardContent>
            {data && data.traffic ? (
              <TrafficOverview data={data.traffic} isOverview={true} />
            ) : (
              <div>Loading Traffic Data...</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Air Quality</CardTitle>
            <CardDescription>Average AQI levels and forecasts</CardDescription>
          </CardHeader>
          <CardContent>
            {data && data.airQuality ? (
              <AirQualityOverview data={data.airQuality} isOverview={true} />
            ) : (
              <div>Loading Air Quality Data...</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Energy Consumption</CardTitle>
            <CardDescription>Current energy usage patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {data && data.energy ? (
              <EnergyOverview data={data.energy} isOverview={true} />
            ) : (
              <div>Loading Energy Data...</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="map">City Map View</TabsTrigger>
          <TabsTrigger value="data">Data Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <DashboardMap />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Insights</CardTitle>
              </CardHeader>
              <CardContent>
                {data && data.traffic ? (
                  <TrafficOverview data={data.traffic} isOverview={false} />
                ) : (
                  <div>Loading Traffic Insights...</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Air Quality Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {data && data.airQuality ? (
                  <AirQualityOverview data={data.airQuality} isOverview={false} />
                ) : (
                  <div>Loading Air Quality Trends...</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Energy Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {data && data.energy ? (
                  <EnergyOverview data={data.energy} isOverview={false} />
                ) : (
                  <div>Loading Energy Distribution...</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
