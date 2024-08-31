import React from 'react';
import RegularRunningInfoTable from './RegularRunningInfoTable';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import { useCrewInfo } from '@/hooks/crew/useCrewInfo';
import { useCrewRunningInfo } from '@/hooks/crew/useCrewRunningInfo';
import { RunningInfo } from '@/types/crewTypes';

interface CrewDetailInfoProps {
  crewId: number;
  children: React.ReactNode;
  userRole?: 'LEADER' | 'STAFF' | 'MEMBER';
  onDeleteRunningInfo?: (id: number) => void; // 삭제 핸들러 함수
  onEditRunningInfo?: (info?: RunningInfo) => void; // 추가 및 수정 핸들러 함수
  canManage?: boolean;
}

const CrewDetailInfo = ({
  crewId,
  children,
  userRole,
  onDeleteRunningInfo,
  onEditRunningInfo,
  canManage = false,
}: CrewDetailInfoProps) => {
  const {
    data: crew,
    isLoading: crewLoading,
    isError: crewError,
    error: crewErrorMessage,
  } = useCrewInfo(crewId);

  const {
    data: regularRunningInfo,
    isLoading: runningInfoLoading,
    isError: runningInfoError,
    error: runningInfoErrorMessage,
  } = useCrewRunningInfo(crewId);

  const defaultImage = '/images/default.png';

  if (crewLoading || runningInfoLoading) {
    return <LoadingSpinner />;
  }

  if (crewError || runningInfoError || !crew) {
    return (
      <ErrorComponent
        message={
          crewErrorMessage?.message ||
          runningInfoErrorMessage?.message ||
          '크루 정보를 불러오는 데 실패했습니다.'
        }
      />
    );
  }

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

  return (
    <div className=" min-h-screen p-10 rounded-lg  border-4 border-primary">
      <div className="flex w-full items-center justify-between ">
        <h1 className="text-5xl font-bold flex items-center gap-3">
          {crew.crewName}
          <div className="badge badge-accent badge-lg">
            {crew.activityRegion}
          </div>
        </h1>
        <div className="flex gap-2">{children}</div>
      </div>
      <div className="hero-content flex-col lg:flex-row w-full justify-start items-center gap-6 lg:gap-20 mb-4">
        <img
          src={crew.crewImage || defaultImage}
          alt={crew.crewName}
          className="max-w-sm rounded-lg shadow-sm"
        />
        <div className="flex flex-col gap-4 self-start lg:self-auto">
          <div className="flex flex-col gap-2 pb-2 ">
            <p className="text-lg">
              인원 : {crew.crewOccupancy}명 / {crew.crewCapacity}명
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
      <div className="mb-4">
        <div className="flex justify-between items-center pb-2">
          <p className="card-title">정기 러닝 정보</p>
          {canManage && (userRole === 'LEADER' || userRole === 'STAFF') && (
            <Button
              onClick={() => onEditRunningInfo?.()}
              size="sm"
              color="secondary"
            >
              정기 러닝 정보 추가
            </Button>
          )}
        </div>
        <RegularRunningInfoTable
          regularRunningInfo={regularRunningInfo?.data}
          userRole={userRole}
          onEditRunningInfo={canManage ? onEditRunningInfo : undefined}
          onDeleteRunningInfo={canManage ? onDeleteRunningInfo : undefined}
        />
      </div>
      <div>
        <p className="card-title pb-2">오프라인 러닝 일정</p>
      </div>
    </div>
  );
};

export default CrewDetailInfo;
