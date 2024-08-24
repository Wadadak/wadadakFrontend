import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import Approval from '@/components/my-crew/Approval';

const ApprovalPage = () => {
  return (
    <MyCrewLayout titleText="크루원">
      <Approval />
    </MyCrewLayout>
  );
};

export default ApprovalPage;
