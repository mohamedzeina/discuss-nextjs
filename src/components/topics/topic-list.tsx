import { db } from '@/db';
import Link from 'next/link';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  if (topics.length === 0) {
    return <p className="text-sm text-gray-400">No topics yet</p>;
  }

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={paths.topicShow(topic.slug)}
          className="text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-900 px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer"
        >
          {topic.slug}
        </Link>
      ))}
    </div>
  );
}
