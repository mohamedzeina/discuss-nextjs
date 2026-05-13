import Link from 'next/link';
import paths from '@/paths';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  return (
    <Link
      href={paths.postCreate(slug)}
      className="group inline-flex items-center justify-center gap-2 w-full h-10 px-4 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-persimmon active:scale-[0.99] transition-all duration-200 motion-reduce:transition-none shadow-soft"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
      </svg>
      Write a post
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">&rarr;</span>
    </Link>
  );
}
