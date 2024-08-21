import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
