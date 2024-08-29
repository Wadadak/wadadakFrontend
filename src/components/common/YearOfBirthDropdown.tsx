import React from 'react';
import Dropdown from './Dropdown';

interface YearOfBirthDropdownProps {
  selectedYear: number | null;
  onYearChange: (year: number) => void;
  placeholder?: string;
  error?: string; // 에러 메시지 프롭스
}

const YearOfBirthDropdown = ({
  selectedYear,
  onYearChange,
  placeholder = '',
  error,
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
      selectedValue={selectedYear ? String(selectedYear) : undefined}
      placeholder={placeholder}
      error={error}
    />
  );
};

export default YearOfBirthDropdown;
