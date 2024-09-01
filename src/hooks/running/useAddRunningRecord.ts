// 크루 상세 정보 조회

import axiosInstance from '@/apis/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  RunningRecordRequest,
  RunningRecordResponse,
} from '@/types/runningTypes';
import { getAccessToken } from '@/apis/authService';

// 러닝 기록 생성 API 호출
export const runningRecord = async (
  body: RunningRecordRequest,
): Promise<RunningRecordResponse> => {
  const response = await axiosInstance.post<RunningRecordResponse>(
    '/run/records',
    body,
  );
  return response.data;
};

export const useAddRunningRecord = (
  onSuccess: () => void,
  onError: (message: string) => void,
) => {
  return useMutation<RunningRecordResponse, Error, RunningRecordRequest>({
    mutationFn: (body: RunningRecordRequest) => runningRecord(body),
    onSuccess: (data) => {
      onSuccess();
      console.log('러닝 기록 생성 성공:', data);
    },
    onError: (error) => {
      // 에러 처리 로직
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          console.error('잘못된 입력: ', error.response?.data);
          onError(error.response?.data?.message);
        } else {
          console.error('러닝 기록 생성 실패: ', error.message);
          onError(error.response?.data?.message);
        }
      } else {
        console.error('알 수 없는 오류 발생: ', error);
        onError(error?.message);
      }
    },
  });
};