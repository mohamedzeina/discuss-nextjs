'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';
import { timeAgo } from '@/lib/utils';

const PAGE_SIZE = 5;

interface SearchResultsProps {
  posts: PostWithData[];
}

export default function SearchResults({ posts }: SearchResultsProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No posts found</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {paginated.map((post) => (
          <Link
            key={post.id}
            href={paths.postShow(post.topic.slug, post.id)}
            className="block bg-white border rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                {post.topic.slug}
              </span>
            </div>
            <h3 className="text-base font-semibold mb-1">{post.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.content}</p>
            <div className="flex items-center gap-2">
              {post.user.image && (
                <Image src={post.user.image} alt={post.user.name || ''} width={20} height={20} className="rounded-full" />
              )}
              <p className="text-xs text-gray-400">{post.user.name}</p>
              <span className="text-xs text-gray-300">·</span>
              <p className="text-xs text-gray-400">{post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}</p>
              <span className="text-xs text-gray-300">·</span>
              <p className="text-xs text-gray-400" suppressHydrationWarning>{timeAgo(post.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
