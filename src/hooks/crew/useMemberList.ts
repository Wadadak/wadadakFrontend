import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface MemberListParams {
  gender?: string;
  minYear?: number;
  maxYear?: number;
  crewRole?: 'LEADER' | 'STAFF' | 'MEMBER';
  page?: number;
  size?: number;
  sort?: string;
}

export interface MemberSummary {
  memberId: number;
  memberNickName: string;
  memberProfileImage: string;
}

const fetchMemberList = async (
  params: MemberListParams,
  crewId: number,
): Promise<{
  members: MemberSummary[];
  totalPages: number;
}> => {
  const response = await axiosInstance.get<{
    content: MemberSummary[];
    totalPages: number;
  }>(`/crew/${crewId}/member/list`, { params });

  return {
    members: response.data.content,
    totalPages: response.data.totalPages,
  };
};

export const useMemberList = (params: MemberListParams, crewId: number) => {
  return useQuery<{
    members: MemberSummary[];
    totalPages: number;
  }>({
    queryKey: ['memberList', params, crewId],
    queryFn: () => fetchMemberList(params, crewId),
  });
};
