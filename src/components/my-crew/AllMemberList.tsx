'use client';

import React, { ReactNode, useState } from 'react';
import MemberList from '../crew/MemberList';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import { useMemberList } from '@/hooks/crew/useMemberList';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

interface AllMemberListProps {
  crewId: number;
  title?: string;
  search?: boolean;
  children: ReactNode;
}

const AllMemberList = ({
  crewId,
  title = '현재 크루원',
  search = true,
  children,
}: AllMemberListProps) => {
  const handleSearch = (value: string) => {
    alert(value); // 검색 기능 구현 필요
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageRangeDisplayed = 5;

  const { data, isLoading, error } = useMemberList(
    {
      page: currentPage,
      size: itemsPerPage,
    },
    crewId,
  );

  const members = data?.members || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorComponent message={error.message || '멤버 조회에 실패했습니다.'} />
    );

  return (
    <>
      <div className="text-center text-3xl font-bold">{title}</div>
      {search && (
        <div className="flex justify-end">
          <SearchBar placeholder="크루원 검색" onSearch={handleSearch} />
        </div>
      )}
      <MemberList members={members}>{children}</MemberList>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </>
  );
};

export default AllMemberList;
