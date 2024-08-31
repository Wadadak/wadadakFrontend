// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { CrewInfoResponse } from '@/types/crewTypes';

// 크루 상세 정보 조회 조회 api 호출
export const fetchCrewInfo = async (
  crewId: number,
): Promise<CrewInfoResponse> => {
  const response = await axiosInstance.get<CrewInfoResponse>(`/crew/${crewId}`);
  return response.data;
};

// 크루 정보 조회 훅
export const useCrewInfo = (crewId: number) => {
  return useQuery<CrewInfoResponse, Error>({
    queryKey: ['crewInfo', crewId],
    queryFn: () => fetchCrewInfo(crewId),
  });
};
