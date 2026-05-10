import PostShowLoading from '@/components/posts/post-show-loading';
import CommentListLoading from '@/components/comments/comment-list-loading';
import { Skeleton } from '@nextui-org/react';

export default function PostShowPageLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Skeleton className="h-4 w-48 rounded" />
      <PostShowLoading />
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
      <CommentListLoading />
    </div>
  );
}
