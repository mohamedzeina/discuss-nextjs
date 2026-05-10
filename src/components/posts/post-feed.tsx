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
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300 mx-auto mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <p className="text-base font-semibold text-gray-700">No posts yet</p>
        <p className="text-sm text-gray-500 mt-1">Be the first to start a discussion</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold">{sort === 'new' ? 'Recent Posts' : 'Top Posts'}</h1>
            <p className="text-sm text-gray-500">{sort === 'new' ? 'Latest discussions' : 'Most active discussions'}</p>
          </div>
        </div>
        <div className="flex gap-1 bg-gray-300 rounded-lg p-1">
          {(['top', 'new'] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => handleSort(s)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 motion-reduce:transition-none capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
            className="block bg-white border-l-4 border-l-transparent border border-gray-200 rounded-lg p-4 hover:border-l-indigo-500 hover:shadow-md hover:border-gray-200 transition-all duration-200 motion-reduce:transition-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                {post.topic.slug}
              </span>
            </div>
            <h3 className="text-base font-semibold mb-1">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.content}</p>
            <div className="flex items-center gap-2">
              {post.user.image && (
                <Image src={post.user.image} alt={post.user.name || ''} width={20} height={20} className="rounded-full" />
              )}
              <p className="text-xs text-gray-600">{post.user.name}</p>
              <span className="text-xs text-gray-400">·</span>
              <p className="text-xs text-gray-600">{post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}</p>
              <span className="text-xs text-gray-400">·</span>
              <p className="text-xs text-gray-600" suppressHydrationWarning>{timeAgo(post.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
