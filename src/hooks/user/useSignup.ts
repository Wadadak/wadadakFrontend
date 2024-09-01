// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SignupRequest, SignupResponse } from '@/types/userTypes';
import axios from 'axios';

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

// 자주 사용될 것 같은 함수이니 util 폴더에 따로 빼두는 것도 좋을 것 같습니다.
// FormData에 속성을 추가하는 유틸리티 함수
const appendFormData = (
  formData: FormData,
  key: string,
  value: string | Blob | number | boolean | undefined,
) => {
  if (value !== undefined && value !== null) {
    if (typeof value === 'boolean') {
      formData.append(key, value ? 'true' : 'false'); // 불리언 값을 문자열로 변환
    } else {
      formData.append(key, value.toString());
    }
  }
};