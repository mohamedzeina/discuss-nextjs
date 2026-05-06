import Image from 'next/image';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface CommentShowProps {
  commentId: string;
  postId: string;
}

export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex gap-3">
        {comment.user.image ? (
          <Image
            src={comment.user.image}
            alt={comment.user.name || 'user'}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-indigo-600">
              {comment.user.name?.[0]?.toUpperCase() ?? '?'}
            </span>
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {comment.user.name}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
          <div className="mt-2">
            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
      </div>
      {renderedChildren.length > 0 && (
        <div className="mt-3 pl-11 space-y-3">{renderedChildren}</div>
      )}
    </div>
  );
}
