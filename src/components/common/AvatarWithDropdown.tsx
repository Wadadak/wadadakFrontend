import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/common/Avatar';
import { useLoginUser } from '@/hooks/user/useLoginUser';

interface AvatarWithDropdownProps {
  src?: string;
}

const AvatarWithDropdown = ({ src }: AvatarWithDropdownProps) => {
  const { logout } = useLoginUser();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);
  const router = useRouter();

  const avatarRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDropdownHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDropdownHovered(false);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownHovered(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownHovered(false);
    if (!isHovered) {
      setIsHovered(false);
    }
  };

  const handleMyClick = () => {
    router.push('/my');
    setIsHovered(false);
  };

  const handleEditClick = () => {
    router.push('/my/edit');
    setIsHovered(false);
  };

  const handleChangePasswordClick = () => {
    router.push('/my/password');
    setIsHovered(false);
  };

  const handleLogoutClick = () => {
    alert('로그아웃 되었습니다.');
    logout();
    router.push('/');
    setIsHovered(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        dropdownRef.current &&
        !avatarRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={avatarRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar src={src} onAvatarClick={() => router.push('/my')} />
      {(isHovered || isDropdownHovered) && (
        <div
          ref={dropdownRef}
          className="absolute w-[120px] p-2 transform -translate-x-1/2 bg-white border rounded-md shadow-lg left-1/2 top-full"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <ul className="p-0 m-0 list-none">
            <li>
              <button
                onClick={handleMyClick}
                className="w-full px-4 py-2 text-xs text-left hover:bg-gray-100"
              >
                내 러닝
              </button>
            </li>
            <li>
              <button
                onClick={handleEditClick}
                className="w-full px-4 py-2 text-xs text-left hover:bg-gray-100"
              >
                내 프로필 수정
              </button>
            </li>
            <li>
              <button
                onClick={handleChangePasswordClick}
                className="w-full px-4 py-2 text-xs text-left hover:bg-gray-100"
              >
                비밀번호 변경
              </button>
            </li>
            <li>
              <button
                onClick={handleLogoutClick}
                className="w-full px-4 py-2 text-xs text-left hover:bg-gray-100"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarWithDropdown;
