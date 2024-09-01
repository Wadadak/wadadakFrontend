import { UserProfileResponse } from '@/types/userTypes';
import { atom } from 'recoil';

//로그인했는지 여부 임시 리코일입니다. 로그인 기능을 구현하면 삭제할 예정입니다.
export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const loginUserState = atom<UserProfileResponse | undefined>({
  key: 'loginUserState',
  default: undefined,
});
