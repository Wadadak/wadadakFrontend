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
  genderRestriction?: string; // 성별 제한 (없을 경우 빈 문자열)
  minAge?: number | null; // 최소 나이 제한 (없을 경우 null)
  maxAge?: number | null; // 최대 나이 제한 (없을 경우 null)
  publicRecordRequired?: boolean; // 공개 기록이 필요한지 여부
  approvalRequired?: boolean; // 가입 승인 필요 여부
}

export interface RunningSchedule {
  activityId?: string;
  title: string;
  category: 'REGULAR' | 'ON_DEMAND'; // 정기 or 번개
  date: string | null; // yyyy-MM-dd 형식
  startTime: string | null; // HH:mm 형식
  endTime: string | null; // HH:mm 형식
  memo: string; // 메모, 200자 이내
  location: string; // 장소 (구체적인 주소)
  regularId?: number; // 정기러닝 ID (정기러닝 등록 시 필수, 선택적)
  author: string;
  participant?: number;
}
