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

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-10 space-y-6">
      <Suspense
        fallback={
          <div className="h-4 w-48 bg-cream-2 rounded animate-pulse" />
        }
      >
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
