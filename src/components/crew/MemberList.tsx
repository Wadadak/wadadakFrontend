import React, { ReactNode } from 'react';
import Avatar from '../common/Avatar';
import { CrewMembers } from '@/types/memberTypes';
import { useRouter } from 'next/navigation';

interface MemberListProps {
  members: CrewMembers;
  children: ReactNode;
}

const MemberList = ({ members, children }: MemberListProps) => {
  const router = useRouter();

  // TODO url 변경
  const handleProfileClick = () => {
    router.push(`/profile`);
  };

  // TODO url 변경
  const handleChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/chat`);
  };

  return (
    <div
      className="grid gap-4 md:grid-cols-2 cursor-pointer"
      onClick={handleProfileClick}
    >
      {members.map((member) => (
        <div
          key={member.id}
          className="p-4 bg-white shadow-sm rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar src={member.avatar} alt={member.name} />
            <span className="font-bold">{member.name}</span>
          </div>
          <div className="flex items-center gap-2">{children}</div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
