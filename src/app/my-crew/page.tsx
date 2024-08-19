import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import CrewList from '@/components/crew/CrewList';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';

const MyCrewPage = () => {
  return (
    <>
      <TitleBanner>가입한 크루</TitleBanner>
      <Wrapper>
        <CrewList crews={mockCrewList} />
      </Wrapper>
    </>
  );
};

export default MyCrewPage;
