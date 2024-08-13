import React from 'react';
import CrewList from '@/components/crew/CrewList';
import Wrapper from '@/components/Wrapper';
import { mockCrewList } from '@/mock/mockCrewList';

const ExploreCrewsPage: React.FC = () => {
  return (
    <Wrapper>
      <CrewList crews={mockCrewList} />
    </Wrapper>
  );
};

export default ExploreCrewsPage;
