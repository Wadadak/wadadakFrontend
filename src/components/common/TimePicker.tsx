'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import Button from './Button';

interface TimePickerProps {
  onTimeChange: (time?: string) => void;
  initialTime?: string;
  error?: string;
  placeholder?: string;
}

const TimePicker = ({
  onTimeChange,
  initialTime,
  error,
  placeholder,
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    initialTime,
  );
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const toggleTimePicker = () => {
    setIsTimePickerOpen((prev) => !prev);
  };

  const handleTimeChange = (time?: Date) => {
    if (time) {
      const newTime = DateTime.fromJSDate(time).toFormat('HH:mm');
      setSelectedTime(newTime);
      setIsTimePickerOpen(false); // 시간 선택 후 드롭다운 닫기
      onTimeChange(newTime);
    } else {
      setSelectedTime(undefined);
      onTimeChange(undefined);
    }
  };

  const clearSelectedTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 방지
    setSelectedTime(undefined);
    onTimeChange(undefined);
  };

  return (
    <div className="relative inline-block">
      <div onClick={toggleTimePicker} className="cursor-pointer">
        <DatePicker
          selected={
            selectedTime ? new Date(`1970-01-01T${selectedTime}:00`) : undefined
          }
          onChange={(date) => handleTimeChange(date || undefined)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
          className={`input input-bordered max-w-xs ${error && 'textarea-error'}`}
          placeholderText={placeholder}
          open={isTimePickerOpen} // 드롭다운 상태
          onClickOutside={() => setIsTimePickerOpen(false)}
        />
      </div>

      {selectedTime && (
        <div className="mt-4 flex items-center gap-2">
          <p>
            선택된 시간: <strong>{selectedTime}</strong>
          </p>
          <Button onClick={clearSelectedTime} size="sm">
            선택 취소
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TimePicker;
