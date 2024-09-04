// 크루 생성, 크루 수정

import axiosInstance from '../axiosInstance';
import {
  CreateCrewData,
  UpdateCrewData,
  CrewResponse,
} from '@/types/crewTypes';

// FormData에 속성을 추가하는 유틸리티 함수
const appendFormData = (
  formData: FormData,
  key: string,
  value: string | Blob | number | boolean | undefined,
) => {
  if (value !== undefined && value !== null) {
    if (typeof value === 'boolean') {
      formData.append(key, value ? 'true' : 'false'); // 불리언 값을 문자열로 변환
    } else if (typeof value === 'object' && value instanceof Blob) {
      // 파일(Blob이나 File 객체)은 그대로 추가
      formData.append(key, value);
    } else {
      formData.append(key, value.toString());
    }
  }
};

// 크루 생성
export const createCrew = async (
  newCrewData: CreateCrewData,
): Promise<CrewResponse> => {
  const formData = new FormData();
  appendFormData(formData, 'crewName', newCrewData.crewName);
  appendFormData(formData, 'description', newCrewData.description);
  appendFormData(formData, 'activityRegion', newCrewData.activityRegion);
  appendFormData(formData, 'runRecordOpen', newCrewData.runRecordOpen);
  appendFormData(formData, 'leaderRequired', newCrewData.leaderRequired);
  appendFormData(formData, 'crewCapacity', newCrewData.crewCapacity);
  appendFormData(formData, 'crewImage', newCrewData.crewImage);
  appendFormData(formData, 'minYear', newCrewData.minYear);
  appendFormData(formData, 'maxYear', newCrewData.maxYear);
  appendFormData(formData, 'gender', newCrewData.gender);

  // FormData의 내용을 확인
  formData.forEach((value, key) => {
    console.log(key, value);
  });

  const response = await axiosInstance.post<CrewResponse>('/crew', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 크루 정보 수정
export const updateCrew = async (
  crewId: number,
  newCrewData: UpdateCrewData,
): Promise<CrewResponse> => {
  const formData = new FormData();
  appendFormData(formData, 'description', newCrewData.description);
  appendFormData(formData, 'activityRegion', newCrewData.activityRegion);
  appendFormData(formData, 'runRecordOpen', newCrewData.runRecordOpen);
  appendFormData(formData, 'leaderRequired', newCrewData.leaderRequired);
  appendFormData(formData, 'crewCapacity', newCrewData.crewCapacity);
  appendFormData(formData, 'crewImage', newCrewData.crewImage);
  appendFormData(formData, 'minYear', newCrewData.minYear);
  appendFormData(formData, 'maxYear', newCrewData.maxYear);
  appendFormData(formData, 'gender', newCrewData.gender);

  const response = await axiosInstance.put<CrewResponse>(
    `/crew/${crewId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
