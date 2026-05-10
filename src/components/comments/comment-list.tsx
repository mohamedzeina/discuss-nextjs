import CommentShow from '@/components/comments/comment-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface CommentListProps {
  postId: string;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
    );
  });

  const activeCount = comments.filter((c) => !c.deleted).length;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-700">
        {activeCount} {activeCount === 1 ? 'comment' : 'comments'}
      </h2>
      {renderedComments.length === 0 ? (
        <div className="text-center py-10 rounded-lg border border-dashed border-gray-200 bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300 mx-auto mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>
          <p className="text-sm font-medium text-gray-600">No comments yet</p>
          <p className="text-xs text-gray-500 mt-1">Be the first to share your thoughts</p>
        </div>
      ) : (
        renderedComments
      )}
    </div>
  );
}
