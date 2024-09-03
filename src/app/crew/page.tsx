import React from 'react';
import CrewList from '@/components/crew/CrewList';
import Wrapper from '@/components/layout/Wrapper';
import { TitleBanner } from '@/components/layout/TitleBanner';

const ExploreCrewsPage = () => {
  return (
    <>
      <TitleBanner>크루 탐색</TitleBanner>
      <Wrapper>
        <CrewList />
      </Wrapper>
    </>
  );
};

export default ExploreCrewsPage;
