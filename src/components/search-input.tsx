'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();
  return (
    <form action={actions.search}>
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
