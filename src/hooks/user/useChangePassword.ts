// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import {
  EditProfileResponse,
  EditProfileRequest,
  ChangePasswordRequest,
} from '@/types/userTypes';
import axios from 'axios';
import { appendFormData } from '@/utilities';
import { extractUserIdFromToken } from '@/app/login/page';
import { get } from 'http';
import { getAccessToken } from '@/apis/authService';

// 회원 정보 수정 API 호출
export const changePassword = async (
  body: ChangePasswordRequest,
): Promise<any> => {
  console.log('비밀번호 변경 성공 body:', body);
  const response = await axiosInstance.put<any>(`/user/password`, body);

  console.log('비밀번호 변경 성공 response:', body, response);
  return response.data;
};

// 회원 정보 수정 훅
export const useChangePassword = (
  onSuccess: () => void,
  onError: (message: string) => void,
) => {
  return useMutation<any, Error, ChangePasswordRequest>({
    mutationFn: (body: ChangePasswordRequest) => changePassword(body),
    onSuccess: (data) => {
      onSuccess();
      console.log('비밀번호 변경 성공:', data);
    },
    onError: (error) => {
      // 에러 처리 로직
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          console.error('잘못된 입력: ', error.response?.data);
          onError(error.response?.data?.message);
        } else {
          console.error('비밀번호 변경 실패: ', error.message);
          onError(error.response?.data?.message);
        }
      } else {
        console.error('알 수 없는 오류 발생: ', error);
        onError(error?.message);
      }
    },
  });
};
