import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import CrewList from '@/components/crew/CrewList';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import Button from '@/components/common/Button';
import Link from 'next/link';

const MyCrewPage = () => {
  return (
    <>
      <TitleBanner>가입한 크루</TitleBanner>
      <Wrapper>
        <div className="text-right mb-4">
          <Link href="/my-crews/wait">
            {/* 가입 대기 중인 크루가 있을 경우에만  */}
            <Button color="accent" size="sm">
              가입 대기 중 크루
            </Button>
          </Link>
        </div>
        <CrewList crews={mockCrewList} myCrew />
      </Wrapper>
    </>
  );
};

export default MyCrewPage;
