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

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-700">
        {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </h2>
      {renderedComments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No comments yet — be the first to reply!</p>
        </div>
      ) : (
        renderedComments
      )}
    </div>
  );
}
