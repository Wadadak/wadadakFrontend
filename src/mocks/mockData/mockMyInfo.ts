export interface userInfo {
  email: string; //임시데이터
  password: string; //임시데이터
  username: string;
  nickname: string;
  profileImage: string;
  phoneNumber: string;
  gender: string; //MALE, FEMALE
  birthYear: number;
  activityRegion: string;
  nameVisibility: string;
  phoneNumberVisibility: string;
  genderVisibility: string;
  birthYearVisibility: string;
  profileImageVisibility: string;
}

export const mockMyInfo: userInfo = {
  email: 'wadadak@gmail.com',
  password: '1234',
  username: '와다닥',
  nickname: '날아라호빵맨',
  profileImage: 'https://picsum.photos/200/200',
  phoneNumber: '01055670111',
  gender: 'MALE',
  birthYear: 1990,
  activityRegion: 'gyeonggi',
  phoneNumberVisibility: 'PUBLIC',
  nameVisibility: 'PUBLIC',
  genderVisibility: 'PRIVATE',
  birthYearVisibility: 'PRIVATE',
  profileImageVisibility: 'PUBLIC',
};
