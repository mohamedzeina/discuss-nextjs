import { Skeleton } from '@nextui-org/react';

export default function TopicShowLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      <Skeleton className="h-4 w-28 rounded mb-4" />
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-2xl p-6 sm:p-8 mb-6">
        <Skeleton className="h-9 w-40 rounded mb-2 bg-white/20" />
        <Skeleton className="h-4 w-64 rounded mb-4 bg-white/20" />
        <Skeleton className="h-14 w-20 rounded-xl bg-white/20" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border-l-4 border-l-gray-200 border border-gray-200 rounded-lg p-4 space-y-2">
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
        <div className="hidden lg:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <div className="p-4">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
