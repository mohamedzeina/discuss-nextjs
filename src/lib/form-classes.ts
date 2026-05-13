const baseLabels = {
  label: 'text-ink text-xs font-semibold',
  errorMessage: 'text-persimmon-deep text-xs font-medium',
} as const;

const wrapperBase =
  'bg-cream-2/40 border border-rule data-[hover=true]:border-rule-2 group-data-[focus=true]:border-persimmon group-data-[focus=true]:bg-surface shadow-none rounded-xl';

/** Standard-size NextUI Input/Textarea classNames matching the warm-modern palette. */
export const inputClassNames = {
  ...baseLabels,
  inputWrapper: wrapperBase,
  input: 'text-ink placeholder:text-ink-3 text-sm',
} as const;

/** Larger-size variant (h-12, text-base) for primary forms like post-create. */
export const inputClassNamesLg = {
  ...baseLabels,
  inputWrapper: `${wrapperBase} h-12`,
  input: 'text-ink placeholder:text-ink-3 text-base',
} as const;

/** Large textarea variant — same wrapper as Lg input but with comfortable leading. */
export const textareaClassNamesLg = {
  ...baseLabels,
  inputWrapper: wrapperBase,
  input: 'text-ink placeholder:text-ink-3 text-base leading-relaxed',
} as const;
