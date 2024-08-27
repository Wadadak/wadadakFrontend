export interface RegularRunningInfo {
  id?: number;
  week: number | null;
  count: number | null;
  dayOfWeek: string[];
  activityRegion: string;
  time?: string;
}

export interface Crew {
  crewId: number;
  crewName: string;
  description: string;
  crewImage?: string | null;
  crewCapacity: number;
  crewOccupancy: number;
  leaderRequired: boolean;
  activityRegion: string;
  regularRunningInfo?: RegularRunningInfo[];
  genderRestriction?: string; // 성별 제한 (없을 경우 빈 문자열)
  minAge?: number | null; // 최소 나이 제한 (없을 경우 null)
  maxAge?: number | null; // 최대 나이 제한 (없을 경우 null)
  publicRecordRequired?: boolean; // 공개 기록이 필요한지 여부
  approvalRequired?: boolean; // 가입 승인 필요 여부
}
