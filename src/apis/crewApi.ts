// 크루 생성, 크루 수정

import axiosInstance from './axiosInstance';
import {
  CreateCrewData,
  UpdateCrewData,
  CrewResponse,
} from '@/types/crewTypes';

// 크루 생성
export const createCrew = async (
  newCrewData: CreateCrewData,
): Promise<CrewResponse> => {
  const formData = new FormData();
  formData.append('crewName', newCrewData.crewName);
  formData.append('description', newCrewData.description);
  formData.append('activityRegion', newCrewData.activityRegion);
  formData.append('runRecordOpen', String(newCrewData.runRecordOpen));
  formData.append('leaderRequired', String(newCrewData.leaderRequired));

  if (newCrewData.crewCapacity) {
    formData.append('crewCapacity', String(newCrewData.crewCapacity));
  }

  if (newCrewData.crewImage) {
    formData.append('crewImage', newCrewData.crewImage);
  }

  if (newCrewData.minYear) {
    formData.append('minYear', String(newCrewData.minYear));
  }

  if (newCrewData.maxYear) {
    formData.append('maxYear', String(newCrewData.maxYear));
  }

  if (newCrewData.gender) {
    formData.append('gender', newCrewData.gender);
  }

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
  formData.append('description', newCrewData.description);
  formData.append('activityRegion', newCrewData.activityRegion);
  formData.append('runRecordOpen', String(newCrewData.runRecordOpen));
  formData.append('leaderRequired', String(newCrewData.leaderRequired));

  if (newCrewData.crewCapacity) {
    formData.append('crewCapacity', String(newCrewData.crewCapacity));
  }

  if (newCrewData.crewImage) {
    formData.append('crewImage', newCrewData.crewImage);
  }

  if (newCrewData.minYear) {
    formData.append('minYear', String(newCrewData.minYear));
  }

  if (newCrewData.maxYear) {
    formData.append('maxYear', String(newCrewData.maxYear));
  }

  if (newCrewData.gender) {
    formData.append('gender', newCrewData.gender);
  }

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
