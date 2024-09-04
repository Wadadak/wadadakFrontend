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
  imageUrl?: string | null;
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

export interface EditProfileRequest {
  nickName?: string;
  gender?: genderType;
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

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  checkNewPassword: string;
}