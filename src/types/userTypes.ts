export type visibilityType = 'PUBLIC' | 'PRIVATE';
export type genderType = 'MALE' | 'FEMALE';

export interface SignupRequest {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  nickName?: string;
  phoneNumber?: string;
  profileImage?: File | Blob;
  gender?: genderType;
  birthYear?: number;
  activityRegion?: string;
  nameVisibility?: visibilityType;
  phoneNumberVisibility?: visibilityType;
  genderVisibility?: visibilityType;
  birthYearVisibility?: visibilityType;
}

export interface UserProfileResponse {
  user_id: number;
  username: string;
  nickName: string;
  profileImage: string;
  phoneNumber: string;
  gender: genderType;
  birthYear: number;
  activityRegion: string;
  nameVisibility?: visibilityType;
  phoneNumberVisibility?: visibilityType;
  genderVisibility?: visibilityType;
  birthYearVisibility?: visibilityType;
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
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  accessJwt: string;
  refreshJwt: string;
}