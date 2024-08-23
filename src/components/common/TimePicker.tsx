// 시간 복수로 선택
'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/common/Button';

const TimePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false); // 날짜 선택 후 피커를 닫음
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <Button onClick={toggleDatePicker}>시간 선택</Button>
      {isDatePickerOpen && (
        <div className="absolute z-10 mt-2">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy/MM/dd h:mm aa"
            className="p-2 border border-gray-300 rounded shadow-lg"
            inline // DatePicker를 인라인으로 표시
          />
        </div>
      )}
    </div>
  );
};

export default TimePicker;
