'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import { RegularRunningInfo } from '@/types/crewTypes';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import Dropdown from '../common/Dropdown';
import DatePicker from 'react-datepicker';
import Label from '../common/Label';
import { mockActivityRegions } from '@/mocks/mockData/mockActivityRegions';

interface RunningInfoFormProps {
  initialInfo: RegularRunningInfo | null;
  onSave: (info: RegularRunningInfo) => void;
  onCancel: () => void;
}

// 주기 옵션
const frequencyOptions = [
  { id: 1, name: '1주' },
  { id: 2, name: '2주' },
  { id: 3, name: '3주' },
  { id: 4, name: '4주' },
  { id: 5, name: '5주' },
  { id: 6, name: '6주' },
  { id: 7, name: '7주' },
  { id: 8, name: '8주' },
  { id: 9, name: '9주' },
  { id: 10, name: '10주' },
  { id: 11, name: '11주' },
  { id: 12, name: '12주' },
  { id: 0, name: '기타' },
];

const timesOptions = [
  { id: 1, name: '1번' },
  { id: 2, name: '2번' },
  { id: 3, name: '3번' },
  { id: 4, name: '4번' },
  { id: 5, name: '5번' },
  { id: 6, name: '6번' },
  { id: 7, name: '7번' },
];

// 요일 옵션
const weekdayOptions = [
  { id: 'monday', name: '월요일' },
  { id: 'tuesday', name: '화요일' },
  { id: 'wednesday', name: '수요일' },
  { id: 'thursday', name: '목요일' },
  { id: 'friday', name: '금요일' },
  { id: 'saturday', name: '토요일' },
  { id: 'sunday', name: '일요일' },
];

const RunningInfoForm = ({
  initialInfo,
  onSave,
  onCancel,
}: RunningInfoFormProps) => {
  const [location, setLocation] = useState(initialInfo?.location || '');
  const [weeks, setWeeks] = useState(initialInfo?.frequency.weeks || 1);
  const [times, setTimes] = useState(initialInfo?.frequency.times || 1);
  const [weekdays, setWeekdays] = useState<string[]>(
    initialInfo?.weekdays || [],
  );
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    initialInfo?.time ? new Date(initialInfo.time) : null,
  );

  // 요일 선택
  const handleWeekdayChange = (day: string) => {
    setWeekdays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day); // 이미 선택된 경우 제거
      } else {
        return [...prev, day]; // 선택되지 않은 경우 추가
      }
    });
  };

  const handleSubmit = () => {
    const info: RegularRunningInfo = {
      id: initialInfo ? initialInfo.id : Date.now(),
      frequency: { weeks, times },
      weekdays,
      location,
      time: selectedTime ? selectedTime.toISOString() : undefined,
    };
    onSave(info);
  };

  return (
    <>
      <p className="text-center text-3xl">
        {initialInfo ? '정기 러닝 정보 수정' : '정기 러닝 정보 추가'}
      </p>
      <Label label="활동 지역">
        <Dropdown
          options={mockActivityRegions}
          placeholder="활동 지역"
          onChange={(id) => setLocation(value as string)}
        />
      </Label>
      <Label label="주기">
        <Dropdown
          options={frequencyOptions}
          placeholder="주기"
          onChange={(value) => setWeeks(value as number)}
        />
      </Label>
    </>
  );
};

export default RegularRunningInfo;
