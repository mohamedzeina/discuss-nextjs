import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@nextui-org/react';
import { fetchTopPosts } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

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
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Top Posts</h1>
            <p className="text-sm text-gray-500">Most active discussions</p>
          </div>
          <PostList fetchData={fetchTopPosts} />
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
