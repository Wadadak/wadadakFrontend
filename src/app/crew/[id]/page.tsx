import React from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew/CrewDetailInfo';

const CrewDetailInfoPage = () => {
  return <CrewDetailInfo crew={mockCrewList} />;
};

export default CrewDetailInfoPage;
