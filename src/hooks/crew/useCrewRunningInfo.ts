import { useQuery } from '@tanstack/react-query';
import { CrewRunningInfo } from '@/types/crewTypes';
import axiosInstance from '@/apis/axiosInstance';

export const fetchCrewRunningInfo = async (
  crewId: number,
): Promise<CrewRunningInfo> => {
  const response = await axiosInstance.get<CrewRunningInfo>(
    `crew/${crewId}/regular`,
  );
  return response.data;
};

export const useCrewRunningInfo = (crewId: number) => {
  return useQuery<CrewRunningInfo, Error>({
    queryKey: ['crewRunningInfo', crewId],
    queryFn: () => fetchCrewRunningInfo(crewId),
    enabled: !!crewId,
  });
};
