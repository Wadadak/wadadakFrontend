export interface CrewMember {
  id: number;
  name: string;
  avatar?: string | '';
  role: 'leader' | 'staff' | 'member'; // 역할 추가
}

export type CrewMembers = CrewMember[];
