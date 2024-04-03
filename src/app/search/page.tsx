import { redirect } from 'next/navigation';
import PostList from '@/components/posts/post-list';
import { fetchPostsbySearchTerm } from '@/db/queries/posts';

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default async function Searchpage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    redirect('/');
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostsbySearchTerm(term)} />
    </div>
  );
}
