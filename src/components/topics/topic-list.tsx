import { db } from '@/db';
import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopis = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  if (renderedTopis.length === 0) {
    return <p className="text-sm text-gray-400">No topics yet</p>;
  }

  return <div className="flex flex-row gap-2 flex-wrap">{renderedTopis}</div>;
}
