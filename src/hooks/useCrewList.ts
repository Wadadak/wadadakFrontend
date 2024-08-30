import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { CrewSummary, CrewListParams } from '@/types/crewTypes';

// 크루 리스트 API 호출 함수
const fetchCrewList = async (
  params: CrewListParams,
): Promise<{
  crews: CrewSummary[];
  totalCrews: number; // 전체 아이템 수
}> => {
  const response = await axiosInstance.get<{
    crews: CrewSummary[];
    totalCrews: number;
  }>('/crews', { params });
  return response.data;
};

export const useCrewList = (params: CrewListParams) => {
  return useQuery<{
    crews: CrewSummary[];
    totalCrews: number;
  }>({
    queryKey: ['crewList', params],
    queryFn: () => fetchCrewList(params),
  });
};
