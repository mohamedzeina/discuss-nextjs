import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl font-bold text-indigo-600 mb-2">404</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
