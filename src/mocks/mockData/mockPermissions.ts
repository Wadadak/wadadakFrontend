export interface MockPermissions {
  crewId: number;
  role: 'LEADER' | 'STAFF' | 'MEMBER';
}

export const mockPermissions: MockPermissions[] = [
  {
    crewId: 1,
    role: 'LEADER',
  },
  {
    crewId: 2,
    role: 'STAFF',
  },
  {
    crewId: 3,
    role: 'MEMBER',
  },
  {
    crewId: 4,
    role: 'LEADER',
  },
  {
    crewId: 5,
    role: 'STAFF',
  },
];
