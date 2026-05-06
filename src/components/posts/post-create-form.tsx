'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '../common/formButton';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button className="w-full bg-indigo-600 text-white font-semibold">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-semibold">Post to <span className="text-indigo-600">#{slug}</span></h3>

            <Input
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="What's your post about?"
            />
            <Textarea
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Share your thoughts, questions, or ideas..."
              minRows={4}
            />

            {formState.errors._form ? (
              <div className="border rounded p-2 bg-red-200 border-red-400">
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
