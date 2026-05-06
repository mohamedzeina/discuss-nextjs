import { db } from '@/db';
import { notFound } from 'next/navigation';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
    include: { user: { select: { name: true, image: true } } },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
        {post.user.image && (
          <img src={post.user.image} alt={post.user.name || ''} className="w-6 h-6 rounded-full" />
        )}
        <span>{post.user.name}</span>
        <span>·</span>
        <span>{formattedDate}</span>
      </div>
      <p className="p-4 border rounded-lg leading-relaxed">{post.content}</p>
    </div>
  );
}
