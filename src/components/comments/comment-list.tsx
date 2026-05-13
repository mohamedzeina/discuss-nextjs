import CommentShow from '@/components/comments/comment-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const activeCount = comments.filter((c) => !c.deleted).length;

  return (
    <section aria-label="Comments">
      <header className="flex items-baseline justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-ink tracking-tight">
          {activeCount === 0
            ? 'The discussion'
            : `${activeCount} ${activeCount === 1 ? 'reply' : 'replies'}`}
        </h2>
        {activeCount > 0 && (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
            Newest at the top
          </span>
        )}
      </header>

      {topLevelComments.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-rule-2 bg-cream-2/30">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-persimmon-soft mb-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-persimmon-deep"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="font-display font-bold text-sm text-ink">
            Quiet in here&hellip;
          </p>
          <p className="mt-1 text-xs text-ink-2">
            Be the first to share your thoughts.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {topLevelComments.map((comment) => (
            <li
              key={comment.id}
              id={`c-${comment.id}`}
              className="scroll-mt-24 comment-anchor"
            >
              <CommentShow commentId={comment.id} postId={postId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
