import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PropsWithChildren } from 'react';

export interface LayoutProps extends PropsWithChildren {
  commonTitle?: string; // 상단 제목
}
const Layout = ({ commonTitle, children }: LayoutProps) => {
  return (
    <>
      <Header />
      {/* 상단 제목 레이아웃 */}
      {commonTitle && (
        <div className="h-[168px] bg-primary flex justify-center items-center text-[48px] font-bold text-white">
          {commonTitle}
        </div>
      )}
      <div className="">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
