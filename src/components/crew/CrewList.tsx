'use client';

import React from 'react';
import CrewCard from './CrewCard';
import { Crew } from '@/types/crewTypes';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil/atoms/paginationState';
import Pagination from '../common/Pagination';

interface CrewListProps {
  crews: Crew[];
}

const itemsPerPage = 9;

const CrewList: React.FC<CrewListProps> = ({ crews }) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentCards = crews.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {currentCards.map((crew) => (
          <CrewCard
            key={crew.crew_id}
            crewId={crew.crew_id}
            crewName={crew.crewName}
            crewOccupancy={crew.crewOccupancy}
            crewCapacity={crew.crewCapacity}
            crewImage={crew.crewImage}
            activityRegion={crew.activityRegion}
            regularRunningInfo={crew.regularRunningInfo}
          />
        ))}
      </div>

      <Pagination
        totalItems={crews.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CrewList;
