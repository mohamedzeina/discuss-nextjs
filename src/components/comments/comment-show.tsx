import CommentCard from '@/components/comments/comment-card';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import { auth } from '@/auth';

interface CommentShowProps {
  commentId: string;
  postId: string;
}

export default async function CommentShow({ commentId, postId }: CommentShowProps) {
  const [comments, session] = await Promise.all([
    fetchCommentsByPostId(postId),
    auth(),
  ]);

  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return null;

  const children = comments.filter((c) => c.parentId === commentId);
  const isOwner = session?.user?.id === comment.userId;

  const renderedChildren = children.map((child) => (
    <CommentShow key={child.id} commentId={child.id} postId={postId} />
  ));

  return (
    <CommentCard
      comment={comment}
      isOwner={isOwner}
      hasReplies={children.length > 0}
    >
      {renderedChildren.length > 0 ? renderedChildren : null}
    </CommentCard>
  );
}
