import { atom } from 'recoil';

export const currentPageState = atom<number>({
  key: 'currentPageState',
  default: 1,
});

export const pageRangeDisplayedState = atom<number>({
  key: 'pageRangeDisplayedState',
  default: 5,
});
