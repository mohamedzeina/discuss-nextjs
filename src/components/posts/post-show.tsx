import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { deletePost } from '@/actions';
import DeleteButton from '@/components/common/delete-button';
import { fetchPostById } from '@/db/queries/posts';
import Image from 'next/image';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const [post, session] = await Promise.all([
    fetchPostById(postId),
    auth(),
  ]);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const isOwner = session?.user?.id === post.userId;

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
          #{post.topic.slug}
        </span>
        {isOwner && (
          <DeleteButton
            action={deletePost.bind(null, post.id)}
            confirmMessage="Delete this post? All comments will also be removed."
          />
        )}
      </div>
      <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
      <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
        {post.user.image && (
          <Image src={post.user.image} alt={post.user.name || ''} width={24} height={24} className="rounded-full" />
        )}
        <span className="text-gray-600 font-medium">{post.user.name}</span>
        <span className="text-gray-400">·</span>
        <span>{formattedDate}</span>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}
