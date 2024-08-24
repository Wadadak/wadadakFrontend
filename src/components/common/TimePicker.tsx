'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import Button from './Button';

interface TimePickerProps {
  onTimeChange: (time: string | null) => void;
  initialTime?: string | null;
  error?: string;
}

const TimePicker = ({
  onTimeChange,
  initialTime = null,
  error,
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(
    initialTime || null,
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      const newTime = DateTime.fromJSDate(time).toFormat('HH:mm');
      setSelectedTime(newTime);
      setIsDatePickerOpen(false); // 시간 선택 후 드롭다운 닫기
      onTimeChange(newTime);
    }
  };

  const clearSelectedTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 방지
    setSelectedTime(null);
    onTimeChange(null);
  };

  return (
    <div className="relative inline-block">
      <div onClick={toggleDatePicker} className="cursor-pointer">
        <DatePicker
          selected={
            selectedTime ? new Date(`1970-01-01T${selectedTime}:00`) : null
          }
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
          className={`input input-bordered max-w-xs ${error && 'textarea-error'}`}
          placeholderText="시간을 선택하세요"
          open={isDatePickerOpen} // 드롭다운 상태
          onClickOutside={() => setIsDatePickerOpen(false)} // 드롭다운 외부 클릭 시 닫기
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
