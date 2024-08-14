import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wrapper from './Wrapper';
import {
  faBell,
  faMagnifyingGlass,
  faPersonRunning,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-10 flex items-center justify-center h-20 bg-white shadow-sm">
      <Wrapper>
        <div className="flex justify-between w-full px-8">
          {/* 왼쪽 레이아웃 */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPersonRunning} className="w-8 h-8" />
            {/* 검색창 */}
            <div className="relative flex items-center border rounded-md">
              <input
                type="text"
                placeholder="크루 검색하기"
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
          {/* 오른쪽 레이아웃 */}
          <div className="flex space-x-6">
            <HeaderMenu
              name={'마이 크루'}
              icon={faBell}
              onMenuClick={() => {}}
            />
            <HeaderMenu name={'메시지'} icon={faBell} onMenuClick={() => {}} />
            <HeaderMenu name={'알림'} icon={faBell} onMenuClick={() => {}} />
            <div className="bg-gray-200 rounded-full w-9 h-9"></div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;

interface HeaderMenuProps {
  name: string;
  icon: IconDefinition;
  onMenuClick: () => void;
}

const HeaderMenu = ({ name, icon, onMenuClick }: HeaderMenuProps) => {
  return (
    <button
      className="flex flex-col items-center space-y-2"
      onClick={onMenuClick}
    >
      <FontAwesomeIcon icon={icon} className="w-5 h-5" />
      <div className="text-[10px]">{name}</div>
    </button>
  );
};
