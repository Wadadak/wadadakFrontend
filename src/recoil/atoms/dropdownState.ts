import { atom } from 'recoil';

export const dropdownState = atom<string | string[]>({
  key: 'dropdownState',
  default: '',
});
