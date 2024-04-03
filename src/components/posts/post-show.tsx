import { db } from '@/db';
import { notFound } from 'next/navigation';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  // Adding some arbitrary loading because we will use suspense(content streaming) to render the initial page
  // Other page components will be shown after data is fetched
  // So we will add a loading skeleton to show when the data is being fetched
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
