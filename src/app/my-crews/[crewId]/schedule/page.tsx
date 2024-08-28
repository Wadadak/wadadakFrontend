import React from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';
import CrewRunningSchedule from '@/components/runnig-schedule/CrewRunningSchedule';

const MembersPage = () => {
  return (
    <MyCrewLayout titleText="러닝 일정">
      <CrewRunningSchedule />
    </MyCrewLayout>
  );
};

export default MembersPage;
