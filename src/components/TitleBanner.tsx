import { PropsWithChildren } from 'react';

export const TitleBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full bg-primary flex justify-center items-center text-[48px] font-bold text-white">
      {children}
    </div>
  );
};
