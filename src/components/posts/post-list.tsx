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
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No posts yet</p>
        <p className="text-sm">{emptyMessage || 'Be the first to start a discussion'}</p>
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
            className="block bg-white border-l-4 border-l-transparent border border-gray-200 rounded-lg p-4 hover:border-l-indigo-500 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
          >
            {!hideTopic && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  {post.topic.slug}
                </span>
              </div>
            )}
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
              <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
