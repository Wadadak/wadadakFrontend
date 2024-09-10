// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { EditProfileResponse, EditProfileRequest } from '@/types/userTypes';
import axios from 'axios';
import { appendFormData } from '@/utils/utilities';
import { extractUserIdFromToken } from '@/app/login/page';
import { get } from 'http';
import { getAccessToken } from '@/apis/authService';

// 회원 정보 수정 API 호출
export const editProfile = async (
  body: EditProfileRequest,
): Promise<EditProfileResponse> => {
  const formData = new FormData();

  appendFormData(formData, 'nickName', body.nickName);
  appendFormData(formData, 'profileImage', body.profileImage);
  appendFormData(formData, 'gender', body.gender);
  appendFormData(formData, 'birthYear', body.birthYear);
  appendFormData(formData, 'activityRegion', body.activityRegion);
  appendFormData(formData, 'nameVisibility', body.nameVisibility);
  appendFormData(formData, 'phoneNumberVisibility', body.phoneNumberVisibility);
  appendFormData(formData, 'genderVisibility', body.genderVisibility);
  appendFormData(formData, 'birthYearVisibility', body.birthYearVisibility);

  const userId = extractUserIdFromToken(getAccessToken());
  const response = await axiosInstance.put<EditProfileResponse>(
    `/user/profile`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

// 회원 정보 수정 훅
export const useEditProfile = (
  onSuccess: () => void,
  onError: (message: string) => void,
) => {
  return useMutation<EditProfileResponse, Error, EditProfileRequest>({
    mutationFn: (body: EditProfileRequest) => editProfile(body),
    onSuccess: (data) => {
      onSuccess();
      console.log('회원 정보 수정 성공:', data);
    },
    onError: (error) => {
      // 에러 처리 로직
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          console.error('잘못된 입력: ', error.response?.data);
          onError(error.response?.data?.message);
        } else {
          console.error('회원 정보 수정 실패: ', error.message);
          onError(error.response?.data?.message);
        }
      } else {
        console.error('알 수 없는 오류 발생: ', error);
        onError(error?.message);
      }
    },
  });
};
