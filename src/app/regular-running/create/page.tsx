'use client';

import React from 'react';
import RunningInfoForm from '@/components/crew-info/RunningInfoForm';
import Wrapper from '@/components/layout/Wrapper';

const CreateRegularRunningInfoPage = () => {
  // FIXME
  const handleSave = () => {
    console.log('Created data');
  };
  return (
    <Wrapper>
      <RunningInfoForm onSave={handleSave} />
    </Wrapper>
  );
};
export default CreateRegularRunningInfoPage;
