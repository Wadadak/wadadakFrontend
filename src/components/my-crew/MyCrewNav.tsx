import React from 'react';
import Link from 'next/link';

interface MyCrewNavProps {
  crewId: number;
}

const MyCrewNav = ({ crewId }: MyCrewNavProps) => {
  return (
    <ul className="menu  menu-horizontal bg-base-200 w-full flex justify-center items-center">
      <li>
        <Link href={`/my-crews/${crewId}`}>홈</Link>
      </li>
      <li>
        <a>러닝 일정</a>
      </li>
      <li>
        <a>채팅방</a>
      </li>
      <li>
        <a>게시판</a>
      </li>
      <li>
        <a>크루 정보</a>
      </li>
      <li>
        <Link href={`/my-crews/${crewId}/members`}>크루원</Link>
      </li>
    </ul>
  );
};

export default MyCrewNav;
