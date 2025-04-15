
import React, { useState } from 'react'; // Ensure useState is imported from React

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { fetchAirQualityData } from '@/api/airQuality';
import AirQualityMap from './AirQualityMap';
import AirQualityChart from './AirQualityChart';
import AirQualityStats from './AirQualityStats';
import AirQualityFilters from './AirQualityFilters';
import { AlertCircle } from 'lucide-react';

const AirQualityDashboard = () => {
  
const [selectedCity, setSelectedCity] = useState("delhi");
const { data, isLoading, error } = useQuery({
  queryKey: ['airQualityData', selectedCity],
  queryFn: () => fetchAirQualityData(selectedCity),
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
            <p>Unable to load air quality data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Air Quality</h1>
          <p className="text-muted-foreground">
            Real-time air quality monitoring and forecast data.
          </p>
        </div>
        <AirQualityFilters />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <AirQualityStats stat={stat} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="map">AQI Map</TabsTrigger>
          <TabsTrigger value="analysis">Trend Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <AirQualityMap aqiData={data?.mapData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Index Over Time</CardTitle>
              <CardDescription>
                Historical AQI readings and ML-based forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <AirQualityChart data={data?.historicalData} predictions={data?.predictions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AirQualityDashboard;
