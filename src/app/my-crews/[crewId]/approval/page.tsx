import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import CrewMemberList from '@/components/my-crew/CrewMemberList';

const ApprovalPage = () => {
  return (
    <MyCrewLayout titleText="크루원">
      <CrewMemberList step />
    </MyCrewLayout>
  );
};

export default ApprovalPage;
