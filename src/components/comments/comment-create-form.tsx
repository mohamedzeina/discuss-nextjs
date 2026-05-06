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

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(', ')}
          </div>
        ) : null}

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
