export interface RegularRunningInfo {
  id: number;
  frequency: { weeks: number; times: number };
  weekdays: string[];
  location: string;
}

export interface Crew {
  crew_id: number;
  crewName: string;
  description: string;
  crewImage?: string;
  crewCapacity: number;
  crewOccupancy: number;
  leaderRequired: boolean;
  activityRegion: string;
  regularRunningInfo?: RegularRunningInfo[];
}
