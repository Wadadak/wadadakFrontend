import AllMemberList from '@/components/crew/MemberList';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import React from 'react';

const MembersPage = () => {
  return (
    <MyCrewLayout titleText="크루원">
      <AllMemberList />
    </MyCrewLayout>
  );
};

export default MembersPage;
