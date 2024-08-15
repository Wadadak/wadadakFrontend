import { Crew } from '@/types/crewTypes';

export const mockCrewList: Crew[] = [
  {
    crew_id: 1,
    crewName: 'Crew 1',
    description: '이것은 Crew 1입니다.',
    // crewImage: 'https://example.com/images/crew1.jpg',
    crewCapacity: 15,
    crewOccupancy: 10,
    leaderRequired: false,
    activityRegion: '서울',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 2,
          times: 1,
        },
        weekdays: ['월요일', '목요일'],
        location: '서울',
      },
    ],
  },
  {
    crew_id: 2,
    crewName: 'Crew 2',
    description: '이것은 Crew 2입니다.',
    // crewImage: 'https://example.com/images/crew2.jpg',
    crewCapacity: 12,
    crewOccupancy: 8,
    leaderRequired: false,
    activityRegion: '부산',
    regularRunningInfo: [],
  },
  {
    crew_id: 3,
    crewName: 'Crew 3',
    description: '이것은 Crew 3입니다.',
    // crewImage: 'https://example.com/images/crew3.jpg',
    crewCapacity: 15,
    crewOccupancy: 10,
    leaderRequired: true,
    activityRegion: '인천',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 3,
          times: 2,
        },
        weekdays: ['수요일', '금요일'],
        location: '부산',
      },
    ],
  },
  {
    crew_id: 4,
    crewName: 'Crew 4',
    description: '이것은 Crew 4입니다.',
    // crewImage: 'https://example.com/images/crew4.jpg',
    crewCapacity: 8,
    crewOccupancy: 5,
    leaderRequired: false,
    activityRegion: '대구',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 4,
          times: 1,
        },
        weekdays: ['일요일'],
        location: '대구',
      },
    ],
  },
  {
    crew_id: 5,
    crewName: 'Crew 5',
    description: '이것은 Crew 5입니다.',
    // crewImage: 'https://example.com/images/crew5.jpg',
    crewCapacity: 20,
    crewOccupancy: 18,
    leaderRequired: true,
    activityRegion: '광주',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 1,
          times: 1,
        },
        weekdays: ['토요일'],
        location: '광주',
      },
    ],
  },
  {
    crew_id: 6,
    crewName: 'Crew 6',
    description: '이것은 Crew 6입니다.',
    // crewImage: 'https://example.com/images/crew6.jpg',
    crewCapacity: 25,
    crewOccupancy: 20,
    leaderRequired: false,
    activityRegion: '대전',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 2,
          times: 1,
        },
        weekdays: ['화요일'],
        location: '대전',
      },
    ],
  },
  {
    crew_id: 7,
    crewName: 'Crew 7',
    description: '이것은 Crew 7입니다.',
    // crewImage: 'https://example.com/images/crew7.jpg',
    crewCapacity: 10,
    crewOccupancy: 10,
    leaderRequired: true,
    activityRegion: '서울',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 1,
          times: 1,
        },
        weekdays: ['월요일'],
        location: '서울',
      },
    ],
  },
  {
    crew_id: 8,
    crewName: 'Crew 8',
    description: '이것은 Crew 8입니다.',
    // crewImage: 'https://example.com/images/crew8.jpg',
    crewCapacity: 30,
    crewOccupancy: 25,
    leaderRequired: true,
    activityRegion: '인천',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 3,
          times: 1,
        },
        weekdays: ['목요일'],
        location: '인천',
      },
    ],
  },
  {
    crew_id: 9,
    crewName: 'Crew 9',
    description: '이것은 Crew 9입니다.',
    // crewImage: 'https://example.com/images/crew9.jpg',
    crewCapacity: 18,
    crewOccupancy: 12,
    leaderRequired: false,
    activityRegion: '부산',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 2,
          times: 1,
        },
        weekdays: ['금요일'],
        location: '부산',
      },
    ],
  },
  {
    crew_id: 10,
    crewName: 'Crew 10',
    description: '이것은 Crew 10입니다.',
    // crewImage: 'https://example.com/images/crew10.jpg',
    crewCapacity: 40,
    crewOccupancy: 35,
    leaderRequired: true,
    activityRegion: '전국',
    regularRunningInfo: [
      {
        id: 1,
        frequency: {
          weeks: 4,
          times: 2,
        },
        weekdays: ['토요일', '일요일'],
        location: '서울',
      },
      {
        id: 2,
        frequency: {
          weeks: 2,
          times: 1,
        },
        weekdays: ['수요일'],
        location: '부산',
      },
    ],
  },
];
