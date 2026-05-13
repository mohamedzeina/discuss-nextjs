import PostListSkeleton from '@/components/posts/post-list-skeleton';

export default function SearchLoading() {
  return (
    <div className="py-8 sm:py-10">
      <div className="mb-7 space-y-2">
        <div className="h-3 w-32 bg-cream-2 rounded animate-pulse" />
        <div className="h-9 w-2/3 bg-cream-2 rounded animate-pulse" />
        <div className="h-4 w-44 bg-cream-2 rounded animate-pulse" />
      </div>
      <PostListSkeleton />
    </div>
  );
}
