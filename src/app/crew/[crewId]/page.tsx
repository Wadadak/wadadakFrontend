import React from 'react';
import JoinCrewInfo from '@/components/crew-join/JoinCrewInfo';

const CrewDetailInfoPage = ({ params }: { params: { crewId: string } }) => {
  return <JoinCrewInfo crewId={Number(params.crewId)} />;
};

export default CrewDetailInfoPage;
