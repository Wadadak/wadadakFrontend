'use client';

import React, { ReactNode, useState } from 'react';
import MemberList from '../crew/MemberList';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import { CrewMembers } from '@/types/memberTypes';

interface AllMemberListProps {
  members: CrewMembers;
  children: ReactNode;
}

const AllMemberList = ({ members, children }: AllMemberListProps) => {
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
      <div className="flex justify-end mb-4">
        <SearchBar placeholder="크루원 검색" onSearch={handleSearch} />
      </div>
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
