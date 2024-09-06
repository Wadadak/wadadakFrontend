import React from 'react';
import SimpleSchedule from '../running-schedule/SimpleSchedule';
import { useCrewInfo } from '@/hooks/crew/useCrewInfo';
import { useParams } from 'next/navigation';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

const Home = () => {
  const { crewId } = useParams(); // useParams로 crewId 가져오기
  const crewIdNumber = parseInt(crewId as string, 10); // 문자열을 숫자로 변환

  // 크루 정보 조회
  const { data: crewData, isLoading, error } = useCrewInfo(crewIdNumber);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent message="크루 정보를 불러오는데 실패했습니다." />;
  }
  return (
    <>
      <div className="flex flex-col gap-3 items-center ">
        <div className="text-3xl font-bold text-center text-secondary">
          {crewData?.crewName} 현황
        </div>
        <div className="stats stats-vertical lg:stats-horizontal shadow ">
          <div className="stat">
            <div className="stat-title">현재 크루원 수</div>
            <div className="flex items-center gap-1 justify-center">
              <div className="stat-value">{crewData?.crewOccupancy}</div>
              <div className="stat-desc">명</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">누적 오프라인 러닝 횟수</div>
            <div className="flex items-center gap-1 justify-center">
              <div className="stat-value">{crewData?.runningCount}</div>
              <div className="stat-desc">회</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">가입 대기자 수</div>
            <div className="flex items-center gap-1 justify-center">
              <div className="stat-value">0</div>
              <div className="stat-desc">명</div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider divider-primary py-10" />

      <SimpleSchedule />
    </>
  );
};

export default Home;
