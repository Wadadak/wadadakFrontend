import React, { useState } from 'react';
import RegularRunningInfoTable from './RegularRunningInfoTable';
import Button from '../common/Button';
import {
  RunningInfo,
  CrewInfoResponse,
  UpcomingSchedule,
} from '@/types/crewTypes';
import ScheduleTable from '../running-schedule/ScheduleTable';
import SimpleSchedule from '../running-schedule/SimpleSchedule';

interface CrewDetailInfoProps {
  crew: CrewInfoResponse;
  runningInfo: RunningInfo[]; // 상위 컴포넌트에서 전달받은 정기 러닝 정보
  userRole?: 'LEADER' | 'STAFF' | 'MEMBER'; // 상위 컴포넌트에서 전달받은 사용자 권한
  children: React.ReactNode;
  onDeleteRunningInfo?: (id: number) => void; // 삭제 핸들러 함수
  onEditRunningInfo?: (info?: RunningInfo) => void; // 추가 및 수정 핸들러 함수
  myCrew?: boolean;
}

const CrewDetailInfo = ({
  crew,
  runningInfo,
  userRole,
  children,
  onDeleteRunningInfo,
  onEditRunningInfo,
  myCrew = false,
}: CrewDetailInfoProps) => {
  const [imageSrc, setImageSrc] = useState(
    crew?.crewImage || '/images/default.png',
  );

  // 문자열 처리 함수
  const formatRegion = (region: string | null | undefined): string => {
    if (!region) {
      return '';
    }
    return region
      .replace('광역시', '')
      .replace('특별시', '')
      .replace('특별자치시', '')
      .replace('특별자치도', '');
  };

  const formattedRegion = formatRegion(crew?.activityRegion);

  const canManage = userRole === 'LEADER' || userRole === 'STAFF';

  const renderAgeRange = () => {
    if (crew.limit.minYear && crew.limit.maxYear) {
      // 둘 다 선택된 경우
      return (
        <p className="text-lg">
          연령대 : {crew.limit.maxYear}년생 ~ {crew.limit.minYear}년생
        </p>
      );
    } else if (
      crew.limit.minYear !== undefined &&
      crew.limit.maxYear === undefined
    ) {
      // 최소 연령만 선택된 경우
      return <p className="text-lg">연령대 : {crew.limit.minYear}년생부터</p>;
    } else if (
      crew.limit.minYear === undefined &&
      crew.limit.maxYear !== undefined
    ) {
      // 최대 연령만 선택된 경우
      return <p className="text-lg">연령대 : {crew.limit.maxYear}년생까지</p>;
    } else {
      // 둘 다 선택되지 않은 경우
      return <p className="text-lg">연령 제한 없음</p>;
    }
  };

  const renderGender = crew.limit.gender
    ? `성별 : ${crew.limit.gender}만`
    : '성별 제한 없음';

  const handleImageError = () => {
    setImageSrc('/images/default.png');
  };

  return (
    <div className=" min-h-screen p-10 rounded-lg  border-4 border-primary">
      <div className="flex w-full items-center justify-between ">
        <h1 className="text-5xl font-bold flex items-center gap-3">
          {crew.crewName}
          {formattedRegion && (
            <div className="badge badge-secondary badge-lg">
              {formattedRegion}
            </div>
          )}
        </h1>
        <div className="flex gap-2">{children}</div>
      </div>
      <div className="hero-content flex-col lg:flex-row w-full justify-start items-center gap-6 lg:gap-20 mb-4">
        <img
          src={imageSrc}
          onError={handleImageError}
          alt={crew.crewName}
          className="w-full max-w-sm h-72 object-cover rounded-lg shadow-sm" // 이미지 가로 제한 및 중앙 정렬
        />
        <div className="flex flex-col gap-4 self-start lg:self-auto">
          <div className="flex flex-col gap-2 pb-2 ">
            <p className="text-lg">
              인원 : {crew.crewOccupancy}명 /{' '}
              {crew.crewCapacity ? `${crew.crewCapacity}명` : '제한 없음'}
            </p>
            {renderAgeRange()}
            <p className="text-lg">{renderGender}</p>
            {crew.limit.leaderRequired && (
              <p className="text-lg">러닝 프로필 공개 필수</p>
            )}
            {/* NOTE 가입 승인 */}
            {/* {crew.approvalRequired && <p className="text-lg">가입 승인 필요</p>} */}
          </div>
          <div className="flex flex-col items-start gap-4 lg:gap-2">
            <p className="card-title">크루 소개</p>
            <p className="leading-loose text-justify">{crew.description}</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center pb-2">
          <p className="card-title">정기 러닝 정보</p>
          {myCrew && canManage && (
            <Button
              onClick={() => onEditRunningInfo?.()}
              size="sm"
              color="accent"
            >
              정기 러닝 정보 추가
            </Button>
          )}
        </div>
        <RegularRunningInfoTable
          regularRunningInfo={runningInfo}
          userRole={userRole}
          onEditRunningInfo={canManage ? onEditRunningInfo : undefined}
          onDeleteRunningInfo={canManage ? onDeleteRunningInfo : undefined}
        />
      </div>

      <div className="mb-4">
        <SimpleSchedule />
      </div>
    </div>
  );
};

export default CrewDetailInfo;
