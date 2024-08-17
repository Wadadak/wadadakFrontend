// 메인 페이지
import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import MainPageList from '@/components/crew/MainPageList';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';

const index = () => {
  return (
    <>
      <TitleBanner className="flex-col">
        <div>@@ 님의 이번 달 누적 기록</div>
        <p>0.0 km</p>
        <div>
          <span>0회</span>
          <span>0'00"</span>
          <span>0:00</span>
        </div>
      </TitleBanner>
      <Wrapper>
        <MainPageList crews={mockCrewList} />
      </Wrapper>
    </>
  );
};

export default index;
