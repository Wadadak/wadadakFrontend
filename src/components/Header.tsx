import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wrapper from './Wrapper';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
            <button className="" onClick={() => {}}>
              Home
            </button>
            <button className="" onClick={() => {}}>
              About
            </button>
            <button className="" onClick={() => {}}>
              Crew
            </button>
            <div className="relative flex items-center border rounded-md">
              <input
                type="text"
                placeholder="Search in site"
                className="py-2 pl-3 pr-8 rounded-md"
              />
              <div
                className="absolute right-3"
                onClick={() => alert('검색하기')}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
