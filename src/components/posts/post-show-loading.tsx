import { Skeleton } from '@nextui-org/react';

export default function PostShowLoading() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="mb-3">
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-2/3 rounded mb-3" />
      <div className="flex items-center gap-2 mb-5">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
    </div>
  );
}
