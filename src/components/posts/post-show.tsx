import { db } from '@/db';
import { notFound } from 'next/navigation';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { name: true, image: true } },
      topic: { select: { slug: true } },
    },
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
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="mb-3">
        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
          #{post.topic.slug}
        </span>
      </div>
      <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
      <div className="flex items-center gap-2 mb-5 text-sm text-gray-400">
        {post.user.image && (
          <img src={post.user.image} alt={post.user.name || ''} className="w-6 h-6 rounded-full" />
        )}
        <span className="text-gray-600 font-medium">{post.user.name}</span>
        <span>·</span>
        <span>{formattedDate}</span>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}
