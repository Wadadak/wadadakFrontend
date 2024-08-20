import React from 'react';
import Button from '../common/Button';
import { crewMembers } from '@/mocks/mockData/crewMembers';
import Avatar from '../common/Avatar';

const MemberList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {crewMembers.map((member) => (
        <div
          key={member.id}
          className="p-4 bg-white shadow-sm rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar src={member.avatar} alt={member.name} />
            <span className="font-bold">{member.name}</span>
          </div>
          <Button size="sm" color="secondary">
            1:1 채팅
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
