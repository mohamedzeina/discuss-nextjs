import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@nextui-org/react';
import { fetchTopPosts } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      <div className="col-span-3">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Top Posts</h1>
          <p className="text-sm text-gray-500">Most active discussions</p>
        </div>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="bg-white border rounded-lg p-4 h-fit shadow-sm">
        <TopicCreateForm />
        <Divider className="my-3" />
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
