// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { UserProfileResponse } from '@/types/userTypes';

// 사용자 정보 조회 api 호출
export const fetchUserProfile = async (
  userId: number,
): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get<UserProfileResponse>(
    `/user/${userId}/profile?userId=${userId}`,
  );
  return response.data;
};

// 사용자 정보 조회 훅
export const useUserProfile = (userId: number, enabled?: boolean) => {
  return useQuery<UserProfileResponse, Error>({
    queryKey: ['userInfo', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: enabled ? enabled : false,
  });
};
