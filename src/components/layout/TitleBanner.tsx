import { PropsWithChildren } from 'react';

export const TitleBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full bg-primary py-16 flex flex-col justify-center items-center text-[36px] font-bold text-white gap-4">
      {children}
    </div>
  );
};
