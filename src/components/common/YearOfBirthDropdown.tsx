import React from 'react';
import Dropdown from './Dropdown';

interface YearOfBirthDropdownProps {
  selectedYear: number | null;
  onYearChange: (year: number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // 첫 번째 옵션(placeholder) disabled 여부
  errorMessage?: string;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
}

const YearOfBirthDropdown = ({
  selectedYear,
  onYearChange,
  placeholder = '',
  required = false,
  width = 'xs',
  disabled = true,
  errorMessage,
}: YearOfBirthDropdownProps) => {
  const startYear = 1900;
  const endYear = new Date().getFullYear();

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, idx) => endYear - idx,
  );

  const options = years.map((year) => ({
    id: year,
    name: String(year),
  }));

  return (
    <Dropdown
      options={options}
      onChange={(value) => onYearChange(Number(value))}
      selectedValue={selectedYear ? String(selectedYear) : undefined}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      width={width}
    />
  );
};

export default YearOfBirthDropdown;
