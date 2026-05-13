import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';
import Header from '@/components/header';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Discuss — A field journal for ideas',
  description: 'A community discussion platform to share ideas and start conversations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-sans min-h-screen text-ink antialiased">
        <Providers>
          <Header />
          <main className="container mx-auto px-4 max-w-6xl">
            {children}
          </main>
          <footer className="border-t-2 border-ink mt-24">
            <div className="container mx-auto max-w-6xl px-4 py-6 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-mono text-ink/60">
              <span>Discuss &mdash; Vol. 01</span>
              <span className="hidden sm:inline">Set in Fraunces &amp; IBM Plex</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
