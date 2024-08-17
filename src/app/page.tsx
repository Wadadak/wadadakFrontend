// 메인 페이지
import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import MainPageList from '@/components/crew/MainPageList';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';

const index = () => {
  return (
    <>
      <TitleBanner>ㅇㅇ</TitleBanner>
      <Wrapper>
        <MainPageList crews={mockCrewList} />
      </Wrapper>
    </>
  );
};

export default index;
