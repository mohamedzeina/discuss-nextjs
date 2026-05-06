'use client';

import { useState } from 'react';

interface DeleteButtonProps {
  action: () => Promise<{ error?: string }>;
  label?: string;
  confirmMessage?: string;
}

export default function DeleteButton({
  action,
  label = 'Delete',
  confirmMessage = 'Are you sure you want to delete this?',
}: DeleteButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (!window.confirm(confirmMessage)) return;
    setPending(true);
    const result = await action();
    if (result?.error) {
      setError(result.error);
    }
    setPending(false);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={pending}
        className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-40 transition-colors"
      >
        {pending ? 'Deleting...' : label}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
