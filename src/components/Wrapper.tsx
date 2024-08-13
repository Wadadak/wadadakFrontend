import { PropsWithChildren } from 'react';

interface WrapperProps extends PropsWithChildren {}
const Wrapper = ({ children }: WrapperProps) => {
  return <div className="w-full max-w-[1440px] flex flex-col">{children}</div>;
};

export default Wrapper;
