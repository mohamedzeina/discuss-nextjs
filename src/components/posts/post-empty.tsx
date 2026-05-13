interface PostEmptyProps {
  title?: string;
  message?: string;
  variant?: 'feed' | 'search';
}

export default function PostEmpty({
  title,
  message,
  variant = 'feed',
}: PostEmptyProps) {
  const isSearch = variant === 'search';
  return (
    <div className="text-center py-16 rounded-2xl border border-dashed border-rule-2 bg-cream-2/30">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-persimmon-soft mb-4">
        {isSearch ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-persimmon-deep"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-persimmon-deep"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </div>
      <h3 className="font-display font-bold text-base text-ink">
        {title ?? (isSearch ? 'No matches' : 'Nothing here yet')}
      </h3>
      <p className="mt-1.5 text-sm text-ink-2 max-w-xs mx-auto">
        {message ??
          (isSearch
            ? 'Try a different word or check the spelling.'
            : 'Be the first to start a discussion.')}
      </p>
    </div>
  );
}
