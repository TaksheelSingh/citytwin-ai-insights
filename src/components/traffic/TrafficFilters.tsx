
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Filter, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

const TrafficFilters = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [area, setArea] = useState("downtown");
  const [congestionLevel, setCongestionLevel] = useState([5]);
  
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
      
      <Select value={area} onValueChange={setArea}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="downtown">Downtown</SelectItem>
          <SelectItem value="highway">Highway Network</SelectItem>
          <SelectItem value="residential">Residential Areas</SelectItem>
          <SelectItem value="all">Entire City</SelectItem>
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
              <Label>Minimum Congestion Level</Label>
              <Slider 
                defaultValue={congestionLevel} 
                max={10} 
                step={1}
                onValueChange={setCongestionLevel}
              />
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Low</span>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select defaultValue="real-time">
                <SelectTrigger>
                  <SelectValue placeholder="Data Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-time">Real-Time</SelectItem>
                  <SelectItem value="historical">Historical</SelectItem>
                  <SelectItem value="prediction">AI Prediction</SelectItem>
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

export default TrafficFilters;
