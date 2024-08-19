'use client';

import React from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew/CrewDetailInfo';
import { useParams } from 'next/navigation';

const CrewDetailInfoPage = () => {
  const { id } = useParams();
  const crewId = parseInt(id as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === crewId);

  console.log(crew);

  return <CrewDetailInfo crew={crew} />;
};

export default CrewDetailInfoPage;
