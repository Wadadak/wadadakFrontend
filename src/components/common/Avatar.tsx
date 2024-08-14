import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: string; // 크기를 조절할 수 있도록 props 추가
  className?: string; // 추가적인 Tailwind 클래스명을 받기 위해 props 추가
}

const defaultAvatar =
  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'; // 디폴트 이미지 URL

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'w-12',
  className = '',
}: AvatarProps) => {
  const imageUrl = src || defaultAvatar;

  return (
    <div className={`avatar ${className}`}>
      <div className={`${size} rounded-full`}>
        <img src={defaultAvatar} alt={alt} />
      </div>
    </div>
  );
};

export default Avatar;
