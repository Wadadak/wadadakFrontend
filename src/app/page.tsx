// 메인 페이지
import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
<<<<<<< HEAD
import MainPageList from '@/components/crew/MainPageList';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
=======
import CrewCard from '@/components/crew/CrewCard';
import ImageUpload from '@/components/common/ImageUpload';
>>>>>>> 7521c7cf45ac5cb5bb596b69c831ab52acb9e41d

const index = () => {
  return (
    <>
      <TitleBanner>
        <div className="w-full max-w-[1200px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8  h-full flex flex-col gap-8 justify-start">
          <p className="text-secondary text-2xl">@@ 님의 이번 달 누적 기록</p>
          <p className="text-8xl">0.0 km</p>
          <div className="flex gap-4 text-4xl">
            <span>0회</span>
            <span>0'00"</span>
            <span>0:00</span>
          </div>
        </div>
      </TitleBanner>
      <Wrapper>
        <MainPageList crews={mockCrewList} />
      </Wrapper>
    </>
  );
};

export default index;
