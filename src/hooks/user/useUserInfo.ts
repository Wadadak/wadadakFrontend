// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { UserInfoResponse } from '@/types/userTypes';

// 사용자 정보 조회 api 호출
export const fetchUserInfo = async (
  userId: number,
): Promise<UserInfoResponse> => {
  const response = await axiosInstance.get<UserInfoResponse>(
    `/user/${userId}/profile`,
  );
  return response.data;
};

// 사용자 정보 조회 훅
export const useUserInfo = (userId: number) => {
  return useQuery<UserInfoResponse, Error>({
    queryKey: ['userInfo', userId],
    queryFn: () => fetchUserInfo(userId),
  });
};
