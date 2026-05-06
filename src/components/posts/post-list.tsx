import Link from 'next/link';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <Link
        key={post.id}
        href={paths.postShow(topicSlug, post.id)}
        className="block border rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            {topicSlug}
          </span>
        </div>
        <h3 className="text-base font-semibold">{post.title}</h3>
        <div className="flex gap-4 mt-1">
          <p className="text-xs text-gray-400">By {post.user.name}</p>
          <p className="text-xs text-gray-400">{post._count.comments} comments</p>
        </div>
      </Link>
    );
  });

  if (renderedPosts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No posts yet</p>
        <p className="text-sm">Be the first to start a discussion</p>
      </div>
    );
  }

  return <div className="space-y-2">{renderedPosts}</div>;
}
