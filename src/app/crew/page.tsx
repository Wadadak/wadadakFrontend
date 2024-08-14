import React from 'react';
import CrewList from '@/components/crew/CrewList';
import Wrapper from '@/components/layout/Wrapper';
import { mockCrewList } from '@/mock/mockCrewList';
import { TitleBanner } from '@/components/layout/TitleBanner';

const ExploreCrewsPage: React.FC = () => {
  return (
    <>
      <TitleBanner>크루 탐색</TitleBanner>
      <Wrapper>
        <CrewList crews={mockCrewList} />
      </Wrapper>
    </>
  );
};

export default ExploreCrewsPage;
›