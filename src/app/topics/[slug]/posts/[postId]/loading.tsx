import PostShowLoading from '@/components/posts/post-show-loading';

export default function PostShowPageLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="h-5 w-24" />
      <PostShowLoading />
    </div>
  );
}
