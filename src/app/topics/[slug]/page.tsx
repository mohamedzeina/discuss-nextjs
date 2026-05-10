import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostByTopicSlug } from '@/db/queries/posts';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/common/breadcrumb';

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
    <div className="px-4 py-6 sm:px-6">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: `#${slug}` }]} />
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white rounded-2xl p-6 sm:p-8 mb-6">
        <h1 className="text-3xl font-bold capitalize mb-1">{slug}</h1>
        <p className="text-indigo-100 text-sm max-w-lg mb-4">{topic.description}</p>
        <div className="bg-white/10 rounded-xl px-4 py-2 inline-flex flex-col items-center">
          <p className="text-2xl font-bold">{topic._count.posts}</p>
          <p className="text-indigo-200 text-xs">{topic._count.posts === 1 ? 'post' : 'posts'}</p>
        </div>
      </div>
      <div className="lg:hidden mb-4">
        <PostCreateForm slug={slug} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <PostList
            fetchData={() => fetchPostByTopicSlug(slug)}
            hideTopic
            emptyMessage={`No posts in ${slug} yet — be the first!`}
          />
        </div>
        <div className="hidden lg:block bg-white border border-gray-200 rounded-xl h-fit shadow-sm sticky top-20 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <div className="p-4">
            <PostCreateForm slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
