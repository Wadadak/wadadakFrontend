import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { UserProfileResponse } from '@/types/userTypes';
import { extractUserIdFromToken } from '@/app/login/page';
import { getAccessToken } from '@/apis/authService';
import { TotalRunningRecordResponse } from '@/types/runningTypes';

// 러닝 기록 목록 조회 api 호출
export const fetchTotalRunningRecord =
  async (): Promise<TotalRunningRecordResponse> => {
    const response = await axiosInstance.get<TotalRunningRecordResponse>(
      `/run/total?period=year`,
    );

    console.log('fetchTotalRunningRecord response', response);
    return response.data;
  };

// 사용자 정보 조회 훅
export const useTotalRunningRecord = () => {
  return useQuery<TotalRunningRecordResponse, Error>({
    queryKey: ['TotalRunningRecord'],
    queryFn: fetchTotalRunningRecord,
  });
};
