import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import Button from '@/components/common/Button';
import JoinedCrewList from '@/components/crew/JoinedCrewList';

const MyCrewPage = () => {
  return (
    <>
      <TitleBanner>가입한 크루</TitleBanner>
      <Wrapper>
        {/* TODO 가입 대기 중인 크루가 있을 경우에만  */}
        {/* <div className="text-right mb-4">
          <Link href="/my-crews/wait">
            <Button color="accent" size="sm">
              가입 대기 중 크루
            </Button>
          </Link>
        </div> */}
        <JoinedCrewList />
      </Wrapper>
    </>
  );
};

export default MyCrewPage;
