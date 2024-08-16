import { atom } from 'recoil';

export const crewListState = atom({
  key: 'crewListState',
  default: [],
});

export const crewNameState = atom<string>({
  key: 'crewName',
  default: '',
});

export const crewDescriptionState = atom<string>({
  key: 'crewDescriptionState',
  default: '',
});
export const crewLocationState = atom<string>({
  key: 'crewLocationState',
  default: '',
});
export const runningRecordRequiredState = atom<boolean>({
  key: 'crewPublicRecordState',
  default: true,
});
export const crewApprovalRequiredState = atom<boolean>({
  key: 'crewApprovalRequiredState',
  default: true,
});
export const crewImageState = atom<File | null>({
  key: 'crewImageState',
  default: null,
});
export const crewCapacityState = atom<number | undefined>({
  key: 'crewCapacityState',
  default: undefined,
});

export const crewGenderRestrictionState = atom<string | ''>({
  key: 'crewGenderRestrictionState',
  default: '', //
});

export const crewMinAgeState = atom<number | null>({
  key: 'crewMinAgeState',
  default: null,
});
export const crewMaxAgeState = atom<number | null>({
  key: 'crewMinAgeState',
  default: null,
});
