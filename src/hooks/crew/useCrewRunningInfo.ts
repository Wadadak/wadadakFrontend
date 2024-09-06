import { useQuery } from '@tanstack/react-query';
import { CrewRunningInfoResponse } from '@/types/crewTypes';
import axiosInstance from '@/apis/axiosInstance';

export const fetchCrewRunningInfo = async (
  crewId: number,
  page: number,
  size: number,
): Promise<CrewRunningInfoResponse> => {
  const response = await axiosInstance.get<CrewRunningInfoResponse>(
    `crew/${crewId}/regular`,
    {
      params: { page, size },
    },
  );
  return response.data;
};

export const useCrewRunningInfo = (
  crewId: number,
  page: number,
  size: number,
) => {
  return useQuery<CrewRunningInfoResponse, Error>({
    queryKey: ['crewRunningInfo', crewId, page, size],
    queryFn: () => fetchCrewRunningInfo(crewId, page, size),
    enabled: !!crewId, // crewId가 있을 때만 동작
  });
};
