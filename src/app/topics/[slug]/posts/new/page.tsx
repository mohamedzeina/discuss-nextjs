'use client';

import { useFormState } from 'react-dom';
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
  const [formState, action] = useFormState(
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
            <div className="border rounded p-3 bg-red-50 border-red-300 text-red-700 text-sm">
              {formState.errors._form.join(', ')}
            </div>
          )}
          <FormButton>Publish Post</FormButton>
        </form>
      </div>
    </div>
  );
}
