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
  default: false,
});
export const crewApprovalRequiredState = atom<boolean>({
  key: 'crewApprovalRequiredState',
  default: false,
});
export const crewImageState = atom<File | null>({
  key: 'crewImageState',
  default: null,
});
export const crewCapacityState = atom<number | ''>({
  key: 'crewCapacityState',
  default: '',
});

export const crewGenderRestrictionState = atom<string | ''>({
  key: 'crewGenderRestrictionState',
  default: '', //
});

export const crewMinAgeState = atom<number | ''>({
  key: 'crewMinAgeState',
  default: '',
});
export const crewMaxAgeState = atom<number | ''>({
  key: 'crewMinAgeState',
  default: '',
});
