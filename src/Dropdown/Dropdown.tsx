import React from 'react';

interface DropdownProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({ setCity }) => {
  const cities = ['Delhi', 'Mumbai', 'Bangalore'];

  return (
    <select
      onChange={(e) => setCity(e.target.value)}
      className="border p-2 rounded-md"
    >
      {cities.map((city) => (
        <option key={city} value={city.toLowerCase()}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
