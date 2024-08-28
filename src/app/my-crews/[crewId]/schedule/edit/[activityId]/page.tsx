'use client';

import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import RunningScheduleForm from '@/components/running-schedule/RunningScheduleForm';
import { useRouter, useParams } from 'next/navigation';
import { RunningSchedule } from '@/types/crewTypes';
import { mockSchedules } from '@/components/running-schedule/CrewRunningSchedule';

const EditSchedulePage = () => {
  const router = useRouter();
  const { activityId, crewId } = useParams();

  const handleSave = (schedule: RunningSchedule) => {
    // TODO API를 통해 새로운 일정을 저장
    console.log('새로운 일정 생성:', schedule);
    router.push(`/my-crews/${crewId}/schedule`);
  };

  return (
    <MyCrewLayout titleText="러닝 일정 생성">
      <RunningScheduleForm onSave={handleSave} currentUser="하이요" />
    </MyCrewLayout>
  );
};

export default EditSchedulePage;
