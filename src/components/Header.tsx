import React from 'react';

const Header = () => {
  return (
    <div className="sticky top-0 flex items-center justify-center h-20 bg-white">
      <div className="w-full max-w-[1440px]">
        <div className="flex justify-between w-full px-8">
          <div>로고</div>
          <div>로그인/회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
