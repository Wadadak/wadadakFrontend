'use client';

import { extractUserIdFromToken } from '@/app/login/page';
import { useUserProfile } from './useUserProfile';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from '@/recoil/atoms/userState';
import { getAccessToken, removeAccessToken } from '@/apis/authService';

///user/{user_id}/profile
export const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const userId = extractUserIdFromToken(getAccessToken());
  const { data: user, refetch } = useUserProfile(userId ?? 0);

  useEffect(() => {
    if (userId && userId > 0) {
      refetch();
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setLoginUser(user);
    }
  }, [user]);

  return {
    loginUser,
    logout: () => {
      setLoginUser(undefined);
      removeAccessToken();
    },
  };
};
