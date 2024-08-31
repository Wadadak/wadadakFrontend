'use client';

import { RunningSchedule } from '@/types/crewTypes';
import React, { useEffect, useState } from 'react';
import DateOnlyPicker from '../common/DateOnlyPicker';
import TimePicker from '../common/TimePicker';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';
import Label from '../common/Label';

const CategoryOptions = [
  { id: 'REGULAR', name: '정기 러닝' },
  { id: 'ON_DEMAND', name: '번개 러닝' },
];

interface RunningScheduleFormProps {
  initialInfo?: RunningSchedule | null;
  onSave: (schedule: RunningSchedule) => void;
  currentUser: string;
}

const RunningScheduleForm = ({
  onSave,
  initialInfo,
  currentUser,
}: RunningScheduleFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'REGULAR' | 'ON_DEMAND'>('REGULAR');
  const [date, setDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialInfo) {
      setTitle(initialInfo.title);
      setCategory(initialInfo.category);
      setDate(initialInfo.date);
      setStartTime(initialInfo.startTime);
      setEndTime(initialInfo.endTime);
      setLocation(initialInfo.location);
      setMemo(initialInfo.memo);
    }
  }, [initialInfo]);

  // 유효성 검사
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // CHECK 필수 사항
    if (!category) {
      newErrors.category = '카테고리를 선택하세요.';
    }

    if (!date) {
      newErrors.date = '날짜를 선택하세요.';
    }

    if (!startTime) {
      newErrors.startTime = '시작 시간을 선택하세요.';
    }

    if (!location) {
      newErrors.location = '장소를 입력하세요.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newSchedule: RunningSchedule = {
        title,
        category,
        date,
        startTime,
        endTime,
        memo,
        location,
        author: currentUser,
      };

      // 수정 시 기존 ID를 포함해서 서버로 전송
      if (initialInfo && initialInfo.activityId) {
        newSchedule.activityId = initialInfo.activityId;
      }

      onSave(newSchedule);
    }
  };

  const handleCategoryChange = (value: 'REGULAR' | 'ON_DEMAND') => {
    setCategory(value);
  };

  return (
    <>
      <div className="pb-5">
        <Label label="카테고리" required>
          <CheckBox
            options={CategoryOptions}
            selectedValues={[category]}
            onChange={(values) =>
              handleCategoryChange(values[0] as 'REGULAR' | 'ON_DEMAND')
            }
            error={errors.category}
          />
        </Label>
        <Label label="활동명">
          <TextInput
            value={title}
            onChange={setTitle}
            placeholder="예 : 2024-12-31 정기"
          />
        </Label>
        <Label label="장소" required>
          <TextInput
            value={location}
            onChange={(value) => {
              setLocation(value);
              setErrors((prevErrors) => ({ ...prevErrors, location: '' }));
            }}
            placeholder="장소를 입력해주세요"
            required
            error={errors.location}
          />
        </Label>
        <Label label="날짜" required>
          <DateOnlyPicker
            initialDate={date}
            onDateChange={(newDate) => {
              setDate(newDate);
              setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
            }}
            error={errors.date}
          />
        </Label>
        <Label label="시작 시간" required>
          <TimePicker
            initialTime={startTime}
            onTimeChange={(newTime) => {
              setStartTime(newTime);
              setErrors((prevErrors) => ({ ...prevErrors, startTime: '' }));
            }}
            error={errors.startTime}
            placeholder="시작 시간"
          />
        </Label>
        <Label label="종료시간">
          <TimePicker
            initialTime={endTime}
            onTimeChange={(newTime) => setEndTime(newTime)}
            placeholder="종료 시간"
          />
        </Label>
        <Label label="메모">
          <TextInput
            value={memo}
            onChange={setMemo}
            placeholder="메모를 입력해주세요"
            maxLength={200}
            as="textarea"
          />
        </Label>
      </div>
      <div className="flex w-full justify-end">
        <Button
          wide={true}
          color="secondary"
          onClick={handleSubmit}
          type="submit"
        >
          제출하기
        </Button>
      </div>
    </>
  );
};

export default RunningScheduleForm;
