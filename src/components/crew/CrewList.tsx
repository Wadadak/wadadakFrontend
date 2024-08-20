'use client';

import React, { useState } from 'react';
import CrewCard from './CrewCard';
import { Crew } from '@/types/crewTypes';
import Pagination from '../common/Pagination';

interface CrewListProps {
  crews: Crew[];
  myCrew?: boolean;
}

<<<<<<< HEAD
const itemsPerPage = 9;

const CrewList = ({ crews, myCrew = false }: CrewListProps) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
=======
const CrewList: React.FC<CrewListProps> = ({ crews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const pageRangeDisplayed = 5;
>>>>>>> 6f4ce88402109e6c1951038f90252b7ad2f73c92

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentCards = crews.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {currentCards.map((crew) => (
          <CrewCard
            key={crew.crewId}
            crewId={crew.crewId}
            crewName={crew.crewName}
            crewOccupancy={crew.crewOccupancy}
            crewCapacity={crew.crewCapacity}
            crewImage={crew.crewImage}
            activityRegion={crew.activityRegion}
            regularRunningInfo={crew.regularRunningInfo}
            myCrew={myCrew}
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
