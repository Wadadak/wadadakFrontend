'use client';

import React, { useState } from 'react';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import Dropdown from '../common/Dropdown';
import TimePicker from '../common/TimePicker';
import Label from '../common/Label';
import { mockActivityRegions } from '@/mocks/mockData/mockActivityRegions';

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

interface CreateRunningInfo {
  id?: number; // 수정 시 필요
  week: number;
  count: number;
  dayOfWeek: string[];
  activityRegion: string;
  time?: string[];
}

interface RunningInfoFormProps {
  initialInfo: CreateRunningInfo | null;
  onSave: (info: CreateRunningInfo) => void;
  onCancel: () => void;
}

const RunningInfoForm = ({
  initialInfo,
  onSave,
  onCancel,
}: RunningInfoFormProps) => {
  const [activityRegion, setActivityRegion] = useState(
    initialInfo?.activityRegion || '',
  );
  const [week, setWeek] = useState(initialInfo?.week || 1);
  const [count, setCount] = useState(initialInfo?.count || 1);
  const [dayOfWeek, setDayOfWeek] = useState<string[]>(
    initialInfo?.dayOfWeek || [],
  );
  const [times, setTimes] = useState<string[]>(initialInfo?.time || []);

  // 요일 선택
  const handleWeekdayChange = (newSelectedValues: string[]) => {
    setDayOfWeek(newSelectedValues);
  };

  const handleAddTime = (time: Date) => {
    setTimes((prev) => [...prev, time.toISOString().substring(11, 16)]);
  };

  const handleRemoveTime = (index: number) => {
    setTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const requestData: CreateRunningInfo = {
      week,
      count,
      dayOfWeek,
      activityRegion,
      time: times.length > 0 ? times : undefined, // 선택된 시간이 있을 경우 저장
    };

    // 수정 시 기존 ID를 포함해서 서버로 전송
    if (initialInfo) {
      requestData.id = initialInfo.id;
    }

    onSave(requestData);
  };

  return (
    <>
      <p className="text-center text-3xl font-bold">
        {initialInfo ? '정기 러닝 정보 수정' : '정기 러닝 정보 추가'}
      </p>
      <Label label="활동 지역" required>
        <Dropdown
          options={mockActivityRegions}
          placeholder="활동 지역"
          onChange={(value) => setActivityRegion(value as string)}
          required
        />
      </Label>
      <Label label="주기" required>
        <Dropdown
          options={frequencyOptions}
          placeholder="주기"
          onChange={(value) => setWeek(value as number)}
          required
        />
      </Label>
      <Label label="빈도" required>
        <Dropdown
          options={timesOptions}
          placeholder="빈도"
          onChange={(value) => setCount(value as number)}
        />
      </Label>
      <Label label="요일(복수 선택)" required>
        <CheckBox
          options={weekdayOptions}
          multiple
          selectedValues={dayOfWeek}
          onChange={handleWeekdayChange}
        />
      </Label>
      <Label label="시간(복수 선택)">
        <TimePicker selectedTimes={times} />
      </Label>
      {times.length > 0 && (
        <ul className="mt-2">
          {times.map((time, index) => (
            <li key={index} className="flex justify-between">
              <span>{time}</span>
              <Button size="sm" onClick={() => handleRemoveTime(index)}>
                삭제
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RunningInfoForm;
