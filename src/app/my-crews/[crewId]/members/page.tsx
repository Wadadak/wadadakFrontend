import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import AllMemberList from '@/components/my-crew/AllMemberList';

const MembersPage = () => {
  return (
    <MyCrewLayout titleText="크루원">
      <AllMemberList />
    </MyCrewLayout>
  );
};

export default MembersPage;
