import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/common/Avatar';

interface AvatarWithDropdownProps {
  src: string;
}

const AvatarWithDropdown: React.FC<AvatarWithDropdownProps> = ({ src }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);
  const router = useRouter();

  // Ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDropdownHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDropdownHovered) {
      setIsHovered(false);
    }
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

  const handleLogoutClick = () => {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsHovered(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar src={src} onAvatarClick={() => router.push('/my')} />
      {isHovered && (
        <div
          ref={dropdownRef}
          className="absolute w-[100px] p-2 mt-2 transform -translate-x-1/2 bg-white border rounded-md shadow-lg left-1/2 top-full"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <ul className="p-0 m-0 list-none">
            <li>
              <button
                onClick={handleMyClick}
                className="w-full px-4 py-2 text-xs text-left hover:bg-gray-100"
              >
                내 프로필
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
