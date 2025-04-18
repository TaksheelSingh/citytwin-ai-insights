import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchEnergyData } from '@/api/energy'; // Assuming this is the function to fetch energy data based on city

const EnergyFilters = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [area, setArea] = useState("all");
  const [city, setCity] = useState("delhi"); // New state for city
  const [energyData, setEnergyData] = useState<any>(null);

  useEffect(() => {
    // Fetch the data based on the selected city
    fetchEnergyData(city).then((data) => setEnergyData(data));
  }, [city]); // Update the data when the city changes

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {date ? format(date, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
      
      {/* Dropdown for selecting city */}
      <Select value={city} onValueChange={handleCityChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="delhi">Delhi</SelectItem>
          <SelectItem value="mumbai">Mumbai</SelectItem>
          <SelectItem value="bangalore">Bangalore</SelectItem>
        </SelectContent>
      </Select>
      
      {/* Area dropdown */}
      <Select value={area} onValueChange={setArea}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="residential">Residential</SelectItem>
          <SelectItem value="industrial">Industrial</SelectItem>
          <SelectItem value="public">Public Buildings</SelectItem>
          <SelectItem value="all">All Sectors</SelectItem>
        </SelectContent>
      </Select>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select defaultValue="day">
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">Last Hour</SelectItem>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Energy Sources</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="source-solar" defaultChecked />
                  <label htmlFor="source-solar" className="text-sm">Solar</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="source-wind" defaultChecked />
                  <label htmlFor="source-wind" className="text-sm">Wind</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="source-hydro" defaultChecked />
                  <label htmlFor="source-hydro" className="text-sm">Hydro</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="source-fossil" defaultChecked />
                  <label htmlFor="source-fossil" className="text-sm">Fossil Fuels</label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Display energy data based on the city */}
      {energyData && (
        <div className="mt-4">
          <h2>Energy Data for {city.charAt(0).toUpperCase() + city.slice(1)}</h2>
          <pre>{JSON.stringify(energyData, null, 2)}</pre> {/* Displaying energy data for the selected city */}
        </div>
      )}
    </div>
  );
};

export default EnergyFilters;
