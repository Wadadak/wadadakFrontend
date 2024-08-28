import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { RunningSchedule } from '@/types/crewTypes';
import { mockSchedules } from '@/components/running-schedule/CrewRunningSchedule';

export const useRunningSchedule = (initialData?: RunningSchedule) => {
  const router = useRouter();
  const { crewId } = useParams();
  const [schedule, setSchedule] = useState<RunningSchedule | null>(
    initialData || null,
  );

  useEffect(() => {
    if (!initialData && id) {
      // TODO: 실제 API를 통해 일정 데이터를 가져옵니다.
      const existingSchedule = mockSchedules.find((s) => s.activityId === id);
      if (existingSchedule) {
        setSchedule(existingSchedule);
      } else {
        alert('해당 일정을 찾을 수 없습니다.');
        router.push(`/my-crews/${crewId}/schedule`);
      }
    }
  }, [id, initialData, router]);

  const saveSchedule = (newSchedule: RunningSchedule) => {
    if (schedule) {
      // 수정 로직
      console.log('일정 업데이트:', newSchedule);
      // TODO: 실제 API 호출
    } else {
      // 생성 로직
      console.log('새로운 일정 생성:', newSchedule);
      // TODO: 실제 API 호출
    }
    router.push('/schedules');
  };

  return {
    schedule,
    saveSchedule,
  };
};
