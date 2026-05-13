import Link from 'next/link';
import SearchInput from './search-input';
import HeaderAuth from './headerAuth';
import { Suspense } from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/70">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-4 sm:gap-6 h-16">
          <Link href="/" className="group flex items-center gap-2 shrink-0" aria-label="Discuss home">
            <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-ink text-cream transition-transform duration-200 group-hover:-rotate-6 motion-reduce:transition-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.5A9 9 0 1 1 21 12z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-persimmon ring-2 ring-cream" />
            </span>
            <span className="font-display font-extrabold text-xl tracking-tight text-ink">
              discuss
            </span>
          </Link>

          <div className="flex-1 max-w-xl">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>

          <div className="shrink-0">
            <HeaderAuth />
          </div>
        </div>
      </div>
    </header>
  );
}
