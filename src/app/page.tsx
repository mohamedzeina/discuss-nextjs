import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@nextui-org/react';
import { fetchTopPosts, fetchRecentPosts } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';
import PostListSkeleton from '@/components/posts/post-list-skeleton';
import { auth } from '@/auth';
import { db } from '@/db';
import SortToggle from '@/components/posts/sort-toggle';
import { Suspense } from 'react';

interface HomeProps {
  searchParams: { sort?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await auth();
  const sort = searchParams.sort === 'new' ? 'new' : 'top';
  const fetchData = sort === 'new' ? fetchRecentPosts : fetchTopPosts;

  const [postCount, topicCount] = await Promise.all([
    db.post.count(),
    db.topic.count(),
  ]);

  return (
    <div className="p-6">
      {!session?.user && (
        <div className="bg-indigo-600 text-white rounded-xl p-8 mb-6 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Welcome to Discuss</h2>
          <p className="text-indigo-100 text-sm max-w-lg">
            A community platform to ask questions, share ideas, and connect with developers. Sign in with GitHub to join the conversation.
          </p>
        </div>
      )}
      <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
        <span><span className="font-semibold text-gray-800">{postCount}</span> posts</span>
        <span><span className="font-semibold text-gray-800">{topicCount}</span> topics</span>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{sort === 'new' ? 'Recent Posts' : 'Top Posts'}</h1>
              <p className="text-sm text-gray-500">{sort === 'new' ? 'Latest discussions' : 'Most active discussions'}</p>
            </div>
            <SortToggle current={sort} />
          </div>
          <Suspense key={sort} fallback={<PostListSkeleton />}>
            <PostList fetchData={fetchData} />
          </Suspense>
        </div>
        <div className="bg-white border rounded-lg p-4 h-fit shadow-sm sticky top-20">
          <TopicCreateForm />
          <Divider className="my-3" />
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Topics</h3>
          <TopicList />
        </div>
      </div>
    </div>
  );
}
