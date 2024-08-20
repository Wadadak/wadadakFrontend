import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number; // 한 페이지당 아이템
  currentPage: number;
  onPageChange: (page: number) => void;
  pageRangeDisplayed: number; // 표시할 페이지 범위
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  pageRangeDisplayed,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 구간 계산
  const currentRangeStart =
    Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;
  const currentRangeEnd = Math.min(
    currentRangeStart + pageRangeDisplayed - 1,
    totalPages,
  );

  const handlePreviousRange = () => {
    if (currentRangeStart > 1) {
      onPageChange(currentRangeStart - pageRangeDisplayed);
    }
  };

  const handleNextRange = () => {
    if (currentRangeEnd < totalPages) {
      onPageChange(currentRangeEnd + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  if (totalPages === 1) return null; // 페이지가 1개라면 표시x

  return (
    <div className="flex justify-center mx-auto space-x-2 mt-6">
      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handleFirstPage}
        disabled={currentPage === 1}
      >
        《
      </button>
      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentRangeStart === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handlePreviousRange}
        disabled={currentRangeStart === 1}
      >
        〈
      </button>

      {[...Array(currentRangeEnd - currentRangeStart + 1)].map((_, index) => {
        const page = currentRangeStart + index;
        return (
          <button
            key={page}
            className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
              currentPage === page
                ? 'bg-accent text-white'
                : 'text-secondary hover:bg-gray-200 hover:text-white'
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentRangeEnd === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handleNextRange}
        disabled={currentRangeEnd === totalPages}
      >
        〉
      </button>
      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
      >
        》
      </button>
    </div>
  );
};

export default Pagination;
