export type visibilityType = 'PUBLIC' | 'PRIVATE';
export type genderType = 'MALE' | 'FEMALE';

export interface SignupRequest {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  nickName?: string;
  phoneNumber?: string;
  profileImage?: File | Blob | string;
  gender?: genderType;
  birthYear?: number;
  activityRegion?: string;
  nameVisibility?: visibilityType;
  phoneNumberVisibility?: visibilityType;
  genderVisibility?: visibilityType;
  birthYearVisibility?: visibilityType;
}

export interface UserProfileResponse extends SignupRequest {
  user_id: number;
}

export interface SignupResponse {
  id: number;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  name: string;
  nickName: string;
  birthYear: number;
  gender: string;
  roles: string[];
  activityRegion?: string | null;
  imageUrl?: string | null;
  nameVisibility: string;
  phoneNumberVisibility: string;
  genderVisibility: string;
  birthYearVisibility: string;
  profileImageVisibility: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  accessJwt: string;
  refreshJwt: string;
}
<<<<<<< HEAD
=======

export interface EditProfileRequest {
  nickname?: string;
  gender?: number;
  birthYear?: number;
  activityRegion?: string;
  profileImage?: File | Blob | string;
  nameVisibility?: visibilityType;
  phoneNumberVisibility?: visibilityType;
  genderVisibility?: visibilityType;
  birthYearVisibility?: visibilityType;
}

export interface EditProfileResponse extends EditProfileRequest {
  user_id: number;
  username: string;
  phoneNumber: string;
}
>>>>>>> d68ddeb35ab8c3d0b775e9b5242e5c7449511ced
