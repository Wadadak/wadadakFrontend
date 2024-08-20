import React from 'react';
import MemberList from '../crew/MemberList';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';
import { currentPageState } from '@/recoil/atoms/paginationState';

const itemsPerPage = 12;

const AllMemberList = () => {
  const handleSearch = (value: string) => {
    alert(value);
  };

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentCards = crews.slice(startIndex, endIndex);

  return (
    <>
      <SearchBar placeholder="크루원 검색" onSearch={handleSearch} />
      <MemberList />
      <Pagination
        totalItems={mockCrewMembers.length}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default AllMemberList;
