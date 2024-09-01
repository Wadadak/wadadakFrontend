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
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/atoms/userState';
import LoginMenu from '../login/LoginMenu';
import LogoutMenu from '../login/LogoutMenu';

const Header = () => {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState); //hctodo: 임시 로그인 상태

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
              className="w-8 h-8 cursor-pointer"
              onClick={() => router.push('/')}
            />
            {/* 검색창 */}
            <SearchBar
              placeholder="크루 검색하기"
              onSearch={handleSearch}
              size="sm"
            />
          </div>
          {/* 오른쪽 레이아웃 */}
          {isLogin ? <LoginMenu /> : <LogoutMenu />}
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
