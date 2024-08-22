'use client';

import React, { ReactNode, useState } from 'react';
import MemberList from '../crew/MemberList';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import { CrewMembers } from '@/types/memberTypes';

interface AllMemberListProps {
  members: CrewMembers;
  title?: string;
  search?: boolean;
  children: ReactNode;
}

const AllMemberList = ({
  members,
  title = '현재 크루원',
  search = true,
  children,
}: AllMemberListProps) => {
  const handleSearch = (value: string) => {
    alert(value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageRangeDisplayed = 5;

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  return (
    <>
      <div className="text-center text-3xl font-bold">{title}</div>
      {search && (
        <div className="flex justify-end">
          <SearchBar placeholder="크루원 검색" onSearch={handleSearch} />
        </div>
      )}
      <MemberList members={currentMembers}>{children}</MemberList>
      <Pagination
        totalItems={members.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </>
  );
};

export default AllMemberList;
