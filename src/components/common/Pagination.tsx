import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageRangeDisplayed: number; // 표시할 페이지 범위
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  pageRangeDisplayed,
}: PaginationProps) => {
  // 페이지 구간 계산
  const currentRangeStart =
    Math.floor(currentPage / pageRangeDisplayed) * pageRangeDisplayed;
  const currentRangeEnd = Math.min(
    currentRangeStart + pageRangeDisplayed - 1,
    totalPages - 1,
  );

  const handlePreviousRange = () => {
    if (currentRangeStart > 0) {
      onPageChange(currentRangeStart - 1);
    }
  };

  const handleNextRange = () => {
    if (currentRangeEnd < totalPages - 1) {
      onPageChange(currentRangeEnd + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handleFirstPage = () => {
    onPageChange(0);
  };

  const handleLastPage = () => {
    onPageChange(totalPages - 1);
  };

  if (totalPages <= 1) return null; // 페이지가 1개라면 표시x

  return (
    <div className="flex justify-center mx-auto space-x-2 mt-6">
      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentPage === 0
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handleFirstPage}
        disabled={currentPage === 0}
      >
        《
      </button>
      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentRangeStart === 0
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handlePreviousRange}
        disabled={currentRangeStart === 0}
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
            {page + 1}
          </button>
        );
      })}

      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentRangeEnd === totalPages - 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handleNextRange}
        disabled={currentRangeEnd === totalPages - 1}
      >
        〉
      </button>
      <button
        className={`join-item px-3 py-1 rounded-lg border border-transparent transition duration-200 ${
          currentPage === totalPages - 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-gray-200 hover:text-white'
        }`}
        onClick={handleLastPage}
        disabled={currentPage === totalPages - 1}
      >
        》
      </button>
    </div>
  );
};

export default Pagination;
