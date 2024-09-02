export interface RunningListRequest {
  size?: number;
  page?: number;
}

export interface RunningRecord {
  runRecordId?: number;
  distance: number;
  pace: string;
  runningTime: string;
  runningDate: string;
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

export interface RunningRecordRequest extends RunningRecord {}
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
