'use client';

import React, { useState } from 'react';
import MemberList from '../crew/MemberList';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';

const AllMemberList = () => {
  const handleSearch = (value: string) => {
    alert(value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageRangeDisplayed = 5;

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentMembers = mockCrewMembers.slice(startIndex, endIndex);

  return (
    <>
      <SearchBar placeholder="크루원 검색" onSearch={handleSearch} />
      <MemberList members={currentMembers} />
      <Pagination
        totalItems={mockCrewMembers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </>
  );
};

export default AllMemberList;
