import React from 'react';
import { Crew } from '@/types/crewTypes';
import RegularRunningInfoTable from './RegularRunningInfoTable';

interface CrewDetailInfoProps {
  crew: Crew;
  children: React.ReactNode;
}

const CrewDetailInfo = ({ crew, children }: CrewDetailInfoProps) => {
  const defaultImage = '/images/default.png';

  const renderAgeRange = () => {
    if (crew.minAge !== null && crew.maxAge !== null) {
      // 둘 다 선택된 경우
      return (
        <p className="text-lg">
          연령대 : {crew.minAge}년생 ~ {crew.maxAge}년생
        </p>
      );
    } else if (crew.minAge !== null && crew.maxAge === null) {
      // 최소 연령만 선택된 경우
      return <p className="text-lg">연령대 : {crew.minAge}년생 ~ </p>;
    } else if (crew.minAge === null && crew.maxAge !== null) {
      // 최대 연령만 선택된 경우
      return <p className="text-lg">연령대 : {crew.maxAge}년생 ~</p>;
    } else {
      // 둘 다 선택되지 않은 경우
      return <p className="text-lg">연령 제한 없음</p>;
    }
  };

  const renderGender = crew.genderRestriction
    ? `성별 : ${crew.genderRestriction}만`
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
            {crew.publicRecordRequired && (
              <p className="text-lg">러닝 프로필 공개 필수</p>
            )}
            {crew.approvalRequired && <p className="text-lg">가입 승인 필요</p>}
          </div>
          <div className="flex flex-col items-start gap-4 lg:gap-2">
            <p className="card-title">크루 소개</p>
            <p className="leading-loose text-justify">{crew.description}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="card-title pb-2 ">정기 러닝 정보</p>
        <RegularRunningInfoTable
          regularRunningInfo={crew.regularRunningInfo || []}
        />
      </div>
      <div>
        <p className="card-title pb-2">오프라인 러닝 일정</p>
      </div>
    </div>
  );
};

export default CrewDetailInfo;
