import React, { ReactNode, useEffect } from 'react';
import Avatar from '../common/Avatar';
import { useRouter } from 'next/navigation';
import { MemberSummary } from '@/hooks/crew/useMemberList';
import { useEditProfile } from '@/hooks/user/useEditUserProfile';

interface MemberListProps {
  crewId: number;
  members: MemberSummary[];
  children: ReactNode;
}

const MemberList = ({ crewId, members, children }: MemberListProps) => {
  const router = useRouter();

  // TODO url 변경
  const handleProfileClick = (memberId: number) => {
    router.push(`/crew/${crewId}/profile?memberId=${memberId}`);
  };

  useEffect(() => {
    console.log('members', members);
  }, [members]);

  // TODO url 변경
  const handleChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/chat`);
  };

  return (
    <div className="grid gap-4 py-4 cursor-pointer md:grid-cols-2">
      {members.map((member) => (
        <div
          key={member.memberNickName}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          onClick={() => handleProfileClick(member.memberId)}
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
