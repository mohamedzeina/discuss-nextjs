import { Skeleton } from '@nextui-org/react';

function CommentSkeleton({ indent = false }: { indent?: boolean }) {
  return (
    <div className={indent ? 'ml-8' : ''}>
      <div className="flex items-start gap-3 py-3">
        <Skeleton className="h-7 w-7 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function CommentListLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-24 rounded" />
      <CommentSkeleton />
      <CommentSkeleton indent />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
}
