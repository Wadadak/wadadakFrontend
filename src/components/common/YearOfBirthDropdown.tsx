import React from 'react';
import Dropdown from './Dropdown';

interface YearOfBirthDropdownProps {
  selectedYear: number | null;
  onYearChange: (year: number) => void;
  placeholder?: string;
}

const YearOfBirthDropdown = ({
  selectedYear,
  onYearChange,
  placeholder = '',
}: YearOfBirthDropdownProps) => {
  const startYear = 1900;
  const endYear = new Date().getFullYear();

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, idx) => startYear + idx,
  );

  const options = years.map((year) => ({
    id: String(year),
    name: String(year),
  }));

  return (
    <Dropdown
      options={options}
      onChange={(value) => onYearChange(Number(value))}
      selectedValues={selectedYear ? [String(selectedYear)] : []}
      placeholder={placeholder}
    />
  );
};

export default YearOfBirthDropdown;
