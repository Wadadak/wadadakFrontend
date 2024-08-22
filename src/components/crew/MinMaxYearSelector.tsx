import React from 'react';
import YearOfBirthDropdown from '../common/YearOfBirthDropdown';

interface MinMaxYearProps {
  minAge: number | null;
  maxAge: number | null;
  onMinAgeChange: (age: number) => void;
  onMaxAgeChange: (age: number) => void;
  error?: string;
}

const MinMaxYearSelector = ({
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
  error,
}: MinMaxYearProps) => {
  return (
    <div className="flex flex-row space-x-4">
      <YearOfBirthDropdown
        selectedYear={minAge}
        onYearChange={onMinAgeChange}
        placeholder="최소 연령"
        error={error}
      />
      <YearOfBirthDropdown
        selectedYear={maxAge}
        onYearChange={onMaxAgeChange}
        placeholder="최대 연령"
        error={error}
      />
    </div>
  );
};

export default MinMaxYearSelector;
