'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = new FormData(e.currentTarget).get('term');
    if (typeof term === 'string' && term.trim()) {
      router.push(`/search?term=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="term"
        size="sm"
        defaultValue={searchParams.get('term') || ''}
        placeholder="Search discussions..."
        classNames={{
          inputWrapper: 'bg-white/90 hover:bg-white border-none',
          input: 'text-gray-800 placeholder:text-gray-400',
        }}
      />
    </form>
  );
}
