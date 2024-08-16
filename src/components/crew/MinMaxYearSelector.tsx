import React from 'react';
import Label from '../common/Label';
import YearOfBirthDropdown from '../common/YearOfBirthDropdown';

interface MinMaxYearProps {
  minYear: number | null;
  maxYear: number | null;
  onMinYearChange: (year: number) => void;
  onMaxYearChange: (year: number) => void;
}

const MinMaxYearSelector = ({
  minYear,
  maxYear,
  onMinYearChange,
  onMaxYearChange,
}: MinMaxYearProps) => {
  return (
    <Label label="연령대 제한">
      <YearOfBirthDropdown
        selectedYear={minYear}
        onYearChange={onMinYearChange}
        placeholder="최소 연령"
      />
      <YearOfBirthDropdown
        selectedYear={maxYear}
        onYearChange={onMaxYearChange}
        placeholder="최대 연령"
      />
    </Label>
  );
};

export default MinMaxYearSelector;
