'use client';

import { useUpcomingRunningSchedules } from '@/hooks/schedule/useUpcomingRunningSchedules';
import { useParams } from 'next/navigation';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import ScheduleTable from './ScheduleTable';

const SimpleSchedule = () => {
  const { crewId } = useParams(); // 크루 ID를 URL에서 가져옴
  const crewIdNumber = parseInt(crewId as string, 10); // 문자열을 숫자로 변환

  // 다가오는 러닝 일정 조회
  const {
    data: schedulesData,
    isLoading,
    error,
  } = useUpcomingRunningSchedules(crewIdNumber, {
    size: 5,
    page: 0,
  });

  const schedules = schedulesData?.schedules || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorComponent
        message={error.message || '데이터를 불러오는 중 오류가 발생했습니다.'}
      />
    );
  }

  console.log('Received data:', schedulesData);

  return (
    <>
      <div className="flex justify-between items-center pb-2">
        <p className="card-title">다가오는 러닝 일정</p>
      </div>
      {schedules?.length > 0 ? (
        <ScheduleTable schedules={schedules} />
      ) : (
        <div className="py-5">
          <p className="text-lg">현재 표시할 일정이 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default SimpleSchedule;
