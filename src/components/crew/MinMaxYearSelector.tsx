import React from 'react';
import YearOfBirthDropdown from '../common/YearOfBirthDropdown';

interface MinMaxYearProps {
  minAge?: number;
  maxAge?: number;
  onMinAgeChange: (age?: number) => void;
  onMaxAgeChange: (age?: number) => void;
  errorMessage?: string;
}

const MinMaxYearSelector = ({
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
  errorMessage,
}: MinMaxYearProps) => {
  return (
    <div className="flex flex-row space-x-4">
      <YearOfBirthDropdown
        selectedYear={minAge}
        onYearChange={onMinAgeChange}
        placeholder="최소 연령"
        errorMessage={errorMessage}
      />
      <YearOfBirthDropdown
        selectedYear={maxAge}
        onYearChange={onMaxAgeChange}
        placeholder="최대 연령"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default MinMaxYearSelector;
