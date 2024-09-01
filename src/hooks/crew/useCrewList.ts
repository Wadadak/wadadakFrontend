import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import {
  CrewSummary,
  CrewListParams,
  JoinedCrewSummary,
} from '@/types/crewTypes';

// 크루 리스트 API 호출 함수
const fetchCrewList = async (
  params: CrewListParams,
): Promise<{
  crews: CrewSummary[];
  totalPages: number;
}> => {
  const response = await axiosInstance.get<{
    content: CrewSummary[];
    totalPages: number;
  }>('/crew', { params });
  // 응답 데이터에서 필요한 값을 추출하여 반환
  return {
    crews: response.data.content,
    totalPages: response.data.totalPages,
  };
};

export const useCrewList = (params: CrewListParams) => {
  return useQuery<{
    crews: CrewSummary[];
    totalPages: number;
  }>({
    queryKey: ['crewList', params],
    queryFn: () => fetchCrewList(params),
  });
};

// 가입한 크루 리스트
export const fetchJoinedCrewList = async (): Promise<{
  crews: JoinedCrewSummary[];
}> => {
  const response = await axiosInstance.get<{
    content: JoinedCrewSummary[];
  }>('/crew/participate');
  return {
    crews: response.data.content,
  };
};

export const useJoinedCrewList = () => {
  return useQuery<{
    crews: JoinedCrewSummary[];
  }>({
    queryKey: ['joinedCrewList'],
    queryFn: fetchJoinedCrewList,
  });
};
