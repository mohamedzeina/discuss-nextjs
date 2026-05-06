import Link from 'next/link';
import paths from '@/paths';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  return (
    <Link
      href={paths.postCreate(slug)}
      className="block w-full text-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Create a Post
    </Link>
  );
}
