import { Crew } from '@/types/crewTypes';

export const mockCrewList: Crew[] = [
  {
    crewId: 1,
    crewName: 'Crew 1',
    description:
      '우리 러닝 크루는 함께 달리는 즐거움을 공유하고, 건강한 라이프스타일을 지향하는 열정적인 러너들의 모임입니다. 초보자부터 숙련된 러너까지 모두가 참여할 수 있으며, 서로의 목표를 응원하며 성취감을 나눕니다. 주기적인 러닝 세션과 다양한 이벤트를 통해 몸과 마음을 단련하고, 함께하는 시간을 통해 끈끈한 유대감을 형성합니다. 운동을 통해 새로운 도전을 하고자 하신다면, 우리 러닝 크루와 함께하세요. 모두가 주인공이 되는 이곳에서, 새로운 자신을 발견해보세요!',
    crewImage: null,
    crewCapacity: 15,
    crewOccupancy: 10,
    leaderRequired: false,
    activityRegion: '서울',
    genderRestriction: '',
    minAge: 2000,
    maxAge: 1995,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 2,
        count: 1,
        dayOfWeek: ['월요일', '목요일'],
        activityRegion: '서울',
        time: '06:00',
      },
    ],
  },
  {
    crewId: 2,
    crewName: 'Crew 2',
    description: '이것은 Crew 2입니다.',
    crewImage: null,
    crewCapacity: 12,
    crewOccupancy: 8,
    leaderRequired: false,
    activityRegion: '부산',
    genderRestriction: '남성',
    minAge: 2003,
    maxAge: 1998,
    publicRecordRequired: true,
    approvalRequired: false,
    regularRunningInfo: [],
  },
  {
    crewId: 3,
    crewName: 'Crew 3',
    description: '이것은 Crew 3입니다.',
    crewImage: null,
    crewCapacity: 15,
    crewOccupancy: 10,
    leaderRequired: true,
    activityRegion: '인천',
    genderRestriction: '여성',
    minAge: 1999,
    maxAge: 1992,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 3,
        count: 2,
        dayOfWeek: ['수요일', '금요일'],
        activityRegion: '부산',
        time: '07:00',
      },
    ],
  },
  {
    crewId: 4,
    crewName: 'Crew 4',
    description: '이것은 Crew 4입니다.',
    crewImage: null,
    crewCapacity: 8,
    crewOccupancy: 5,
    leaderRequired: false,
    activityRegion: '대구',
    genderRestriction: '',
    minAge: 2005,
    maxAge: 1997,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 4,
        count: 1,
        dayOfWeek: ['일요일'],
        activityRegion: '대구',
        time: '08:00',
      },
    ],
  },
  {
    crewId: 5,
    crewName: 'Crew 5',
    description: '이것은 Crew 5입니다.',
    crewImage: null,
    crewCapacity: 20,
    crewOccupancy: 18,
    leaderRequired: true,
    activityRegion: '광주',
    genderRestriction: '여성',
    minAge: 2000,
    maxAge: 1995,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 1,
        count: 1,
        dayOfWeek: ['토요일'],
        activityRegion: '광주',
        time: '09:00',
      },
    ],
  },
  {
    crewId: 6,
    crewName: 'Crew 6',
    description: '이것은 Crew 6입니다.',
    crewImage: null,
    crewCapacity: 25,
    crewOccupancy: 20,
    leaderRequired: false,
    activityRegion: '대전',
    genderRestriction: '',
    minAge: 2002,
    maxAge: 1995,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 2,
        count: 1,
        dayOfWeek: ['화요일'],
        activityRegion: '대전',
        time: '07:30',
      },
    ],
  },
  {
    crewId: 7,
    crewName: 'Crew 7',
    description: '이것은 Crew 7입니다.',
    crewImage: null,
    crewCapacity: 10,
    crewOccupancy: 10,
    leaderRequired: true,
    activityRegion: '서울',
    genderRestriction: '여성',
    minAge: 2001,
    maxAge: 1995,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 1,
        count: 1,
        dayOfWeek: ['월요일'],
        activityRegion: '서울',
        time: '06:30',
      },
    ],
  },
  {
    crewId: 8,
    crewName: 'Crew 8',
    description: '이것은 Crew 8입니다.',
    crewImage: null,
    crewCapacity: 30,
    crewOccupancy: 25,
    leaderRequired: true,
    activityRegion: '인천',
    genderRestriction: '남성',
    minAge: 2000,
    maxAge: 1990,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 3,
        count: 1,
        dayOfWeek: ['목요일'],
        activityRegion: '인천',
        time: '05:45',
      },
    ],
  },
  {
    crewId: 9,
    crewName: 'Crew 9',
    description: '이것은 Crew 9입니다.',
    crewImage: null,
    crewCapacity: 18,
    crewOccupancy: 12,
    leaderRequired: false,
    activityRegion: '부산',
    genderRestriction: '',
    minAge: 2003,
    maxAge: 1999,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 2,
        count: 1,
        dayOfWeek: ['금요일'],
        activityRegion: '부산',
        time: '06:15',
      },
    ],
  },
  {
    crewId: 10,
    crewName: 'Crew 10',
    description: '이것은 Crew 10입니다.',
    crewImage: null,
    crewCapacity: 40,
    crewOccupancy: 35,
    leaderRequired: true,
    activityRegion: '전국',
    genderRestriction: '',
    minAge: 2005,
    maxAge: 1995,
    publicRecordRequired: true,
    approvalRequired: true,
    regularRunningInfo: [
      {
        id: 1,
        week: 4,
        count: 2,
        dayOfWeek: ['토요일', '일요일'],
        activityRegion: '서울',
        time: '07:00',
      },
      {
        id: 2,
        week: 2,
        count: 1,
        dayOfWeek: ['수요일'],
        activityRegion: '부산',
        time: '06:00',
      },
    ],
  },
];
