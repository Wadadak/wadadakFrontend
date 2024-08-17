// 메인 페이지
import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import CrewCard from '@/components/crew/CrewCard';
import ImageUpload from '@/components/common/ImageUpload';

const index = () => {
  return (
    <>
      <TitleBanner>ㅇㅇ</TitleBanner>
      <Wrapper>
        <CrewCard />
      </Wrapper>
    </>
  );
};

export default index;
