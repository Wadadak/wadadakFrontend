import { PropsWithChildren } from 'react';

interface WrapperProps extends PropsWithChildren {}
const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="w-full max-w-[1200px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  );
};

export default Wrapper;

{
  /* <div className="w-full max-w-[1440px] flex flex-col">{children}</div> */
}
