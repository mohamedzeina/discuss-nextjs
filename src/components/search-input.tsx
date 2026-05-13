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
      <div
        className={`group relative flex items-center border-2 bg-paper transition-colors duration-200 motion-reduce:transition-none ${
          focused ? 'border-ink' : 'border-ink/30 hover:border-ink/60'
        }`}
      >
        {/* Index tab */}
        <div className="hidden sm:flex items-center px-2.5 py-2 border-r border-ink/20 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
          Index
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 ml-3 transition-colors duration-200 motion-reduce:transition-none ${focused ? 'text-ember' : 'text-ink/60'}`}
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
          placeholder="Search the archive..."
          className="flex-1 bg-transparent px-3 py-2 text-sm font-sans text-ink placeholder:text-ink/40 placeholder:italic focus:outline-none"
        />

        <button
          type="submit"
          aria-label="Search"
          className="hidden sm:flex items-center justify-center px-3 py-2 border-l border-ink/20 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:text-ember hover:bg-ink/5 transition-colors duration-200 motion-reduce:transition-none"
        >
          &crarr; Go
        </button>

        {/* Underline accent on focus */}
        <span
          className={`absolute bottom-0 left-0 h-[3px] bg-ember transition-transform duration-300 motion-reduce:transition-none w-full origin-left ${
            focused ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>
    </form>
  );
}
