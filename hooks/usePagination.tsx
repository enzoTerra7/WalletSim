type UsePaginationProps = {
  page: number;
  limit: number;
  total: number;
};

function generatePages(page: number, totalPages: number) {
  const current = Math.min(page, totalPages);
  const total = Math.max(1, totalPages);

  if (total <= 3) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current === 1) {
    return [1, 2, 3];
  }

  if (current === total) {
    return [total - 2, total - 1, total];
  }

  return [current - 1, current, current + 1];
}

export function usePagination(props: UsePaginationProps) {
  const totalPages = Math.ceil(props.total / props.limit);

  const pages = generatePages(props.page, totalPages);

  function isCurrentPage(page: number) {
    return page === props.page;
  }

  return {
    isCurrentPage,
    pages,
    totalPages,
  };
}
