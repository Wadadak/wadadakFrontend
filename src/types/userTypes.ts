//
export interface UserInfoResponse {
  user_id: number;
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
