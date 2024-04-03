import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import paths from '@/paths';
import { Suspense } from 'react';
import PostShowLoading from '@/components/posts/post-show-loadidng';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

// We use suspense(content streaming) to render the initial
// While other components are loading and fetching data
// The whole page does not have to wait for other components to loadd
// In order to render for the user

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
