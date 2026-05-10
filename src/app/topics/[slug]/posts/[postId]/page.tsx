import PostShow from '@/components/posts/post-show';
import PostBreadcrumb from '@/components/posts/post-breadcrumb';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { Suspense } from 'react';
import PostShowLoading from '@/components/posts/post-show-loading';
import CommentListLoading from '@/components/comments/comment-list-loading';

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
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Suspense fallback={<div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />}>
        <PostBreadcrumb postId={postId} slug={slug} />
      </Suspense>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <Suspense fallback={<CommentListLoading />}>
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
}
