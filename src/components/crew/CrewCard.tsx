'use client';

import React, { useState } from 'react';
import RegularRunningInfoTable from '../crew-info/RegularRunningInfoTable';
import { useRouter } from 'next/navigation';
import { useCrewRunningInfo } from '@/hooks/crew/useCrewRunningInfo';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import { useUserRoles } from '@/hooks/crew/useUserRoles';

interface CrewCardProps {
  crewId: number;
  crewName: string;
  crewOccupancy: number;
  crewCapacity?: number;
  crewImage?: string;
  activityRegion: string;
  myCrew?: boolean;
}

const CrewCard = ({
  crewId,
  crewName,
  crewOccupancy,
  crewCapacity,
  crewImage,
  activityRegion,
  myCrew = false,
}: CrewCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const {
    data: regularRunningInfo,
    isLoading,
    isError,
  } = useCrewRunningInfo(crewId);

  const {
    data: roleData,
    isLoading: roleLoading,
    isError: roleError,
  } = useUserRoles(crewId);

  const role = roleData?.role;

  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(crewImage || '/images/default.png');

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

  const formattedRegion = formatRegion(activityRegion);

  const handleCardClick = () => {
    if (myCrew) {
      router.push(`/my-crews/${crewId}`);
    } else {
      router.push(`/crew/${crewId}`);
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleImageError = () => {
    setImageSrc('/images/default.png');
  };

  return (
    <div
      className="card bg-base-100 w-full sm:max-w-md md:max-w-lg lg:max-w-xl  shadow-sm cursor-pointer focus:outline focus:outline-2  focus:outline-accent focus:outline-offset-0 hover:outline hover:outline-2 hover:outline-accent hover:outline-offset-0"
      tabIndex={0}
      onClick={handleCardClick}
    >
      <figure className="relative">
        <img src={imageSrc} alt={crewName} onError={handleImageError} />
        {role && myCrew && role === 'LEADER' && (
          <div className="badge badge-accent absolute top-2 right-2 font-bold p-3 text-white">
            내가 만든 크루
          </div>
        )}
        {!myCrew && role && (
          <div className="badge badge-accent absolute top-2 right-2 font-bold p-3 text-white">
            {role === 'LEADER' ? '내가 만든 크루' : '가입한 크루'}
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {crewName}
          {formattedRegion && (
            <div className="badge badge-secondary">{formattedRegion}</div>
          )}
        </h2>

        <p>
          인원 : {crewOccupancy}명 /{' '}
          {crewCapacity ? `${crewCapacity}명` : '제한 없음'}
        </p>
        <div className="card-actions justify-start relative">
          <div
            className="btn btn-primary btn-xs mt-1 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            정기 러닝 정보
          </div>

          {showTooltip && (
            <div
              className="absolute left-0 mt-2 bg-base-100 border border-base-300 shadow-lg z-10 w-80"
              style={{ marginTop: '30px' }} // 버튼 아래에 툴팁을 배치
              onMouseEnter={handleMouseEnter} // 툴팁 위에 있을 때는 사라지지 않도록 함
              onMouseLeave={handleMouseLeave}
            >
              <div className="card-body p-3">
                {(isLoading || roleLoading) && <LoadingSpinner />}
                {(isError || roleError) && (
                  <ErrorComponent
                    message={'정기 러닝 정보를 불러오는 데 실패했습니다.'}
                  />
                )}
                {!isLoading && !isError && (
                  <RegularRunningInfoTable
                    regularRunningInfo={regularRunningInfo?.data}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
