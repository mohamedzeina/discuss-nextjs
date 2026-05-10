import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@nextui-org/react';
import { fetchRecentPosts } from '@/db/queries/posts';
import PostFeed from '@/components/posts/post-feed';
import { auth } from '@/auth';
import { db } from '@/db';

export default async function Home() {
  const session = await auth();

  const [posts, postCount, topicCount] = await Promise.all([
    fetchRecentPosts(),
    db.post.count(),
    db.topic.count(),
  ]);

  return (
    <div className="p-6">
      {!session?.user ? (
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white rounded-2xl p-8 mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome to Discuss</h2>
          <p className="text-indigo-100 text-sm max-w-lg mb-6">
            A community platform to ask questions, share ideas, and connect with developers. Sign in with GitHub to join the conversation.
          </p>
          <div className="flex items-center gap-6">
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold">{postCount}</p>
              <p className="text-indigo-200 text-xs">posts</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold">{topicCount}</p>
              <p className="text-indigo-200 text-xs">topics</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
          <span><span className="font-semibold text-gray-800">{postCount}</span> posts</span>
          <span><span className="font-semibold text-gray-800">{topicCount}</span> topics</span>
        </div>
      )}
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <PostFeed posts={posts} />
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
