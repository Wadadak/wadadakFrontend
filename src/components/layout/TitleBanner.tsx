import { PropsWithChildren } from 'react';

export const TitleBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full bg-primary py-16 flex justify-center items-center text-[36px] font-bold text-white">
      {children}
    </div>
  );
};
