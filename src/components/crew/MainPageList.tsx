'use client';

import React from 'react';
import CrewCard from './CrewCard';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import { useCrewList } from '@/hooks/crew/useCrewList';
import { useRouter } from 'next/navigation';

const MainPageList = () => {
  const router = useRouter();

  const { data, isLoading, isError, error } = useCrewList({
    size: 6,
    page: 0,
  });

  const { crews } = data || { crews: [] };

  const handleExploreCrews = () => {
    router.push('/crew');
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl font-bold">추천 러닝 크루</h1>
          <p className="text-lg mt-2 mb-4">인기 러닝 크루를 지금 만나보세요!</p>
          <Button wide={true} onClick={handleExploreCrews} color="accent">
            더 알아보기
          </Button>
        </div>
      </div>
      {/* 에러 또는 로딩 상태가 있으면 하단에 표시 */}
      <div>
        {isLoading && (
          <div className="mt-8">
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div className="mt-8">
            <ErrorComponent
              message={
                error?.message || '크루 목록을 불러오는 데 실패했습니다.'
              }
            />
          </div>
        )}
      </div>

      {!isLoading && !isError && (
        <>
          {crews?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
              {crews?.map((crew) => (
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
          ) : (
            <div className="text-center py-10">
              <p className="text-lg">현재 추천할 크루가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MainPageList;
