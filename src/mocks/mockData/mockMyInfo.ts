export interface myInfo {
  username: string;
  nickname: string;
  profileImage: string;
  phoneNumber: string;
  gender: string; //MALE, FEMALE
  birthYear: number;
  activityRegion: string;
  nameVisibility: string;
  phoenNumberVisibility: string;
  genderVisibility: string;
  birthYearVisibility: string;
  profieImageVisibility: string;
}

export const mockMyInfo: myInfo = {
  username: '정희철',
  nickname: '날아라호빵맨',
  profileImage: '',
  phoneNumber: '01011112345',
  gender: 'MALE',
  birthYear: 1990,
  activityRegion: '3',
  phoenNumberVisibility: 'PUBLIC',
  nameVisibility: 'PUBLIC',
  genderVisibility: 'PRIVATE',
  birthYearVisibility: 'PUBLIC',
  profieImageVisibility: 'PUBLIC',
};
