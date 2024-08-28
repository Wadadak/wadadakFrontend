// src/hooks/useUserPermissions.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Permission {
  crewId: number;
  role: 'LEADER' | 'STAFF' | 'MEMBER';
}

// [x] Mock 데이터 가져오기 함수
const fetchUserPermissions = async (): Promise<Permission[]> => {
  // TODO 실제 API 호출 시 주석을 제거
  // const { data } = await axios.get('/api/user/permissions');
  // return data;

  // 목데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { crewId: 1, role: 'LEADER' },
        { crewId: 2, role: 'STAFF' },
        { crewId: 3, role: 'MEMBER' },
      ]);
    }, 1000);
  });
};

export const useUserPermissions = () => {
  return useQuery(['userPermissions'], fetchUserPermissions);
};
