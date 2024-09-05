// 메인 페이지
'use client';

import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import MainPageList from '@/components/crew/MainPageList';
import { mockMyRunningInfo } from '@/mocks/mockData/mockRunList';
import { useLoginUser } from '@/hooks/user/useLoginUser';
import { LogoutBanner } from '@/components/main-page/LogoutBanner';

const index = () => {
  const { loginUser } = useLoginUser();

  return (
    <>
      <TitleBanner>
        {loginUser ? (
          <div className="w-full max-w-[1200px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8  h-full flex flex-col gap-8 justify-start">
            <p className="text-2xl text-secondary">
              {loginUser?.nickName}님의 이번 달 누적 기록
            </p>
            <p className="text-8xl">{0} km</p>
            {/* <p className="text-8xl">{mockMyRunningInfo.totalDistance} km</p> */}
            {/* <div className="flex gap-4 text-4xl">
              <span>{mockMyRunningInfo.totalRunningCount}회</span>
              <span>{mockMyRunningInfo.averagePace}</span>
              <span>{mockMyRunningInfo.averageRunningTime}</span>
            </div> */}
            <div className="flex gap-4 text-4xl">
              <span>{0}회</span>
              <span>{'0:00'}</span>
              <span>{'0:00:00'}</span>
            </div>
          </div>
        ) : (
          <LogoutBanner />
        )}
      </TitleBanner>
      <Wrapper>
        <MainPageList />
      </Wrapper>
    </>
  );
};

export default index;
