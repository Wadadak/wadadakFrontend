import React, { ReactNode } from 'react';
import Avatar from '../common/Avatar';
import { useRouter } from 'next/navigation';
import { MemberSummary } from '@/hooks/crew/useMemberList';

interface MemberListProps {
  members: MemberSummary[];
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
      className="grid gap-4 md:grid-cols-2 cursor-pointer py-4"
      onClick={handleProfileClick}
    >
      {members.map((member) => (
        <div
          key={member.memberNickName}
          className="p-4 bg-white shadow-sm rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar
              src={member.memberProfileImage}
              alt={member.memberNickName}
            />
            <span className="font-bold">{member.memberNickName}</span>
          </div>
          <div className="flex items-center gap-2">{children}</div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
