'use client';

import MyCrewLayout from '../../../components/my-crew/MyCrewLayout';
import React from 'react';
import Home from '@/components/my-crew/Home';

const CrewDashBoardPage = () => {
  return (
    <MyCrewLayout titleText="마이 크루">
      <Home />
    </MyCrewLayout>
  );
};

export default CrewDashBoardPage;
