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
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-xl font-bold text-indigo-600">{postCount}</span>
            <span className="text-sm text-gray-500">posts</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-xl font-bold text-indigo-600">{topicCount}</span>
            <span className="text-sm text-gray-500">topics</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <PostFeed posts={posts} />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl h-fit shadow-sm sticky top-20 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <div className="p-4">
            <TopicCreateForm />
            <Divider className="my-4" />
            <div className="flex items-center gap-1.5 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-500">
                <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v11.75A2.75 2.75 0 0 0 16.75 18h-12A2.75 2.75 0 0 1 2 15.25V3.5zM6 7a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H6zm0 3a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H6z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-700">Topics</h3>
            </div>
            <TopicList />
          </div>
        </div>
      </div>
    </div>
  );
}
