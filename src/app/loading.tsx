import { Skeleton } from '@nextui-org/react';

export default function HomeLoading() {
  return (
    <div className="p-6">
      <div className="flex gap-6 mb-6">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-3">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 space-y-2">
              <Skeleton className="h-3 w-16 rounded-full" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border rounded-lg p-4 space-y-3">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-3 w-16 rounded" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
