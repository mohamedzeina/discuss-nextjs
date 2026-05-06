'use client';

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Avatar src={session.data.user.image || ''} size="sm" />
            <span className="text-white text-sm font-medium hidden sm:block">
              {session.data.user.name}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white/70">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-2 min-w-40">
            <div className="px-3 py-2 border-b mb-2">
              <p className="text-sm font-semibold">{session.data.user.name}</p>
              <p className="text-xs text-gray-400">{session.data.user.email}</p>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              variant="light"
              color="danger"
              className="w-full justify-start"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <Button onClick={() => signIn()} variant="bordered" className="text-white border-white/50 hover:border-white">
              Sign In
            </Button>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={() => signIn()} className="bg-white text-indigo-600 font-semibold">
              Sign Up
            </Button>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
