import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wrapper from './Wrapper';

const Header = () => {
  return (
    <div className="sticky top-0 flex items-center justify-center h-20 bg-white">
      <Wrapper>
        <div className="flex justify-between w-full px-8">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="bg-gray-200 rounded-full w-8 h-8"></div>
            <div>이름/닉네임</div>
          </div>
          <div className="flex space-x-4 items-center text-[16px] font-bold">
            <button className="button cursor-pointer" onClick={() => {}}>
              Home
            </button>
            <button className="button cursor-pointer" onClick={() => {}}>
              About
            </button>
            <button className="button cursor-pointer" onClick={() => {}}>
              Crew
            </button>
            <div className="flex items-center border rounded-md py-2 px-3">
              <input type="text" placeholder="Search in site" className="" />
              <div>Se</div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
