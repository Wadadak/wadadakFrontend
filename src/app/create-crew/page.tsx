'use client';

import React from 'react';
import { useCreateCrew } from '@/hooks/useCreateCrew';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import CreateCrew from '@/components/crew/CreateCrew';

const CreateCrewPage = () => {
  return (
    <>
      <TitleBanner>크루 만들기</TitleBanner>
      <Wrapper>
        <CreateCrew />
      </Wrapper>
    </>
  );
};

export default CreateCrewPage;
