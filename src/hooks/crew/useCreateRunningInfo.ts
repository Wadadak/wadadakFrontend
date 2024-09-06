import axiosInstance from '@/apis/axiosInstance';
import { RunningInfo, RunningInfoRequest } from '@/types/crewTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createRunningInfo = async (
  crewId: number,
  data: RunningInfoRequest,
): Promise<RunningInfo> => {
  const response = await axiosInstance.post<RunningInfo>(
    `/crew/${crewId}/regular`,
    data,
  );
  return response.data;
};

export const useCreateRunningInfo = (
  crewId: number,
  handleCloseModal: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<RunningInfo, Error, RunningInfoRequest>({
    mutationFn: (newRunningInfo: RunningInfoRequest) =>
      createRunningInfo(crewId, newRunningInfo),
    onSuccess: () => {
      alert('정기 러닝 정보가 성공적으로 등록되었습니다!');
      queryClient.invalidateQueries({
        queryKey: ['crewRunningInfo', crewId],
      });
      handleCloseModal();
    },
    onError: (error) => {
      alert(`등록 중 오류가 발생했습니다: ${error.message}`);
    },
  });
};
