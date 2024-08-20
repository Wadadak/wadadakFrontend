'use client';

import React from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew/CrewDetailInfo';
import { useParams } from 'next/navigation';
import Wrapper from '@/components/layout/Wrapper';

const CrewDetailInfoPage = () => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === id);

  if (!crew) {
    return <Wrapper>크루 정보가 없습니다.</Wrapper>;
  }

  return <CrewDetailInfo crew={crew} />;
};

export default CrewDetailInfoPage;
