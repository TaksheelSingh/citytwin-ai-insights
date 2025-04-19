import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOverviewData } from '@/api/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrafficOverview from '../components/traffic/TrafficOverview';
import AirQualityOverview from '../components/air-quality/AirQualityOverview';
import EnergyOverview from '../components/energy/EnergyOverview';
import DashboardMap from '../components/maps/DashboardMap';
import { AlertCircle } from 'lucide-react';
import Dropdown from '@/components/Dropdown';
import AppLayout from '@/components/layout/AppLayout'; // ✅ Add layout wrapper

const Dashboard = () => {
  const [city, setCity] = useState<string>('delhi');

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardOverview', city],
    queryFn: () => fetchOverviewData(city),
  });

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
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
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Smart City Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time insights and AI-powered predictions for urban management.
            </p>
          </div>
          <Dropdown setCity={setCity} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Traffic Congestion</CardTitle>
              <CardDescription>Current traffic levels across the city</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.traffic ? (
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
              {data?.airQuality ? (
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
              {data?.energy ? (
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
                  {data?.traffic ? (
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
                  {data?.airQuality ? (
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
                  {data?.energy ? (
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
    </AppLayout>
  );
};

export default Dashboard;
