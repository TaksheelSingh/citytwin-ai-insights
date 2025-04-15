import React from 'react';

interface DropdownProps {
  setCity: (city: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ setCity }) => {
  return (
    <div className="flex flex-col gap-2">
      <select
        className="p-2 border rounded"
        onChange={(e) => setCity(e.target.value)}
        defaultValue="delhi"
      >
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="bangalore">Bangalore</option>
      </select>
    </div>
  );
};

export default Dropdown; // Ensure default export
