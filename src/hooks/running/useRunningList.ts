import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { UserProfileResponse } from '@/types/userTypes';
import { extractUserIdFromToken } from '@/app/login/page';
import { getAccessToken } from '@/apis/authService';
import { RunningListResponse } from '@/types/runningTypes';

// 러닝 기록 목록 조회 api 호출
export const fetchRunningList = async (): Promise<RunningListResponse> => {
  const userId = extractUserIdFromToken(getAccessToken() ?? '');
  const response = await axiosInstance.get<RunningListResponse>(`/run/list`);

  console.log('fetchRunningList response', userId, response);
  return response.data;
};

// 사용자 정보 조회 훅
export const useRunningList = () => {
  const userId = extractUserIdFromToken(getAccessToken() ?? '');
  console.log('useRunningList userId', userId, getAccessToken());

  return useQuery<RunningListResponse, Error>({
    queryKey: ['runningList', userId],
    queryFn: fetchRunningList,
  });
};
