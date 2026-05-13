import Link from 'next/link';
import SearchInput from './search-input';
import HeaderAuth from './headerAuth';
import { Suspense } from 'react';

function formatMasthead() {
  const d = new Date();
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

export default function Header() {
  return (
    <header className="border-b-2 border-ink bg-paper sticky top-0 z-50 backdrop-blur-[2px] bg-paper/95">
      {/* Top metadata strip — like a newspaper folio line */}
      <div className="border-b border-ink/20">
        <div className="container mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] font-mono text-ink/70">
          <span className="hidden sm:inline" suppressHydrationWarning>{formatMasthead()}</span>
          <span className="sm:hidden">DISCUSS</span>
          <span className="flex items-center gap-3">
            <span className="hidden md:inline">Vol. 01 &middot; No. 14</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
              Live edition
            </span>
          </span>
        </div>
      </div>

      {/* Main masthead row */}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-6 py-4">
          <Link href="/" className="group flex items-baseline gap-2 shrink-0">
            <span className="font-display font-black text-3xl sm:text-4xl text-ink tracking-editorial leading-none">
              Discuss
              <span className="text-ember">.</span>
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] font-mono text-ink/50 -translate-y-0.5">
              a field journal
            </span>
          </Link>

          <div className="flex-1 max-w-md mx-auto">
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
