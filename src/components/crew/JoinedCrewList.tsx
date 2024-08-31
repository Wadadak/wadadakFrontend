'use client';

import React from 'react';
import CrewCard from './CrewCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import { useJoinedCrewList } from '@/hooks/crew/useCrewList';

const JoinedCrewList = () => {
  const { data, isLoading, isError, error } = useJoinedCrewList();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorComponent
        message={error.message || '크루 목록을 불러오는 데 실패했습니다.'}
      />
    );
  }

  const { crews } = data || { crews: [] };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {crews.map((crew) => (
          <CrewCard
            key={crew.crewId}
            crewId={crew.crewId}
            crewName={crew.crewName}
            crewOccupancy={crew.crewOccupancy}
            crewCapacity={crew.crewCapacity}
            crewImage={crew.crewImage}
            activityRegion={crew.activityRegion}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinedCrewList;
