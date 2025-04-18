import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Filter, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

const AirQualityFilters = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [city, setCity] = useState("delhi");
  const [aqiThreshold, setAQIThreshold] = useState([100]);

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

      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="delhi">Delhi</SelectItem>
          <SelectItem value="mumbai">Mumbai</SelectItem>
          <SelectItem value="bangalore">Bangalore</SelectItem>
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
              <Label>AQI Threshold</Label>
              <Slider 
                defaultValue={aqiThreshold} 
                max={300} 
                step={10}
                onValueChange={setAQIThreshold}
              />
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Good</span>
                <span className="text-xs text-muted-foreground">Hazardous</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pollutant Focus</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select pollutant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pollutants</SelectItem>
                  <SelectItem value="pm25">PM2.5</SelectItem>
                  <SelectItem value="pm10">PM10</SelectItem>
                  <SelectItem value="ozone">Ozone (O₃)</SelectItem>
                  <SelectItem value="no2">Nitrogen Dioxide (NO₂)</SelectItem>
                  <SelectItem value="so2">Sulfur Dioxide (SO₂)</SelectItem>
                  <SelectItem value="co">Carbon Monoxide (CO)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AirQualityFilters;
