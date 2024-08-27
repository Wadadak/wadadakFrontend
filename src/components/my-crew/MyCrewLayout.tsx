'use client';

import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import MyCrewNav from '@/components/my-crew/MyCrewNav';
import { useParams } from 'next/navigation';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import { ReactNode } from 'react';
import Wrapper from '@/components/layout/Wrapper';

export interface LayoutProps {
  titleText: ReactNode;
  children: ReactNode;
}

const MyCrewLayout = ({ titleText, children }: LayoutProps) => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === id);
  console.log(crew);

  if (!crew) {
    return <div>크루를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <TitleBanner>{titleText}</TitleBanner>
      <MyCrewNav crewId={id} />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MyCrewLayout;
