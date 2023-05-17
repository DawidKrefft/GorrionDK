import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  isPreviousData: boolean;
  prevPage: () => void;
  nextPage: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  isPreviousData,
  prevPage,
  nextPage,
}: PaginationProps) => {
  return (
    <nav
      className="flex items-center justify-between py-3"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing <span className="font-medium">{currentPage}</span> to{" "}
          <span className="font-medium">{totalPages}</span> of{" "}
          <span className="font-medium">{totalRecords}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {/* prev button */}
        <button
          disabled={isPreviousData || currentPage === 1}
          onClick={prevPage}
          className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:ring-gray-600 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0"
        >
          Previous
        </button>
        {/* next button */}
        <button
          disabled={isPreviousData || currentPage === totalPages}
          onClick={nextPage}
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:ring-gray-600 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
