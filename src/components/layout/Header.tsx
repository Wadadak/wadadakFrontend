import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wrapper from './Wrapper';
import {
  faBell,
  faPersonRunning,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../common/Avatar';
import { useRouter } from 'next/navigation';
import SearchBar from '../common/SearchBar';

const Header = () => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    alert(value);
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-20 bg-white shadow-sm">
      <Wrapper>
        <div className="flex justify-between w-full px-8">
          {/* 왼쪽 레이아웃 */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faPersonRunning}
              className="w-8 h-8"
              onClick={() => router.push('/')}
            />
            {/* 검색창 */}
            <SearchBar
              placeholder="크루 검색하기"
              onSearch={handleSearch}
              size="xs"
            />
          </div>
          {/* 오른쪽 레이아웃 */}
          <div className="flex items-center space-x-6">
            <HeaderMenu
              name={'마이 크루'}
              icon={faBell}
              onMenuClick={() => router.push('/my-crews')}
            />
            <HeaderMenu
              name={'메시지'}
              icon={faBell}
              onMenuClick={() => router.push('/message')}
            />
            <HeaderMenu
              name={'알림'}
              icon={faBell}
              onMenuClick={() => router.push('/alarm')}
            />
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
