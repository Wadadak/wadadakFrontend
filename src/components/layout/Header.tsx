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
  // const isLogin = useRecoilValue(loginState); //hctodo: 임시 로그인 상태
  const [isLogin, setLogin] = useRecoilState(loginState); //hctodo: 임시 로그인 상태

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
<<<<<<< HEAD
          <div className="flex items-center space-x-6">
            <HeaderMenu
              name={'마이 크루'}
              icon={faBell}
              onMenuClick={() => router.push('/joined-crews')}
            />
            {/* TODO 추후에 메시지, 알림 추가할 경우 */}
            {/* <HeaderMenu
              name={'메시지'}
              icon={faBell}
              onMenuClick={() => router.push('/message')}
            />
            <HeaderMenu
              name={'알림'}
              icon={faBell}
              onMenuClick={() => router.push('/alarm')}
            /> */}
            <Avatar />
          </div>
=======
          {isLogin ? <LoginMenu /> : <LogoutMenu />}
>>>>>>> 5b0731ef7c955acaa61b864f3ac66369f7c2bb9f
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;

