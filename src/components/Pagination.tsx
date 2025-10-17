type Props = {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
}: Props) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;

  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className='px-3 py-1 rounded-xl bg-white shadow disabled:opacity-50'
      >
        ←
      </button>
      <span className='text-sm'>
        Strana {page} / {pages}
      </span>
      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className='px-3 py-1 rounded-xl bg-white shadow disabled:opacity-50'
      >
        →
      </button>
    </div>
  );
}
