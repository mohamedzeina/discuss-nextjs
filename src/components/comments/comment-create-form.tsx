'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Textarea } from '@nextui-org/react';
import FormButton from '@/components/common/formButton';
import * as actions from '@/actions';
import SurfacePanel from '@/components/common/surface-panel';
import { IconReply } from '@/components/icons';
import { inputClassNames as textareaClassNames } from '@/lib/form-classes';

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
          placeholder={
            startOpen ? 'Share your thoughts...' : 'Write a reply...'
          }
          minRows={startOpen ? 3 : 2}
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
          classNames={textareaClassNames}
        />

        {formState.errors._form && (
          <div className="flex items-start gap-2 px-3 py-2.5 bg-persimmon-soft border border-persimmon/30 rounded-xl text-persimmon-deep text-sm">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0v-4.5a.75.75 0 00-1.5 0v4.5zm.75-7.5a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formState.errors._form.join(', ')}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-ink-3">
            Be kind &middot; be curious
          </p>
          <div className="flex items-center gap-2">
            {!startOpen && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-9 px-3 rounded-full text-sm font-medium text-ink-2 hover:text-ink hover:bg-cream-2 transition-colors duration-150 motion-reduce:transition-none"
              >
                Cancel
              </button>
            )}
            <FormButton fullWidth={false}>
              {startOpen ? 'Post reply' : 'Reply'}
            </FormButton>
          </div>
        </div>
      </div>
    </form>
  );

  if (startOpen) {
    return (
      <SurfacePanel as="section" aria-label="Leave a reply">
        <header className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-rule">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-persimmon" />
            <h2 className="font-display font-bold text-sm text-ink">
              Add to the discussion
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            Markdown coming soon
          </span>
        </header>
        <div className="p-5">{form}</div>
      </SurfacePanel>
    );
  }

  return (
    <div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ink-2 hover:text-persimmon transition-colors duration-150 motion-reduce:transition-none"
        >
          <IconReply className="w-3.5 h-3.5" />
          Reply
        </button>
      )}
      {open && <div className="mt-3">{form}</div>}
    </div>
  );
}
