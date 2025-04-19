import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Select component for the dropdown
import { Label } from '@/components/ui/label';

interface DropdownProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({ setCity }) => {
  const handleCityChange = (value: string) => {
    setCity(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="city-select" className="text-sm">
        Select City:
      </Label>
      <Select id="city-select" onValueChange={handleCityChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Choose a City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="delhi">Delhi</SelectItem>
          <SelectItem value="mumbai">Mumbai</SelectItem>
          <SelectItem value="bangalore">Bangalore</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
