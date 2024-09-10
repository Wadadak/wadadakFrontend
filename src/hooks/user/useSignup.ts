// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SignupRequest, SignupResponse } from '@/types/userTypes';
import axios from 'axios';
import { appendFormData } from '@/utils/utilities';

// 사용자 회원 가입 API 호출
export const signup = async (body: SignupRequest): Promise<SignupResponse> => {
  const formData = new FormData();

  appendFormData(formData, 'email', body.email);
  appendFormData(formData, 'password', body.password);
  appendFormData(formData, 'confirmPassword', body.confirmPassword);
  appendFormData(formData, 'name', body.name);
  appendFormData(formData, 'nickName', body.nickName);
  appendFormData(formData, 'phoneNumber', body.phoneNumber);
  appendFormData(formData, 'profileImage', body.profileImage);
  appendFormData(formData, 'gender', body.gender);
  appendFormData(formData, 'birthYear', body.birthYear);
  appendFormData(formData, 'activityRegion', body.activityRegion);
  appendFormData(formData, 'nameVisibility', body.nameVisibility);
  appendFormData(formData, 'phoneNumberVisibility', body.phoneNumberVisibility);
  appendFormData(formData, 'genderVisibility', body.genderVisibility);
  appendFormData(formData, 'birthYearVisibility', body.birthYearVisibility);

  const response = await axiosInstance.post<SignupResponse>(
    '/user/signup',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

// 회원가입 훅
export const useSignup = (
  onSuccess: () => void,
  onError: (message: string) => void,
) => {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (body: SignupRequest) => signup(body),
    onSuccess: (data) => {
      onSuccess();
      console.log('회원가입 성공:', data);
    },
    onError: (error) => {
      // 에러 처리 로직
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          console.error('잘못된 입력: ', error.response?.data);
          onError(error.response?.data?.message);
        } else {
          console.error('회원가입 실패: ', error.message);
          onError(error.response?.data?.message);
        }
      } else {
        console.error('알 수 없는 오류 발생: ', error);
        onError(error?.message);
      }
    },
  });
};
