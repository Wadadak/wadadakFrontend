import React, { ReactNode } from 'react';
import MyCrewLayout from '@/components/my-crew/MyCrewLayout';

interface MyCrewInfoLayoutProps {
  children: ReactNode;
}
const MyCrewInfoLayout = ({ children }: MyCrewInfoLayoutProps) => {
  return <MyCrewLayout titleText="크루 정보">{children}</MyCrewLayout>;
};

export default MyCrewInfoLayout;
