# Hearsay

> *All opinions welcome. Even yours.*

A community discussion platform where every voice gets a thread — topics, posts, nested comments, live search. Built with Next.js 14 App Router, Postgres, and a hand-tuned warm-modern design system.

**Live:** [hearsay-community.vercel.app](https://hearsay-community.vercel.app)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

## Features

### Authentication
- GitHub OAuth via NextAuth v5 with Prisma adapter
- **Split-screen sign-in page**: oversized `hearsay.` wordmark, three numbered value props, live topic-chip constellation pulled from the database, and an auth card with a GitHub button whose persimmon wash sweeps up from the bottom on hover
- "Why only GitHub?" `<details>` disclosure with rotating chevron
- Real social proof (avatar stack + member count) from `db.user.count()`
- Sign-in button hides automatically on `/auth/signin`

### Topics
- Create topics via a centered modal (Cancel + Create-topic footer bar, autofocus, slug-pattern validation)
- Topic chips colored deterministically via `topicTone(slug)` — a hash of the slug maps to one of 8 muted palettes (terracotta, sage, plum, teal, mustard, periwinkle, rust, dusty rose). The same topic always renders in the same color across the entire app.
- Topic show page hero is washed in the topic's own tone with a soft radial bloom
- Sidebar list sorted by post count with hover-lift chips

### Posts
- Create posts inside a topic with title + content (large-variant Tailwind/NextUI inputs)
- Per-topic-tone color band across the top of the post card
- Big serif headline, author avatar with ring, mono timestamp, hairline divider, generous-leading body
- Top/New sort tabs as a pill segmented control (star + clock icons), 5-per-page pagination
- Full-text search across title and content
- Owner-only delete with two-stage inline confirm (no browser dialogs)
- Empty state cards with persimmon-soft icon halo

### Comments
- Threaded replies (nested via `parentId`)
- Each comment is its own bordered card with an avatar column
- **Collapse rail**: the thin column between avatar and replies is a clickable pill that toggles a "+ show replies" footer for the subtree
- Soft delete for comments with children — renders `[comment deleted]` to preserve thread context; childless deletes hide entirely
- Instant client UI on delete; counts in the header exclude soft-deleted comments

### Post Detail (Two-Column View)
- **Main column**: post card → reply form → comment thread
- **Sticky sidebar**:
  - **Author card** — avatar, "writes on hearsay" label, two-up stats grid (posts / replies) using real database counts
  - **Thread map** — numbered list (01, 02, …) of top-level comments. Click a row → anchor jumps to that comment via `#c-{id}`, with a **persimmon `:target` flash** as arrival feedback (1.8s box-shadow fade)
  - **Related posts** — top 4 other recent posts in the same topic with an "all →" link
  - "Jump to reply" anchor pill at the bottom

### Live Search
- Header search with a **suggestions dropdown** that appears after 2+ characters
- Debounced server action queries both `Topic.slug` and `Post.title/content` in parallel, capped to 4 + 5
- Two sections (Topics / Posts), each with a count badge in the header
- **Matched substring highlighted in persimmon** inside the labels
- Keyboard nav: `↑/↓` move through items (wraps), `Enter` selects highlighted item or submits to full search, `Escape` closes
- Proper ARIA combobox semantics (`role="combobox"`, `aria-controls`, `aria-activedescendant`)
- "See all results for *term* →" fallback row at the bottom
- Full search page leads with a serif "Results for «term»" line where the query sits in a persimmon-soft marker highlight

### UX & Motion
- Streaming UI via Suspense — post card, comment list, and sidebar panels load independently
- Custom 404 page with hand-drawn underline
- Route-level loading skeletons for `/`, `/search`, `/auth/signin`, `/topics/[slug]`, and `/topics/[slug]/posts/[postId]`
- Subtle animations: `.rise` (fade + slide-up), `.dot-live` (persimmon glow pulse), `.ink-link` (hover underline reveal), `:target` flash on anchor arrival, bouncy logo period on hover, rotating `+` glyph on the topic-create trigger
- All animations honor `prefers-reduced-motion`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | NextAuth v5 (beta) + GitHub OAuth + Prisma adapter |
| UI | NextUI + Tailwind CSS |
| Fonts | Plus Jakarta Sans + JetBrains Mono (via `next/font/google`) |
| Validation | Zod |
| Motion | Framer Motion / Motion |

## Design System

A self-built "warm community modern" design system — ivory paper background, ink text, one persimmon accent.

### Tokens (Tailwind extensions)

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FAF7F2` | Page background |
| `cream-2` | `#F2EDE3` | Input fill, hover |
| `surface` | `#FFFFFF` | Cards |
| `ink` | `#1A1614` | Primary text |
| `ink-2` / `ink-3` | `#5C544E` / `#A8A29E` | Secondary / tertiary text |
| `rule` / `rule-2` | `#EAE4D7` / `#DDD5C5` | Borders |
| `persimmon` | `#E5533D` | The accent — CTAs, focus rings, highlights |
| `persimmon-soft` / `persimmon-deep` | `#FBE8E3` / `#C2402B` | Soft fill / strong hover |

Three semantic shadows: `shadow-soft` (1px lift), `shadow-lift` (4-12px), `shadow-lift-lg` (modals).

### Primitives

- **`SurfacePanel`** (`src/components/common/surface-panel.tsx`) — polymorphic card with `as` (section/article/aside) and `size` (md = `rounded-2xl` sidebars, lg = `rounded-3xl` content). 10+ consumers; single source of truth for bordered surfaces.
- **`PostCard`** (`src/components/posts/post-card.tsx`) — shared by feed, topic list, and search; reveals a persimmon left rail on hover.
- **`PostEmpty`** — variant-driven (`feed` vs `search`) empty state.
- **`PostPagination`** — accessible prev/next pills with arrow translate.
- **`FormButton`** — ink pill with built-in `useFormStatus()` spinner and "Working…" state.
- **`DeleteButton`** — trash icon → inline persimmon "Are you sure?" pill with Yes/Cancel.
- **`Icons`** (`src/components/icons.tsx`) — shared `IconReply`, `IconSearch`, `IconChevronDown`, `IconChevronRight`.
- **`topicTone(slug)`** (`src/lib/utils.ts`) — deterministic hash → 1 of 8 muted color triples (bg / text / dot).
- **Form classNames** (`src/lib/form-classes.ts`) — `inputClassNames`, `inputClassNamesLg`, `textareaClassNamesLg` for consistent NextUI styling.

## Architecture

- **Server Components** handle all data fetching — posts, comments, topics, suggestions, and auth resolve on the server before streaming.
- **Client Components** are scoped to interactivity only: form state, sort toggles, delete confirmation, search dropdown, modal state.
- **Server Actions** (`'use server'`) handle every mutation and the live-suggestions query. All write actions go through Zod validation and `requireAuth()`.
- **Suspense boundaries** on the post detail page stream the post, comments, author card, thread map, and related posts in parallel.
- **Request memoization** via React `cache()` deduplicates `fetchPostById` and `fetchCommentsByPostId` when multiple components in the same render need them.
- **Soft delete** on comments preserves thread context — comments with replies become `[deleted]`; childless ones disappear entirely.

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # User, Topic, Post, Comment models
│   └── seed.ts                # Seed with nested comment threads
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Plus Jakarta + JetBrains Mono + Header + footer
│   │   ├── page.tsx           # Home — hero, signed-in greeting, post feed, sidebar
│   │   ├── loading.tsx        # Home skeleton
│   │   ├── not-found.tsx      # Custom 404
│   │   ├── globals.css        # CSS vars, animations
│   │   ├── auth/signin/       # Split-screen sign-in + its loading skeleton
│   │   ├── search/            # Search page + loading skeleton
│   │   └── topics/[slug]/
│   │       ├── page.tsx       # Topic show (per-topic tone hero)
│   │       ├── loading.tsx
│   │       └── posts/
│   │           ├── new/       # Post create form
│   │           └── [postId]/  # Two-column post detail + loading
│   ├── actions/
│   │   ├── create-post.ts / create-topic.ts / create-comment.ts
│   │   ├── delete-post.ts / delete-comment.ts
│   │   ├── search.ts
│   │   ├── search-suggestions.ts   # Live suggestions for header search
│   │   └── sign-in.ts / sign-out.ts
│   ├── components/
│   │   ├── header.tsx              # Sticky masthead with persimmon hairline
│   │   ├── headerAuth.tsx          # Avatar dropdown / Sign-in button
│   │   ├── search-input.tsx        # Live-suggestions combobox
│   │   ├── icons.tsx               # Shared SVG icons
│   │   ├── common/
│   │   │   ├── surface-panel.tsx   # Bordered card primitive
│   │   │   ├── formButton.tsx      # Form submit with spinner
│   │   │   ├── delete-button.tsx   # Inline confirm UX
│   │   │   └── breadcrumb.tsx
│   │   ├── posts/
│   │   │   ├── post-card.tsx           # Shared list card
│   │   │   ├── post-empty.tsx
│   │   │   ├── post-pagination.tsx
│   │   │   ├── post-feed.tsx           # Top/New sort + pagination
│   │   │   ├── post-list.tsx           # Server-rendered list wrapper
│   │   │   ├── post-show.tsx           # Single post article
│   │   │   ├── post-author.tsx         # Sidebar author card
│   │   │   ├── thread-map.tsx          # Sidebar comment navigation
│   │   │   ├── related-posts.tsx       # Sidebar same-topic list
│   │   │   ├── search-results.tsx
│   │   │   └── *-loading.tsx, *-skeleton.tsx
│   │   ├── comments/
│   │   │   ├── comment-list.tsx        # Top-level + threading
│   │   │   ├── comment-show.tsx        # Recursive renderer
│   │   │   ├── comment-card.tsx        # Card with collapse rail
│   │   │   ├── comment-create-form.tsx # Reply + top-level
│   │   │   └── comment-list-loading.tsx
│   │   └── topics/
│   │       ├── topic-list.tsx          # Colored chips
│   │       └── topic-create-form.tsx   # Modal
│   ├── db/
│   │   ├── index.ts                    # Prisma singleton
│   │   └── queries/
│   │       ├── posts.ts                # Cached by-id, by-topic, search, recent, top
│   │       └── comments.ts             # Cached by-post
│   ├── lib/
│   │   ├── utils.ts                    # timeAgo(), topicTone(), TOPIC_PALETTE
│   │   ├── server-utils.ts             # requireAuth()
│   │   ├── form-classes.ts             # Shared NextUI input/textarea classes
│   │   └── types.ts                    # FormState, ActionResult
│   ├── auth.ts                         # NextAuth v5 config
│   └── paths.ts                        # Type-safe URL builder
├── tailwind.config.ts                  # Design tokens
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (free Neon plan works)
- A GitHub OAuth app ([create one](https://github.com/settings/developers))
  - Homepage URL: `http://localhost:3000`
  - Callback URL: `http://localhost:3000/api/auth/callback/github`

### Setup

```bash
git clone https://github.com/mohamedzeina/discuss-nextjs.git
cd discuss-nextjs
npm install
```

Create `.env.local` — see [Environment Variables](#environment-variables) below.

Set up the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | [Neon](https://neon.tech) or any Postgres provider |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID | [GitHub Developer Settings](https://github.com/settings/developers) |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret | Same |
| `AUTH_SECRET` | Random secret for NextAuth token signing | `openssl rand -base64 32` |

## Scripts

```bash
npm run dev        # Start the dev server on :3000
npm run build      # prisma generate + next build
npm run start      # Start the production server
npm run lint       # next lint
npx prisma db seed # Reseed the database from prisma/seed.ts
```
