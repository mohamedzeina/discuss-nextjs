'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import FormButton from '@/components/common/formButton';
import * as actions from '@/actions';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-3">
        <Textarea
          name="content"
          placeholder={startOpen ? 'Share your thoughts...' : 'Write a reply...'}
          minRows={startOpen ? 3 : 2}
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
        />

        {formState.errors._form && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0v-4.5a.75.75 0 00-1.5 0v4.5zm.75-7.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            {formState.errors._form.join(', ')}
          </div>
        )}

        <FormButton>{startOpen ? 'Post Comment' : 'Post Reply'}</FormButton>
      </div>
    </form>
  );

  if (startOpen) {
    return (
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Leave a comment</h2>
        {form}
      </div>
    );
  }

  return (
    <div>
      <Button
        size="sm"
        variant="light"
        className="text-indigo-600 hover:text-indigo-800 font-medium px-0"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Cancel' : 'Reply'}
      </Button>
      {open && <div className="mt-2">{form}</div>}
    </div>
  );
}
