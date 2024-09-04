import axiosInstance from '@/apis/axiosInstance';
import { UpcomingScheduleResponse, UpcomingSchedule } from '@/types/crewTypes';
import { useQuery } from '@tanstack/react-query';

interface UpcomingScheduleParams {
  category?: 'REGULAR' | 'ON_DEMAND'; // 카테고리 선택
  page: number; // 페이지 번호
  size: number; // 페이지당 크기
}

export const fetchUpcomingRunningSchedules = async (
  crewId: number,
  params: UpcomingScheduleParams,
): Promise<UpcomingScheduleResponse> => {
  const response = await axiosInstance.get(`/crew/${crewId}/activity`, {
    params,
  });
  return {
    schedules: response.data.content,
    totalPages: response.data.totalPages,
  };
};

export const useUpcomingRunningSchedules = (
  crewId: number,
  params: UpcomingScheduleParams,
) => {
  return useQuery<{
    schedules: UpcomingSchedule[];
    totalPages: number;
  }>({
    queryKey: ['upcomingRunningSchedules', crewId, params],
    queryFn: () => fetchUpcomingRunningSchedules(crewId, params),
  });
};
