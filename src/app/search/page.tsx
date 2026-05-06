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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <p className="text-sm text-gray-500">
          Showing results for <span className="text-indigo-600 font-medium">"{term}"</span>
        </p>
      </div>
      <PostList
        fetchData={() => fetchPostsbySearchTerm(term)}
        emptyMessage={`No posts found for "${term}"`}
      />
    </div>
  );
}
