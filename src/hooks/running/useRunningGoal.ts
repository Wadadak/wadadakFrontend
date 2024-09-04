import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { MyRunningGoalItem, MyRunningGoalResponse } from '@/types/runningTypes';

// 러닝 기록 목록 조회 api 호출
export const fetchRunningGoal = async (): Promise<MyRunningGoalItem[]> => {
  const response =
    await axiosInstance.get<MyRunningGoalItem[]>(`/run/goals/my`);

  console.log('fetchRunningGoal response', response);
  return response.data;
};

// 사용자 정보 조회 훅
export const useRunningGoal = () => {
  return useQuery<MyRunningGoalItem[], Error>({
    queryKey: ['RunningGoal'],
    queryFn: fetchRunningGoal,
  });
};
