import Link from 'next/link';
import Image from 'next/image';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';
import { timeAgo, topicTone } from '@/lib/utils';

interface PostCardProps {
  post: PostWithData;
  hideTopic?: boolean;
}

export default function PostCard({ post, hideTopic }: PostCardProps) {
  const tone = topicTone(post.topic.slug);
  const replyCount = post._count.comments;

  return (
    <Link
      href={paths.postShow(post.topic.slug, post.id)}
      className="group relative block rounded-2xl border border-rule bg-surface hover:border-rule-2 hover:shadow-lift transition-all duration-200 motion-reduce:transition-none overflow-hidden"
    >
      {/* Accent rail on the left, reveals on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-persimmon scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 motion-reduce:transition-none"
      />

      <div className="p-5 sm:p-6">
        {!hideTopic && (
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone.bg} ${tone.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
              {post.topic.slug}
            </span>
          </div>
        )}

        <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug group-hover:text-persimmon-deep transition-colors duration-200 motion-reduce:transition-none">
          {post.title}
        </h3>

        <p className="mt-2 text-sm text-ink-2 line-clamp-2 leading-relaxed">
          {post.content}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            {post.user.image ? (
              <Image
                src={post.user.image}
                alt={post.user.name || ''}
                width={20}
                height={20}
                className="rounded-full ring-1 ring-rule"
              />
            ) : (
              <span className="w-5 h-5 rounded-full bg-persimmon-soft text-[10px] font-semibold text-persimmon-deep flex items-center justify-center">
                {post.user.name?.[0]?.toUpperCase() ?? '?'}
              </span>
            )}
            <span className="font-medium text-ink">{post.user.name}</span>
          </div>

          <span className="w-1 h-1 rounded-full bg-ink-3" aria-hidden />

          <span className="inline-flex items-center gap-1 text-ink-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="font-mono num-plate text-ink font-semibold">{replyCount}</span>
            <span>{replyCount === 1 ? 'reply' : 'replies'}</span>
          </span>

          <span className="w-1 h-1 rounded-full bg-ink-3" aria-hidden />

          <span
            className="font-mono num-plate text-ink-2"
            suppressHydrationWarning
          >
            {timeAgo(post.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
