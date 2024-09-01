import axiosInstance from '@/apis/axiosInstance';
import { useMutation } from '@tanstack/react-query';

export interface ApplyForCrewResponse {
  joinApplyId: number;
  crewName: string;
  crewImage?: string | null;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  capacity: number;
  currentMemberCount: number;
  applyMessage?: string;
  description: string;
  activityRegion: string;
  appliedAt: string;
  updatedAt: string;
}

export const applyForCrew = async (
  crewId: number,
  message?: string,
): Promise<ApplyForCrewResponse> => {
  const response = await axiosInstance.post<ApplyForCrewResponse>(
    `/crew/${crewId}/join/apply`,
    { message },
  );
  return response.data;
};

export const useApplyForCrew = () => {
  return useMutation({
    mutationFn: ({ crewId, message }: { crewId: number; message?: string }) =>
      applyForCrew(crewId, message),
    onSuccess: (data) => {
      console.log('가입 신청 성공:', data);
      // TODO 성공 시 처리 로직 추가 (예: 알림 표시, 페이지 리다이렉트 등)
    },
    onError: (error) => {
      console.error('가입 신청 실패:', error);
      // TODO 실패 시 처리 로직 추가 (예: 에러 메시지 표시)
    },
  });
};
