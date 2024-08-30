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
  gender?: 'MALE' | 'FEMALE'; // 성별 제한 (없을 경우 빈 문자열)
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
  limit: CrewLimit;
}

export interface CrewSummary {
  crewId: number;
  crewName: string;
  crewImage?: string;
  leader: string;
  crewCapacity?: number;
  crewOccupancy: number;
  activityRegion: string;
  isJoined: boolean;
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

// 정기 러닝
export interface RunningInfo {
  id: number;
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

// export interface RunningSchedule {
//   activityId?: string;
//   title: string;
//   category: 'REGULAR' | 'ON_DEMAND'; // 정기 or 번개
//   date: string | null; // yyyy-MM-dd 형식
//   startTime: string | null; // HH:mm 형식
//   endTime: string | null; // HH:mm 형식
//   memo: string; // 메모, 200자 이내
//   location: string; // 장소 (구체적인 주소)
//   regularId?: number; // 정기러닝 ID (정기러닝 등록 시 필수, 선택적)
//   author: string;
//   participant?: number;
// }
