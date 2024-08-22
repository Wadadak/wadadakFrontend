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

const RegularRunningInfo = () => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === id);

  const [runningInfo, setRunningInfo] = useState<RegularRunningInfo[]>(
    crew?.regularRunningInfo || [],
  );

  return <div>RegularRunningInfo</div>;
};

interface RunningInfoFormProps {
  initialInfo: RegularRunningInfo | null;
  onSave: (info: RegularRunningInfo) => void;
  onCancel: () => void;
}

// 주기 옵션
const frequencyOptions = [
  { value: 1, label: '1주' },
  { value: 2, label: '2주' },
  { value: 3, label: '3주' },
  { value: 4, label: '4주' },
  { value: 5, label: '5주' },
  { value: 6, label: '6주' },
  { value: 7, label: '7주' },
  { value: 8, label: '8주' },
  { value: 9, label: '9주' },
  { value: 10, label: '10주' },
  { value: 11, label: '11주' },
  { value: 12, label: '12주' },
];

const timesOptions = [
  { value: 1, label: '1번' },
  { value: 2, label: '2번' },
  { value: 3, label: '3번' },
  { value: 4, label: '4번' },
  { value: 5, label: '5번' },
  { value: 6, label: '6번' },
  { value: 7, label: '7번' },
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
      <Label label="빈도">
        <div className="flex flex-row space-x-4">
          <Dropdown placeholder="주기" onChange={(e) => setWeeks(e)} />
          <Dropdown placeholder="횟수" />
        </div>
      </Label>
    </>
  );
};

export default RegularRunningInfo;
