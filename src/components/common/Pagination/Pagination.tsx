import React, { useCallback, useEffect, useState } from "react";
import "./Pagination.scss";
import Button from "../Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages, isMobile]);

  const pageNumbers = getPageNumbers();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pagination">
      <Button
        size={isMobile ? "sm" : "md"}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <span className="icon">←</span>
        {!isMobile && <span className="text">Previous</span>}
      </Button>

      <div className="page-numbers">
        {currentPage > 2 && (
          <>
            <Button
              variant="ghost"
              className="page-number"
              onClick={() => onPageChange(1)}>
              1
            </Button>
            {currentPage > 3 && <span className="ellipsis">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "ghost"}
            className="page-number"
            onClick={() => onPageChange(page)}>
            {page}
          </Button>
        ))}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <span className="ellipsis">...</span>
            )}
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "md"}
              className="page-number"
              onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        size={isMobile ? "sm" : "md"}
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        {!isMobile && <span className="text">Next</span>}
        <span className="icon">→</span>
      </Button>
    </div>
  );
};

export default Pagination;
