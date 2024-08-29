// 권한 조회

import axiosInstance from '@/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface UserRoleResponse {
  crewId: number;
  role: 'LEADER' | 'STAFF' | 'MEMBER';
}

// 권한 조회 api 호출
export const fetchUserRole = async (
  crewId: number,
): Promise<UserRoleResponse[]> => {
  const response = await axiosInstance.get<UserRoleResponse[]>(
    `/crew/${crewId}/role`,
  );
  return response.data;
};

// 권한 조회 쿼리 훅
export const useUserRoles = (crewId: number) => {
  return useQuery<UserRoleResponse | undefined, Error>({
    queryKey: ['roles', crewId],
    queryFn: async () => {
      const roles = await fetchUserRole(crewId);
      return roles.find((role) => role.crewId === crewId);
    },
  });
};
