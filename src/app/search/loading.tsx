import PostListSkeleton from '@/components/posts/post-list-skeleton';

export default function SearchLoading() {
  return (
    <div className="p-6">
      <div className="mb-6 space-y-1">
        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
      </div>
      <PostListSkeleton />
    </div>
  );
}
