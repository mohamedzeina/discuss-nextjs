import type { PostWithData } from '@/db/queries/posts';
import PostCard from './post-card';
import PostEmpty from './post-empty';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
  hideTopic?: boolean;
  emptyMessage?: string;
}

export default async function PostList({
  fetchData,
  hideTopic,
  emptyMessage,
}: PostListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return <PostEmpty message={emptyMessage} />;
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} hideTopic={hideTopic} />
        </li>
      ))}
    </ul>
  );
}
