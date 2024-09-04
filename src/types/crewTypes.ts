// 크루 생성 요청 본문
export interface CreateCrewData {
  crewName: string;
  description: string;
  crewCapacity?: number;
  activityRegion: string;
  crewImage?: File;
  runRecordOpen: boolean; // 공개 기록이 필요한지 여부
  minYear?: number;
  maxYear?: number;
  gender?: string; // 성별 제한
  leaderRequired: boolean;
}

// 크루 정보 수정 요청 본문
export interface UpdateCrewData {
  description: string;
  crewCapacity?: number;
  activityRegion: string;
  crewImage?: File;
  runRecordOpen: boolean; // 공개 기록이 필요한지 여부
  minYear?: number;
  maxYear?: number;
  gender?: string; // 성별 제한 (없을 경우 빈 문자열)
  leaderRequired: boolean;
}

// 크루 생성, 수정 응답 본문
export interface CrewResponse {
  crewId: number;
  crewImage: string;
  crewName: string;
  leader: string;
  crewCapacity?: number;
  crewOccupancy: 1;
  activityRegion: string;
}

// 크루 제한 사항
export interface CrewLimit {
  gender?: string;
  minYear?: number;
  maxYear?: number;
  leaderRequired: boolean;
  runRecordOpen: boolean;
}

// 크루 정보 조회 응답 본문
export interface CrewInfoResponse {
  crewId: number;
  crewName: string;
  crewImage?: string;
  leader: string;
  description: string;
  crewCapacity?: number;
  crewOccupancy: number;
  activityRegion: string;
  runningCount?: number;
  joined: boolean;
  limit: CrewLimit;
}

// 크루 리스트
export interface CrewSummary {
  crewId: number;
  crewName: string;
  crewImage?: string;
  leader: string;
  crewCapacity?: number;
  crewOccupancy: number;
  activityRegion: string;
  joined: boolean;
}

// 크루 리스트 파라미터
export interface CrewListParams {
  activityRegion?: string;
  minYear?: number;
  maxYear?: number;
  gender?: string;
  runRecordPublic?: boolean;
  leaderRequired?: boolean;
  occupancyStatus?: 'FULL' | 'AVAILABLE';
  size?: number; // 페이지 당 항목 수
  page?: number; // 현재 페이지 번호
}

// 가입한 크루 리스트
export interface JoinedCrewSummary {
  crewId: number;
  crewName: string;
  crewImage?: string;
  role: 'LEADER' | 'STAFF' | 'MEMBER';
  leader: string;
  crewCapacity?: number;
  crewOccupancy: number;
  activityRegion: string;
}

// 정기 러닝 응답
export interface RunningInfo {
  id: number;
  week: number;
  count: number;
  dayOfWeek: string[];
  activityRegion: string;
  time?: string;
}

export interface RunningInfoRequest {
  week: number;
  count: number;
  dayOfWeek: string[];
  activityRegion: string;
  time?: string;
}

export interface CrewRunningInfo {
  crewId: number;
  data: RunningInfo[];
}

export interface ScheduleRequest {
  title?: string;
  category: 'REGULAR' | 'ON_DEMAND'; // 정기 또는 번개
  date: string; // yyyy-MM-dd 형식
  startTime: string; // HH:mm 형식
  endTime?: string; // HH:mm 형식
  memo?: string;
  location: string;
  regularId?: number; // 정기러닝 ID (선택)
}

export interface ScheduleResponse {
  activityId: number;
  author: string;
  category: string;
  regularId?: number;
  title?: string;
  date: string;
  startTime: string;
  endTime?: string;
  memo?: string;
  location: string;
  participant: number;
}

export interface UpcomingSchedule {
  activityId: number;
  title: string;
  category: 'REGULAR' | 'ON_DEMAND';
  regularId?: number | null;
  author: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
  location: string;
  participant: number;
}

export interface UpcomingScheduleResponse {
  schedules: UpcomingSchedule[];
  totalPages: number;
}
