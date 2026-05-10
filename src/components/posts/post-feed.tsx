'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';
import { timeAgo } from '@/lib/utils';

type Sort = 'top' | 'new';

const PAGE_SIZE = 5;

export default function PostFeed({ posts }: { posts: PostWithData[] }) {
  const [sort, setSort] = useState<Sort>('top');
  const [page, setPage] = useState(1);

  const sorted = [...posts].sort((a, b) => {
    if (sort === 'top') return b._count.comments - a._count.comments;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (s: Sort) => {
    setSort(s);
    setPage(1);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No posts yet</p>
        <p className="text-sm">Be the first to start a discussion</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {sort === 'top' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-orange-500">
              <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-indigo-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
          )}
          <div>
            <h1 className="text-2xl font-bold">{sort === 'new' ? 'Recent Posts' : 'Top Posts'}</h1>
            <p className="text-sm text-gray-500">{sort === 'new' ? 'Latest discussions' : 'Most active discussions'}</p>
          </div>
        </div>
        <div className="flex gap-1 bg-gray-200 rounded-lg p-1">
          {(['top', 'new'] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => handleSort(s)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 capitalize cursor-pointer ${
                sort === s ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {paginated.map((post) => (
          <Link
            key={post.id}
            href={paths.postShow(post.topic.slug, post.id)}
            className="block bg-white border-l-4 border-l-transparent border border-gray-200 rounded-lg p-4 hover:border-l-indigo-500 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
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
              <p className="text-xs text-gray-500">{post.user.name}</p>
              <span className="text-xs text-gray-400">·</span>
              <p className="text-xs text-gray-500">{post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}</p>
              <span className="text-xs text-gray-400">·</span>
              <p className="text-xs text-gray-500" suppressHydrationWarning>{timeAgo(post.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
