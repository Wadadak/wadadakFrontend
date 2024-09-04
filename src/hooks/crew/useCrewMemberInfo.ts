// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { CrewInfoResponse, CrewMemberInfoResponse } from '@/types/crewTypes';

// 크루원 상세 정보 조회 조회 api 호출
export const fetchCrewMemberInfo = async (
  crewId: number,
  memberId: number,
): Promise<CrewMemberInfoResponse> => {
  const response = await axiosInstance.get<CrewMemberInfoResponse>(
    `/crew/${crewId}?crewMemberId=${memberId}`,
  );
  return response.data;
};

// 크루원 정보 조회 훅
export const useCrewMemberInfo = (crewId: number, memberId: number) => {
  return useQuery<CrewMemberInfoResponse, Error>({
    queryKey: ['crewInfo', crewId, memberId],
    queryFn: () => fetchCrewMemberInfo(crewId, memberId),
  });
};
