import React from 'react';
import AllMemberList from './AllMemberList';
import Button from '../common/Button';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';

const CrewMemberList = () => {
  const step = mockCrewMembers.some(
    (member) => member.role === 'leader' || member.role === 'staff',
  );

  return (
    <AllMemberList members={mockCrewMembers}>
      {step && (
        <div className="w-full bg-primary py-16 flex justify-center items-center text-[36px] font-bold text-white gap-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">
              승인을 기다리고 있는 가입 신청
            </h2>
            <p>현재 00건의 가입 요청이 승인을 기다리고 있습니다.</p>
            <Button>자세히 보기</Button>
          </div>
        </div>
      )}
    </AllMemberList>
  );
};

export default CrewMemberList;
