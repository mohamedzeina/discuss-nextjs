'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSession, signOut, signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function HeaderAuth() {
  const session = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (session.status === 'loading') {
    return <div className="w-9 h-9 border-2 border-ink/20 bg-paper-2 animate-pulse" />;
  }

  if (session.data?.user) {
    const user = session.data.user;
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="group flex items-center gap-2.5 border-2 border-ink/30 hover:border-ink bg-paper px-2 py-1.5 transition-colors duration-200 motion-reduce:transition-none"
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || ''}
              width={24}
              height={24}
              className="w-6 h-6 grayscale-[20%] group-hover:grayscale-0 transition-[filter] duration-200 motion-reduce:transition-none"
            />
          ) : (
            <div className="w-6 h-6 bg-ink text-paper text-[10px] font-mono uppercase flex items-center justify-center">
              {user.name?.[0] ?? '?'}
            </div>
          )}
          <span className="hidden md:inline text-xs font-mono uppercase tracking-[0.12em] text-ink">
            {user.name}
          </span>
          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 text-ink/50 transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}>
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-paper border-2 border-ink shadow-brut z-50 rise">
            <div className="px-4 py-3 border-b border-ink/15">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-ink/50 mb-1">
                Signed in as
              </div>
              <div className="font-display font-bold text-base text-ink truncate">{user.name}</div>
              <div className="text-xs font-mono text-ink/60 truncate">{user.email}</div>
            </div>
            <button
              onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }); }}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-mono uppercase tracking-[0.14em] text-ink hover:bg-ember hover:text-paper transition-colors duration-150 motion-reduce:transition-none"
            >
              <span>Sign out</span>
              <span aria-hidden>&rarr;</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (pathname === '/auth/signin') return null;

  return (
    <button
      onClick={() => signIn()}
      className="group relative inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper border-2 border-ink font-mono text-xs uppercase tracking-[0.16em] hover:bg-ember hover:border-ember transition-colors duration-200 motion-reduce:transition-none shadow-brut-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      <span>Sign in</span>
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">&rarr;</span>
    </button>
  );
}
