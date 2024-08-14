import { PropsWithChildren } from 'react';

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full max-w-[1200px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  );
};

export default Wrapper;
