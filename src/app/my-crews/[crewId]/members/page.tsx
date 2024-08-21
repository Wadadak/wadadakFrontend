import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import AllMemberList from '@/components/my-crew/AllMemberList';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';
import Button from '@/components/common/Button';

const MembersPage = () => {
  return (
    <MyCrewLayout titleText="크루원">
      <AllMemberList members={mockCrewMembers}>
        <Button size="sm" color="secondary">
          채팅
        </Button>
      </AllMemberList>
    </MyCrewLayout>
  );
};

export default MembersPage;
