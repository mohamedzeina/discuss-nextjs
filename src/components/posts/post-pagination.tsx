'use client';

interface PostPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function PostPagination({ page, totalPages, onChange }: PostPaginationProps) {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between gap-3"
    >
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={prevDisabled}
        className="group inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-rule bg-surface text-sm font-medium text-ink hover:border-ink-2 hover:bg-cream-2/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-rule disabled:hover:bg-surface transition-all duration-200 motion-reduce:transition-none"
      >
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:-translate-x-0.5 group-disabled:translate-x-0 motion-reduce:transition-none"
        >
          &larr;
        </span>
        Previous
      </button>

      <span className="font-mono text-xs text-ink-2 num-plate">
        page <span className="text-ink font-semibold">{page}</span>{' '}
        <span className="text-ink-3">/</span>{' '}
        <span>{totalPages}</span>
      </span>

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={nextDisabled}
        className="group inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-rule bg-surface text-sm font-medium text-ink hover:border-ink-2 hover:bg-cream-2/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-rule disabled:hover:bg-surface transition-all duration-200 motion-reduce:transition-none"
      >
        Next
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-disabled:translate-x-0 motion-reduce:transition-none"
        >
          &rarr;
        </span>
      </button>
    </nav>
  );
}
