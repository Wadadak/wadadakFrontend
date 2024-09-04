import axiosInstance from '@/apis/axiosInstance';
import { ScheduleRequest, ScheduleResponse } from '@/types/crewTypes';

export const createRunningSchedule = async (
  crewId: number,
  data: ScheduleRequest,
): Promise<ScheduleResponse> => {
  const response = await axiosInstance.post<ScheduleResponse>(
    `/crew/${crewId}/activity`,
    data,
  );

  return response.data;
};
