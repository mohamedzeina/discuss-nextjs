import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import SearchInput from './search-input';
import HeaderAuth from './headerAuth';
import { Suspense } from 'react';

export default function Header() {
  return (
    <Navbar className="bg-indigo-600 shadow-md mb-6" classNames={{ wrapper: 'max-w-6xl' }}>
      <NavbarBrand className="flex-1 basis-0">
        <Link href="/" className="font-bold flex items-center gap-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M2 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7l-5 4V6z" />
            <path d="M8 10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5l-4 3v-3H10a2 2 0 0 1-2-2v-6z" opacity="0.5" />
          </svg>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="flex-1 basis-0">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
