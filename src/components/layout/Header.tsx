import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wrapper from './Wrapper';
import {
  faBell,
  faPersonRunning,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../common/Avatar';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-10 flex items-center justify-center h-20 bg-white shadow-sm">
      <Wrapper>
        <div className="flex justify-between w-full px-8">
          {/* 왼쪽 레이아웃 */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPersonRunning} className="w-8 h-8" />
            {/* 검색창 */}
            <label className="input input-bordered input-sm flex items-center gap-2">
              <input type="text" className="grow" placeholder="크루 검색하기" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
                onClick={() => alert('검색하기')}
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
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
            <Avatar />
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
