import React from 'react';

interface OrdersPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const OrdersPagination: React.FC<OrdersPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    const handlePrevious = () => {
        onPageChange(Math.max(0, currentPage - 1));
    };

    const handleNext = () => {
        onPageChange(Math.min(totalPages - 1, currentPage + 1));
    };

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 0; i < Math.min(5, totalPages); i++) {
            let pageNum;
            if (totalPages <= 5) {
                pageNum = i;
            } else if (currentPage < 3) {
                pageNum = i;
            } else if (currentPage > totalPages - 4) {
                pageNum = totalPages - 5 + i;
            } else {
                pageNum = currentPage - 2 + i;
            }
            pages.push(pageNum);
        }
        return pages;
    };

    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Previous
            </button>

            <div className="flex items-center gap-2">
                {getPageNumbers().map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-colors ${currentPage === pageNum
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                    >
                        {pageNum + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === totalPages - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default OrdersPagination;
