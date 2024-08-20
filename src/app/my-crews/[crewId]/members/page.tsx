import MemberList from '@/components/my-crew/MemberList';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import React from 'react';

const MembersPage = () => {
  return (
    <MyCrewLayout titleText="크루원">
      <MemberList />
    </MyCrewLayout>
  );
};

export default MembersPage;
