import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className={`px-3 py-1 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'bg-blue-500 text-white'} rounded`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">{currentPage} / {totalPages}</span>
      <button
        className={`px-3 py-1 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'bg-blue-500 text-white'} rounded`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
