import React from 'react';
import MyCrewInfo from '@/components/my-crew/MyCrewInfo';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';

const MyCrewInfoPage = () => {
  return (
    <MyCrewLayout titleText="크루 정보">
      <MyCrewInfo step />
    </MyCrewLayout>
  );
};

export default MyCrewInfoPage;
