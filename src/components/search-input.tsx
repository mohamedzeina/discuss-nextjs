'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(searchParams.get('term') || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search?term=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label
        className={`group flex items-center gap-2.5 h-10 px-3.5 rounded-full bg-surface transition-all duration-200 motion-reduce:transition-none ${
          focused
            ? 'ring-2 ring-persimmon/40 border border-persimmon/60 shadow-soft'
            : 'border border-rule hover:border-rule-2 shadow-soft'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 transition-colors duration-200 motion-reduce:transition-none ${focused ? 'text-persimmon' : 'text-ink-2'}`}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <input
          name="term"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search posts, topics, people..."
          className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 focus:outline-none min-w-0"
        />

        {value && (
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-ink-3 px-1.5 py-0.5 rounded border border-rule bg-cream-2/60">
            <span>&crarr;</span>
            <span>enter</span>
          </kbd>
        )}
      </label>
    </form>
  );
}
