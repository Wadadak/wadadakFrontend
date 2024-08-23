'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import Button from '@/components/common/Button';

interface TimePickerProps {
  selectedTimes: string[];
  onTimeChange: (times: string[]) => void;
}

const TimePicker = ({ selectedTimes, onTimeChange }: TimePickerProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      const newTime = DateTime.fromJSDate(time).toFormat('HH:mm');
      onTimeChange([...selectedTimes, newTime]);
      setIsDatePickerOpen(false); // 시간 선택 후 피커를 닫음
    }
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
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="HH:mm"
            className="p-2 border border-gray-200 rounded shadow-lg"
            inline
            onClickOutside={toggleDatePicker}
          />
        </div>
      )}

      {selectedTimes.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedTimes.map((time, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md rounded-lg py-2 px-4 flex flex-row justify-between items-center"
            >
              <span>{time}</span>
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
