export interface RunningListRequest {
  size?: number;
  page?: number;
}

export interface RunningRecord {
  runRecordId?: number;
  distance: number;
  pace: string;
  runningTime: string;
  runningDate?: string; // 명세서에 없음
  createdAt?: string;
}

export interface Pagination {
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

export interface RunningListResponse {
  status: string;
  message: string;
  data: RunningRecord[];
  pagination: Pagination;
}

export interface RunningRecordRequest extends RunningRecord {
  goalId: number;
  isPublic: number;
}
// {
//   "distance": "5.0",
//   "pace": "5' 30\"",
//   "runningTime": "00:30:00",
//   "runningDate": "2024-08-07",
// }

export interface RunningRecordResponse {
  status: string;
  message: string;
  runningRecord: RunningRecord;
}

export interface TotalRunningRecordResponse {
  distance: number;
  runningTime: number;
  pace: string;
  isPublic: number;
}

