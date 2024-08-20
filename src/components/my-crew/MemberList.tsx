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
          className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar src="src={member.avatar}" />
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img alt={`${member.name}'s Avatar`} />
              </div>
            </div>
            <span className="font-bold">{member.name}</span>
          </div>
          <button className="btn btn-sm">details</button>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
