'use client';

import React, { useState } from 'react';
import CrewCard from './CrewCard';
import { Crew } from '@/types/crewTypes';
import Button from '../common/Button';

interface CrewListProps {
  crews: Crew[];
}

const itemsToShowInitially = 9;
const itemsToAddLoadMore = 9;

const MainPageList = ({ crews }: CrewListProps) => {
  const [visibleItemsCount, setVisibleItemsCount] =
    useState(itemsToShowInitially);

  const loadMoreItems = () => {
    setVisibleItemsCount((prevCount) => prevCount + itemsToAddLoadMore);
  };

  const currentCards = crews.slice(0, visibleItemsCount);

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

      {visibleItemsCount < crews.length && (
        <div className="text-center mt-8">
          <Button onClick={loadMoreItems} wide={true}>
            더보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainPageList;
