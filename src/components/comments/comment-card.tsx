'use client';

import { useState } from 'react';
import Image from 'next/image';
import CommentCreateForm from '@/components/comments/comment-create-form';
import DeleteButton from '@/components/common/delete-button';
import { deleteComment } from '@/actions';
import { timeAgo } from '@/lib/utils';

interface CommentCardProps {
  comment: {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    deleted: boolean;
    user: { name: string | null; image: string | null };
  };
  isOwner: boolean;
  hasReplies: boolean;
  children?: React.ReactNode;
}

export default function CommentCard({ comment, isOwner, hasReplies, children }: CommentCardProps) {
  const [deleted, setDeleted] = useState(comment.deleted);
  const [hidden, setHidden] = useState(false);

  const handleSuccess = () => {
    if (hasReplies) {
      setDeleted(true);
    } else {
      setHidden(true);
    }
  };

  if (hidden) return null;

  if (deleted) {
    return (
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-400 italic">[deleted]</p>
        {children && (
          <div className="mt-4 pl-4 border-l-2 border-indigo-100 space-y-3">{children}</div>
        )}
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-700">{comment.user.name}</p>
              <span className="text-xs text-gray-400" suppressHydrationWarning>
                {timeAgo(comment.createdAt)}
              </span>
            </div>
            {isOwner && (
              <DeleteButton
                action={deleteComment.bind(null, comment.id)}
                confirmMessage="Are you sure?"
                onSuccess={handleSuccess}
              />
            )}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
          <div className="mt-2">
            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
      </div>
      {children && (
        <div className="mt-4 pl-4 border-l-2 border-indigo-100 space-y-3">{children}</div>
      )}
    </div>
  );
}
