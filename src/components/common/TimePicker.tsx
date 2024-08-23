// 시간 복수로 선택
'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/common/Button';

interface TimePickerProps {
  selectedTimes: string[];
  onTimeChange: (times: string[]) => void;
}

const TimePicker = ({ selectedTimes, onTimeChange }: TimePickerProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      const newTime = time.toISOString().substring(11, 16); // "HH:mm" 형식
      onTimeChange([...selectedTimes, newTime]);
    }
    setIsDatePickerOpen(false); // 날짜 선택 후 피커를 닫음
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <Button onClick={toggleDatePicker} size="sm" wide>
        시간 선택
      </Button>
      {isDatePickerOpen && (
        <div className="absolute z-10 mt-2">
          <DatePicker
            selected={null}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            className="p-2 border border-gray-300 rounded shadow-lg"
            inline // DatePicker를 인라인으로 표시
          />
        </div>
      )}

      {selectedTimes.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {selectedTimes.map((time, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md rounded-lg p-2 flex justify-between items-center"
            >
              <span className="font-medium text-lg">{time}</span>
              <Button
                size="sm"
                color="accent"
                onClick={() =>
                  onTimeChange(selectedTimes.filter((_, i) => i !== index))
                }
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
