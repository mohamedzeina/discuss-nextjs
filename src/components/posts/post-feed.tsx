'use client';

import { useState } from 'react';
import Link from 'next/link';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';

type Sort = 'top' | 'new';

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function PostFeed({ posts }: { posts: PostWithData[] }) {
  const [sort, setSort] = useState<Sort>('top');

  const sorted = [...posts].sort((a, b) => {
    if (sort === 'top') return b._count.comments - a._count.comments;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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
        <div>
          <h1 className="text-2xl font-bold">{sort === 'new' ? 'Recent Posts' : 'Top Posts'}</h1>
          <p className="text-sm text-gray-500">{sort === 'new' ? 'Latest discussions' : 'Most active discussions'}</p>
        </div>
        <div className="flex gap-1 bg-gray-200 rounded-lg p-1">
          {(['top', 'new'] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all capitalize ${
                sort === s ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {sorted.map((post) => (
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
                <img src={post.user.image} alt={post.user.name || ''} className="w-5 h-5 rounded-full" />
              )}
              <p className="text-xs text-gray-400">{post.user.name}</p>
              <span className="text-xs text-gray-300">·</span>
              <p className="text-xs text-gray-400">{post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}</p>
              <span className="text-xs text-gray-300">·</span>
              <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
