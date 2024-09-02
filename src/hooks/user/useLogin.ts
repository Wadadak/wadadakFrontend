// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '@/types/userTypes';
import axios from 'axios';
import { setAccessToken } from '@/apis/authService';

// 사용자 회원 가입 API 호출
export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/login', body);
  return response.data;
};

// 회원가입 훅
export const useLogin = (
  onSuccess: (data: LoginResponse) => void,
  onError: (message: string) => void,
) => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: (data) => {
      onSuccess(data);
      console.log('로그인 성공:', data);

      setAccessToken(data);
      // setAccessToken(data.accessJwt);
    },
    onError: (error) => {
      // 에러 처리 로직
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          console.error('잘못된 입력: ', error.response?.data);
          onError(error.response?.data?.message);
        } else {
          console.error('로그인 실패: ', error.message);
          onError(error.response?.data?.message);
        }
      } else {
        console.error('알 수 없는 오류 발생: ', error);
        onError(error?.message);
      }
    },
  });
};
