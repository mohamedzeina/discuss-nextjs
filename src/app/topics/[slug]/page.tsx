import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostByTopicSlug } from '@/db/queries/posts';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  const topic = await db.topic.findUnique({
    where: { slug },
    include: { _count: { select: { posts: true } } },
  });

  if (!topic) notFound();

  return (
    <div className="p-6">
      <Link href="/" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
        ← Back to home
      </Link>
      <div className="bg-indigo-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold capitalize">{slug}</h1>
        <p className="text-indigo-100 text-sm mt-1">{topic.description}</p>
        <p className="text-indigo-200 text-xs mt-2">{topic._count.posts} {topic._count.posts === 1 ? 'post' : 'posts'}</p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <PostList
            fetchData={() => fetchPostByTopicSlug(slug)}
            hideTopic
            emptyMessage={`No posts in ${slug} yet — be the first!`}
          />
        </div>
        <div className="bg-white border rounded-lg p-4 h-fit shadow-sm sticky top-20">
          <PostCreateForm slug={slug} />
        </div>
      </div>
    </div>
  );
}
