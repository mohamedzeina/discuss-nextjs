import { IconReply, IconSearch } from '@/components/icons';

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
  const Icon = isSearch ? IconSearch : IconReply;
  return (
    <div className="text-center py-16 rounded-2xl border border-dashed border-rule-2 bg-cream-2/30">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-persimmon-soft mb-4">
        <Icon strokeWidth={1.8} className="w-6 h-6 text-persimmon-deep" />
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
