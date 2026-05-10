import { fetchPostById } from '@/db/queries/posts';
import Breadcrumb from '@/components/common/breadcrumb';
import paths from '@/paths';
import { notFound } from 'next/navigation';

interface PostBreadcrumbProps {
  postId: string;
  slug: string;
}

export default async function PostBreadcrumb({ postId, slug }: PostBreadcrumbProps) {
  const post = await fetchPostById(postId);
  if (!post) notFound();

  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: `#${slug}`, href: paths.topicShow(slug) },
        { label: post.title },
      ]}
    />
  );
}
