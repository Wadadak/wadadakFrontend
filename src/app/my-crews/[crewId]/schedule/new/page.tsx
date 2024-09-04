'use client';

import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import RunningScheduleForm from '@/components/running-schedule/RunningScheduleForm';
import { useRouter, useParams } from 'next/navigation';

const NewSchedulePage = () => {
  return (
    <MyCrewLayout titleText="러닝 일정 생성">
      <RunningScheduleForm />
    </MyCrewLayout>
  );
};

export default NewSchedulePage;
