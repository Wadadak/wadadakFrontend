'use client';

import React, { useState } from 'react';
import CrewCard from './CrewCard';
import Pagination from '../common/Pagination';
import { useCrewList } from '@/hooks/crew/useCrewList';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

const CrewList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 한 페이지에 표시할 항목
  const pageRangeDisplayed = 5;

  // const endIndex = currentPage * itemsPerPage;
  // const startIndex = endIndex - itemsPerPage;
  // const currentCards = crews.slice(startIndex, endIndex);

  const { data, isLoading, isError, error } = useCrewList({
    size: itemsPerPage,
    page: currentPage,
  });

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

  const { crews, totalCrews } = data || { crews: [], totalCrews: 0 };

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

      <Pagination
        totalItems={totalCrews}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </div>
  );
};

export default CrewList;
