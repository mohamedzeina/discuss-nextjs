'use client';

import { useActionState } from 'react';
import { Input, Textarea } from '@nextui-org/react';
import FormButton from '@/components/common/formButton';
import * as actions from '@/actions';
import Link from 'next/link';
import paths from '@/paths';

interface PostCreatePageProps {
  params: { slug: string };
}

export default function PostCreatePage({ params }: PostCreatePageProps) {
  const { slug } = params;
  const [formState, action] = useActionState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href={paths.topicShow(slug)} className="text-sm text-indigo-600 hover:underline mb-6 inline-block">
        ← Back to #{slug}
      </Link>
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-bold mb-1">Create a Post</h1>
        <p className="text-sm text-gray-500 mb-6">Posting to <span className="text-indigo-600 font-medium">#{slug}</span></p>
        <form action={action} className="flex flex-col gap-5">
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="What's your post about?"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
          />
          <Textarea
            name="content"
            label="Content"
            labelPlacement="outside"
            placeholder="Share your thoughts, questions, or ideas..."
            minRows={6}
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
          <FormButton>Publish Post</FormButton>
        </form>
      </div>
    </div>
  );
}
