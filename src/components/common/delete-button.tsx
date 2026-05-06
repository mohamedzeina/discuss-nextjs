'use client';

import { useState } from 'react';

interface DeleteButtonProps {
  action: () => Promise<{ error?: string }>;
  label?: string;
  confirmMessage?: string;
  onSuccess?: () => void;
}

export default function DeleteButton({
  action,
  label = 'Delete',
  confirmMessage = 'Are you sure?',
  onSuccess,
}: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    setPending(true);
    const result = await action();
    if (result?.error) {
      setError(result.error);
      setConfirming(false);
      setPending(false);
    } else {
      onSuccess?.();
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{confirmMessage}</span>
        <button
          onClick={handleConfirm}
          disabled={pending}
          className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-40 transition-colors"
        >
          {pending ? 'Deleting...' : 'Yes'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="text-xs text-gray-400 hover:text-gray-600 font-medium disabled:opacity-40 transition-colors"
        >
          Cancel
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
    >
      {label}
    </button>
  );
}
