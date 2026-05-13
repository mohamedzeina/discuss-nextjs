import { fetchCommentsByPostId } from '@/db/queries/comments';

interface ThreadMapProps {
  postId: string;
}

export default async function ThreadMap({ postId }: ThreadMapProps) {
  const comments = await fetchCommentsByPostId(postId);
  const topLevel = comments.filter((c) => c.parentId === null && !c.deleted);

  if (topLevel.length === 0) return null;

  const withCounts = topLevel.map((c) => ({
    ...c,
    replies: comments.filter((child) => child.parentId === c.id).length,
  }));

  return (
    <section
      aria-label="Thread map"
      className="rounded-2xl border border-rule bg-surface shadow-soft overflow-hidden"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <h3 className="font-display font-bold text-sm text-ink">Thread map</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
          {topLevel.length} {topLevel.length === 1 ? 'branch' : 'branches'}
        </span>
      </header>
      <ol className="max-h-[22rem] overflow-y-auto">
        {withCounts.map((c, i) => (
          <li key={c.id} className="border-b border-rule last:border-b-0">
            <a
              href={`#c-${c.id}`}
              className="group flex items-start gap-3 px-4 py-2.5 hover:bg-cream-2/50 transition-colors duration-150 motion-reduce:transition-none"
            >
              <span className="font-mono text-[10px] text-ink-3 num-plate pt-0.5 w-6 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink truncate group-hover:text-persimmon transition-colors duration-150 motion-reduce:transition-none">
                  {c.user.name ?? 'anon'}
                </p>
                <p className="text-xs text-ink-2 line-clamp-1 leading-snug mt-0.5">
                  {c.content}
                </p>
              </div>
              {c.replies > 0 && (
                <span className="font-mono text-[10px] text-ink-3 num-plate pt-1 shrink-0">
                  +{c.replies}
                </span>
              )}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
