import React from 'react';
import Label from '../common/Label';
import YearOfBirthDropdown from '../common/YearOfBirthDropdown';

interface MinMaxYearProps {
  minAge: number | null;
  maxAge: number | null;
  onMinAgeChange: (age: number) => void;
  onMaxAgeChange: (age: number) => void;
}

const MinMaxYearSelector = ({
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
}: MinMaxYearProps) => {
  return (
    <div className="flex flex-row space-x-4">
      <YearOfBirthDropdown
        selectedYear={minAge}
        onYearChange={onMinAgeChange}
        placeholder="최소 연령"
      />
      <YearOfBirthDropdown
        selectedYear={maxAge}
        onYearChange={onMaxAgeChange}
        placeholder="최대 연령"
      />
    </div>
  );
};

export default MinMaxYearSelector;
