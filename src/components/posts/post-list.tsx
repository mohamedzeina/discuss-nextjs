import Link from 'next/link';
import Image from 'next/image';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';
import { timeAgo } from '@/lib/utils';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
  hideTopic?: boolean;
  emptyMessage?: string;
}

export default async function PostList({ fetchData, hideTopic, emptyMessage }: PostListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300 mx-auto mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <p className="text-base font-semibold text-gray-700">No posts yet</p>
        <p className="text-sm text-gray-500 mt-1">{emptyMessage || 'Be the first to start a discussion'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {posts.map((post) => {
        return (
          <Link
            key={post.id}
            href={paths.postShow(post.topic.slug, post.id)}
            className="block bg-white border-l-4 border-l-transparent border border-gray-200 rounded-lg p-4 hover:border-l-indigo-500 hover:shadow-md hover:border-gray-200 transition-all duration-200 motion-reduce:transition-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {!hideTopic && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  {post.topic.slug}
                </span>
              </div>
            )}
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
              <p className="text-xs text-gray-600">{timeAgo(post.createdAt)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
