import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';

// ----------------------------------------------------------------------

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  pageCount?: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

// ----------------------------------------------------------------------

export default function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, pageCount: pageCountProp, onPageChange } = props;

  const totalPages =
    pageCountProp !== undefined ? pageCountProp : Math.max(1, Math.ceil(count / rowsPerPage));
  const currentPageDisplay = page + 1;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, totalPages - 1));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      onPageChange(null, val - 1);
    }
  };

  return (
    <div className="ml-5 flex shrink-0 items-center justify-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <ChevronsLeft className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="flex items-center gap-1 px-2">
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={currentPageDisplay}
          onChange={handlePageInputChange}
          className="h-7 w-12 text-center text-sm"
        />
        <span className="text-sm text-muted-foreground">/ {totalPages}</span>
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleNextButtonClick}
        disabled={page >= totalPages - 1}
        aria-label="next page"
      >
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleLastPageButtonClick}
        disabled={page >= totalPages - 1}
        aria-label="last page"
      >
        <ChevronsRight className="size-4" />
      </Button>
    </div>
  );
}
