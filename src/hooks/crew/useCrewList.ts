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
  totalCrews: number; // 전체 아이템 수
  totalPages: number;
}> => {
  const response = await axiosInstance.get<{
    content: CrewSummary[];
    totalElements: number;
    totalPages: number;
  }>('/crew', { params });
  // 응답 데이터에서 필요한 값을 추출하여 반환
  return {
    crews: response.data.content,
    totalCrews: response.data.totalElements,
    totalPages: response.data.totalPages,
  };
};

export const useCrewList = (params: CrewListParams) => {
  return useQuery<{
    crews: CrewSummary[];
    totalCrews: number;
    totalPages: number;
  }>({
    queryKey: ['crewList', params],
    queryFn: () => fetchCrewList(params),
  });
};

// 가입한 크루 리스트
export const fetchJoinedCrewList = async (): Promise<JoinedCrewSummary[]> => {
  const response =
    await axiosInstance.get<JoinedCrewSummary[]>('/crew/participate');
  return response.data;
};

export const useJoinedCrewList = () => {
  return useQuery<JoinedCrewSummary[]>({
    queryKey: ['joinedCrewList'],
    queryFn: fetchJoinedCrewList,
  });
};
