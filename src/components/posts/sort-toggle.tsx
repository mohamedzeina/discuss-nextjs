'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';

interface SortToggleProps {
  current: 'top' | 'new';
}

export default function SortToggle({ current }: SortToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useState(current);

  const handleSort = (sort: 'top' | 'new') => {
    setOptimistic(sort);
    startTransition(() => {
      router.push(`/?sort=${sort}`);
    });
  };

  return (
    <div className={`flex gap-1 bg-gray-200 rounded-lg p-1 transition-opacity ${isPending ? 'opacity-60' : ''}`}>
      {(['top', 'new'] as const).map((sort) => (
        <button
          key={sort}
          onClick={() => handleSort(sort)}
          disabled={isPending}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all capitalize ${
            optimistic === sort ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {sort}
        </button>
      ))}
    </div>
  );
}
