import { signIn } from '@/auth';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-10">
      <div className="w-full max-w-sm rise">
        <div className="relative overflow-hidden rounded-3xl border border-rule bg-surface shadow-soft">
          {/* Top accent bar */}
          <div className="h-1.5 bg-persimmon" aria-hidden />

          {/* Soft radial bloom */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(229, 83, 61, 0.10), transparent 70%)',
            }}
          />

          <div className="relative px-7 py-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ink text-cream mb-5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.5A9 9 0 1 1 21 12z" />
              </svg>
            </div>

            <h1 className="font-display font-extrabold tracking-tight text-2xl text-ink leading-tight">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Discuss</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-2 bg-persimmon-soft -z-0 rounded-sm"
                />
              </span>
              <span className="text-persimmon">.</span>
            </h1>
            <p className="mt-2 text-sm text-ink-2 leading-relaxed">
              Sign in to publish posts, reply to threads, and start your own
              topics.
            </p>

            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: '/' });
              }}
              className="mt-7"
            >
              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2.5 h-11 px-4 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-[#24292F] active:scale-[0.99] transition-all duration-200 motion-reduce:transition-none shadow-soft"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4.5 h-4.5 fill-current"
                  aria-hidden
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  &rarr;
                </span>
              </button>
            </form>

            <p className="mt-5 text-[11px] text-ink-3 leading-relaxed">
              By signing in you agree to be kind and curious. That&apos;s the
              whole policy.
            </p>
          </div>
        </div>

        {/* Footer line beneath the card */}
        <p className="mt-5 text-center text-xs font-mono uppercase tracking-[0.16em] text-ink-3">
          <span className="text-persimmon">&bull;</span> no email, no password,
          no fuss
        </p>
      </div>
    </div>
  );
}
