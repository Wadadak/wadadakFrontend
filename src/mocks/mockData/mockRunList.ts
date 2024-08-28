interface RunningInfo {
  runRecordId: number; // 1
  distance: number; // 2.0
  pace: string; //2'30"
  runningTime: string; //0:25:10
  runningDate: string; //2024-08-05
  createdAt: string; //2024-08:08T12:23:34Z
}

interface MockRunningList {
  data: RunningInfo[];
  pagination: null;
}

interface MyRunningInfo {
  totalDistance: number;
  totalRunningCount: number;
  averagePace: string;
  averageRunningTime: string;
}

export const mockMyRunningInfo: MyRunningInfo = {
  totalDistance: 143.2,
  totalRunningCount: 23,
  averagePace: '4\'55"',
  averageRunningTime: '0:35:21',
};

export const mockRunningList: MockRunningList = {
  data: [
    {
      runRecordId: 1,
      distance: 5.0,
      pace: '4\'50"',
      runningTime: '0:24:10',
      runningDate: '2024-08-01',
      createdAt: '2024-08-01T06:45:12Z',
    },
    {
      runRecordId: 2,
      distance: 3.2,
      pace: '5\'15"',
      runningTime: '0:16:48',
      runningDate: '2024-08-02',
      createdAt: '2024-08-02T07:10:45Z',
    },
    {
      runRecordId: 3,
      distance: 10.0,
      pace: '4\'30"',
      runningTime: '0:45:00',
      runningDate: '2024-08-03',
      createdAt: '2024-08-03T08:15:30Z',
    },
    {
      runRecordId: 4,
      distance: 7.5,
      pace: '4\'45"',
      runningTime: '0:35:37',
      runningDate: '2024-08-04',
      createdAt: '2024-08-04T09:20:50Z',
    },
    {
      runRecordId: 5,
      distance: 2.0,
      pace: '6\'00"',
      runningTime: '0:12:00',
      runningDate: '2024-08-05',
      createdAt: '2024-08-05T10:25:15Z',
    },
    {
      runRecordId: 6,
      distance: 8.0,
      pace: '5\'00"',
      runningTime: '0:40:00',
      runningDate: '2024-08-06',
      createdAt: '2024-08-06T11:30:27Z',
    },
    {
      runRecordId: 7,
      distance: 4.0,
      pace: '5\'30"',
      runningTime: '0:22:00',
      runningDate: '2024-08-07',
      createdAt: '2024-08-07T12:35:45Z',
    },
    {
      runRecordId: 8,
      distance: 6.0,
      pace: '5\'10"',
      runningTime: '0:31:00',
      runningDate: '2024-08-08',
      createdAt: '2024-08-08T13:40:50Z',
    },
    {
      runRecordId: 9,
      distance: 9.0,
      pace: '4\'45"',
      runningTime: '0:42:45',
      runningDate: '2024-08-09',
      createdAt: '2024-08-09T14:45:55Z',
    },
    {
      runRecordId: 10,
      distance: 5.5,
      pace: '5\'20"',
      runningTime: '0:29:10',
      runningDate: '2024-08-10',
      createdAt: '2024-08-10T15:50:22Z',
    },
    {
      runRecordId: 11,
      distance: 7.0,
      pace: '4\'55"',
      runningTime: '0:34:25',
      runningDate: '2024-08-11',
      createdAt: '2024-08-11T16:55:30Z',
    },
    {
      runRecordId: 12,
      distance: 3.5,
      pace: '5\'25"',
      runningTime: '0:18:57',
      runningDate: '2024-08-12',
      createdAt: '2024-08-12T17:00:50Z',
    },
    {
      runRecordId: 13,
      distance: 12.0,
      pace: '4\'40"',
      runningTime: '0:56:00',
      runningDate: '2024-08-13',
      createdAt: '2024-08-13T18:05:15Z',
    },
    {
      runRecordId: 14,
      distance: 2.5,
      pace: '5\'50"',
      runningTime: '0:14:35',
      runningDate: '2024-08-14',
      createdAt: '2024-08-14T19:10:27Z',
    },
    {
      runRecordId: 15,
      distance: 11.0,
      pace: '4\'35"',
      runningTime: '0:50:25',
      runningDate: '2024-08-15',
      createdAt: '2024-08-15T20:15:33Z',
    },
    {
      runRecordId: 16,
      distance: 4.2,
      pace: '5\'05"',
      runningTime: '0:21:18',
      runningDate: '2024-08-16',
      createdAt: '2024-08-16T21:20:50Z',
    },
    {
      runRecordId: 17,
      distance: 6.7,
      pace: '4\'50"',
      runningTime: '0:32:19',
      runningDate: '2024-08-17',
      createdAt: '2024-08-17T22:25:55Z',
    },
    {
      runRecordId: 18,
      distance: 9.5,
      pace: '4\'55"',
      runningTime: '0:46:38',
      runningDate: '2024-08-18',
      createdAt: '2024-08-18T23:30:15Z',
    },
    {
      runRecordId: 19,
      distance: 8.8,
      pace: '5\'10"',
      runningTime: '0:45:28',
      runningDate: '2024-08-19',
      createdAt: '2024-08-19T00:35:22Z',
    },
    {
      runRecordId: 20,
      distance: 3.0,
      pace: '5\'35"',
      runningTime: '0:16:45',
      runningDate: '2024-08-20',
      createdAt: '2024-08-20T01:40:45Z',
    },
  ],
  pagination: null,
};
