'use client';

import React, { useState } from 'react';
import DateOnlyPicker from '../common/DateOnlyPicker';
import TimePicker from '../common/TimePicker';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';
import Label from '../common/Label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { createRunningSchedule } from '@/apis/crew/runningScheduleService';
import { ScheduleRequest, ScheduleResponse } from '@/types/crewTypes';

const CategoryOptions = [
  { id: 'REGULAR', name: '정기 러닝' },
  { id: 'ON_DEMAND', name: '번개 러닝' },
];

const RunningScheduleForm = () => {
  const { crewId } = useParams(); // useParams로 crewId 가져오기
  const crewIdNumber = parseInt(crewId as string, 10); // 문자열을 숫자로 변환
  const queryClient = useQueryClient();
  const router = useRouter();

  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<'REGULAR' | 'ON_DEMAND'>('REGULAR');
  const [date, setDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [memo, setMemo] = useState<string>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const mutation = useMutation<ScheduleResponse, Error, ScheduleRequest>({
    mutationFn: async (
      newSchedule: ScheduleRequest,
    ): Promise<ScheduleResponse> =>
      createRunningSchedule(crewIdNumber, newSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduleList'] });
      alert('일정이 성공적으로 등록되었습니다!');
      router.push(`/my-crews/${crewId}/schedule`);
    },
    onError: (error: Error) => {
      console.error('일정 등록 중 오류 발생:', error);
    },
  });

  const handleSubmit = () => {
    if (validateForm()) {
      const newSchedule: ScheduleRequest = {
        title,
        category,
        date: date!,
        startTime: startTime!,
        endTime,
        memo,
        location: location!,
      };

      mutation.mutate(newSchedule);
    }
  };

  const handleCategoryChange = (values?: (string | number)[]) => {
    if (values && values.length > 0) {
      setCategory(values[0] as 'REGULAR' | 'ON_DEMAND');
    }
  };

  return (
    <>
      <div className="pb-5">
        <Label label="카테고리" required>
          <CheckBox
            options={CategoryOptions}
            selectedValues={[category]}
            onChange={handleCategoryChange}
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
          color="accent"
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
