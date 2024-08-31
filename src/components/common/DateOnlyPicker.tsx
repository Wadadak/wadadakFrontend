'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import Button from './Button';

interface DatePickerProps {
  onDateChange: (date?: string) => void;
  initialDate?: string;
  error?: string;
}

const DateOnlyPicker = ({
  onDateChange,
  initialDate,
  error,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialDate,
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      const newDate = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
      setSelectedDate(newDate);
      setIsDatePickerOpen(false);
      onDateChange(newDate);
    } else {
      setSelectedDate(undefined);
      onDateChange(undefined);
    }
  };

  const clearSelectedDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 방지
    setSelectedDate(undefined);
    onDateChange(undefined);
  };

  return (
    <div className="relative inline-block">
      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : undefined}
        onChange={(date) => handleDateChange(date || undefined)}
        dateFormat="yyyy-MM-dd"
        className={`input input-bordered max-w-xs ${error && 'textarea-error'}`}
        placeholderText="날짜를 선택하세요"
      />

      {selectedDate && (
        <div className="mt-4 flex items-center gap-2">
          <p>
            선택된 날짜: <strong>{selectedDate}</strong>
          </p>
          <Button onClick={clearSelectedDate} size="sm">
            선택 취소
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateOnlyPicker;
