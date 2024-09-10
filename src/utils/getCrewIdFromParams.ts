import { useParams } from 'next/navigation';

export const getCrewIdFromParams = (): number | null => {
  const { crewId } = useParams();
  const crewNumberId = Number(crewId);

  return isNaN(crewNumberId) ? null : crewNumberId;
};
