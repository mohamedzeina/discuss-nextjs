import { redirect } from 'next/navigation';
import SearchResults from '@/components/posts/search-results';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';

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

  const posts = await fetchPostsBySearchTerm(term);

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <p className="text-sm text-gray-600">
          {posts.length} {posts.length === 1 ? 'result' : 'results'} for <span className="text-indigo-600 font-medium">&ldquo;{term}&rdquo;</span>
        </p>
      </div>
      <SearchResults posts={posts} />
    </div>
  );
}
