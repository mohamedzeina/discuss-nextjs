'use client';

import { useState } from 'react';
import type { PostWithData } from '@/db/queries/posts';
import PostCard from './post-card';
import PostEmpty from './post-empty';
import PostPagination from './post-pagination';

const PAGE_SIZE = 5;

interface SearchResultsProps {
  posts: PostWithData[];
}

export default function SearchResults({ posts }: SearchResultsProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (posts.length === 0) {
    return <PostEmpty variant="search" />;
  }

  return (
    <div>
      <ul className="space-y-3">
        {paginated.map((post) => (
          <li key={post.id} className="rise">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <PostPagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
