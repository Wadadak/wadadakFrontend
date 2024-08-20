'use client';

import React, { useState } from 'react';
import CrewCard from './CrewCard';
import { Crew } from '@/types/crewTypes';
import Pagination from '../common/Pagination';

interface CrewListProps {
  crews: Crew[];
}

const CrewList: React.FC<CrewListProps> = ({ crews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const pageRangeDisplayed = 5;

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentCards = crews.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {currentCards.map((crew) => (
          <CrewCard
            key={crew.crew_id}
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
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </div>
  );
};

export default CrewList;
