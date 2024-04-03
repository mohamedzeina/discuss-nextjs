'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface FomrButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FomrButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}
