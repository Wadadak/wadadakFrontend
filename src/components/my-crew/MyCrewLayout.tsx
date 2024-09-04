'use client';

import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import MyCrewNav from '@/components/my-crew/MyCrewNav';
import { useParams } from 'next/navigation';
import { useJoinedCrewList } from '@/hooks/crew/useCrewList';
import { ReactNode } from 'react';
import Wrapper from '@/components/layout/Wrapper';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

export interface LayoutProps {
  titleText: string;
  children: ReactNode;
}

const MyCrewLayout = ({ titleText, children }: LayoutProps) => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);

  const { data: crew, isLoading, isError, error } = useJoinedCrewList();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorComponent
        message={error.message || '크루 데이터 불러오는 데 실패했습니다.'}
      />
    );
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
