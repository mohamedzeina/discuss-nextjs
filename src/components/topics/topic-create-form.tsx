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
import FormButton from '../common/formButton';
import * as actions from '@/actions';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button className="w-full bg-indigo-600 text-white font-semibold">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 overflow-hidden w-80">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <form action={action}>
          <div className="flex flex-col gap-4 p-5">
            <div>
              <h3 className="text-base font-semibold text-gray-800">Create a Topic</h3>
              <p className="text-xs text-gray-500 mt-0.5">Lowercase letters and dashes only</p>
            </div>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="e.g. react-tips"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="What is this topic about?"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />

            {formState.errors._form && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0v-4.5a.75.75 0 00-1.5 0v4.5zm.75-7.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {formState.errors._form.join(', ')}
              </div>
            )}

            <FormButton>Create Topic</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
