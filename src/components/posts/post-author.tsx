import Image from 'next/image';
import { fetchPostById } from '@/db/queries/posts';
import { db } from '@/db';

interface PostAuthorProps {
  postId: string;
}

export default async function PostAuthor({ postId }: PostAuthorProps) {
  const post = await fetchPostById(postId);
  if (!post) return null;

  const [userPostCount, userReplyCount] = await Promise.all([
    db.post.count({ where: { userId: post.userId } }),
    db.comment.count({ where: { userId: post.userId, deleted: false } }),
  ]);

  return (
    <section
      aria-label="About the author"
      className="rounded-2xl border border-rule bg-surface shadow-soft overflow-hidden"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <h3 className="font-display font-bold text-sm text-ink">Author</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
          said it first
        </span>
      </header>

      <div className="p-4">
        <div className="flex items-center gap-3">
          {post.user.image ? (
            <Image
              src={post.user.image}
              alt={post.user.name || ''}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full ring-1 ring-rule shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-persimmon-soft text-persimmon-deep text-base font-semibold flex items-center justify-center shrink-0">
              {post.user.name?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-display font-bold text-ink truncate">
              {post.user.name ?? 'anon'}
            </p>
            <p className="text-[11px] font-mono text-ink-2 uppercase tracking-[0.1em]">
              writes on hearsay
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Stat label="posts" value={userPostCount} />
          <Stat label="replies" value={userReplyCount} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-cream-2/60 px-3 py-2.5">
      <p className="font-display font-bold text-xl text-ink num-plate leading-none">
        {value.toLocaleString()}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2 mt-1.5">
        {label}
      </p>
    </div>
  );
}
