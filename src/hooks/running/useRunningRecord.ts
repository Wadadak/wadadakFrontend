import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { UserProfileResponse } from '@/types/userTypes';
import { RunningRecordResponse } from '@/types/runningTypes';

// 러닝 기록 조회 api 호출
export const fetchRunningRecord = async (
  runningRecordId: number,
): Promise<RunningRecordResponse> => {
  const response = await axiosInstance.get<RunningRecordResponse>(
    `/run/records/${runningRecordId}`,
  );

  console.log('fetchRunningRecord response', response);
  return response.data;
};

// 러닝 기록 조회 훅
export const useRunningRecord = (runningRecordId: number) => {
  return useQuery<RunningRecordResponse, Error>({
    queryKey: ['runningRecord', runningRecordId],
    queryFn: () => fetchRunningRecord(runningRecordId),
  });
};
