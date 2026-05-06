# Discuss

A Reddit-style discussion platform where users can create topics, post threads, and reply in nested comment threads — built with Next.js 14 using the App Router.

**Live:** [discuss-nextjs-drab.vercel.app](https://discuss-nextjs-drab.vercel.app)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

## Features

- **Authentication**
  - GitHub OAuth sign-in via NextAuth v5
  - Custom sign-in page
  - Sign-out with immediate client session update
  - Sign In button hidden when already on the sign-in page

- **Topics**
  - Create topics with slug validation (lowercase letters and dashes only)
  - Browse all topics in a sidebar on the home page

- **Posts**
  - Create posts within a topic (title + content)
  - View post detail with author avatar, topic badge, and timestamp
  - Delete own posts with inline confirmation — no browser dialogs
  - Feed sorted by Top (comment count) or New (date), with pagination (5 posts per page)
  - Full-text search across post titles and content

- **Comments**
  - Add comments and nested replies (threaded conversations)
  - Soft delete for comments with replies — shows `[deleted]` placeholder to preserve thread context
  - Hard delete for leaf comments — hides card entirely
  - Active comment count excludes soft-deleted comments
  - Instant UI update on deletion without waiting for server revalidation

- **Authorization**
  - All write operations require authentication
  - Users can only delete their own posts and comments
  - Typed error responses for unauthorized actions

- **UX**
  - Streaming UI with Suspense — post and comment list load independently
  - Loading skeletons for home page, post page, and comment list
  - Custom 404 page
  - Optimistic-style UI: deletion reflected instantly in the client before revalidation

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | NextAuth v5 + GitHub OAuth |
| UI | NextUI + Tailwind CSS |
| Validation | Zod |
| Animations | Framer Motion |

## Architecture

This project uses the **Next.js App Router** with a clear split between server and client responsibilities:

- **Server Components** handle all data fetching — posts, comments, topics, and auth session are resolved on the server before streaming to the client.
- **Client Components** are scoped to interactivity only — form state, sort toggles, delete confirmations, auth UI, and session-aware rendering.
- **Server Actions** (`'use server'`) handle all mutations — creation and deletion go through typed, validated server functions with Zod schemas and `requireAuth()` checks.
- **Suspense boundaries** allow the post card and comment list to stream independently, each showing its own loading skeleton while data resolves.
- **Request memoization** via React `cache()` deduplicates the comments query when multiple components in the same render need it.
- **Soft delete** on comments preserves thread context — comments with replies are marked `deleted: true` and rendered as `[deleted]`; childless comments are removed entirely.

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # Data models (User, Topic, Post, Comment)
│   └── seed.ts                # Seed data with nested comment threads
├── src/
│   ├── app/                   # App Router pages and layouts
│   │   ├── page.tsx           # Home — recent posts + topics sidebar
│   │   ├── loading.tsx        # Home page skeleton
│   │   ├── not-found.tsx      # Custom 404 page
│   │   ├── auth/signin/       # Custom GitHub sign-in page
│   │   ├── search/            # Full-text search results
│   │   └── topics/[slug]/
│   │       ├── page.tsx       # Topic feed
│   │       └── posts/
│   │           ├── new/       # Post creation form
│   │           └── [postId]/  # Post detail + comments + skeletons
│   ├── actions/               # Server actions (mutations)
│   │   ├── create-post.ts
│   │   ├── create-topic.ts
│   │   ├── create-comment.ts
│   │   ├── delete-post.ts
│   │   └── delete-comment.ts
│   ├── components/
│   │   ├── posts/             # PostFeed, PostShow, PostList, SearchResults, skeletons
│   │   ├── comments/          # CommentList, CommentShow, CommentCard, CommentCreateForm, skeleton
│   │   ├── topics/            # TopicCreateForm, TopicList
│   │   └── common/            # DeleteButton, FormButton
│   ├── db/
│   │   ├── index.ts           # Prisma client singleton
│   │   └── queries/           # fetchPostsByTopic, fetchPostsBySearchTerm, fetchCommentsByPostId
│   ├── lib/
│   │   ├── utils.ts           # timeAgo() — client-safe
│   │   ├── server-utils.ts    # requireAuth() — server-only
│   │   └── types.ts           # FormState, ActionResult
│   ├── auth.ts                # NextAuth config (GitHub provider, Prisma adapter)
│   └── paths.ts               # Type-safe URL builder
```

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub OAuth app ([create one here](https://github.com/settings/developers))
  - Homepage URL: `http://localhost:3000`
  - Callback URL: `http://localhost:3000/api/auth/callback/github`

### Setup

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/mohamedzeina/discuss-nextjs.git
   cd discuss-nextjs
   npm install
   ```

2. Create a `.env.local` file — see [Environment Variables](#environment-variables).

3. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID | [GitHub Developer Settings](https://github.com/settings/developers) |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret | [GitHub Developer Settings](https://github.com/settings/developers) |
| `AUTH_SECRET` | Random secret for NextAuth token signing | Run `openssl rand -base64 32` |
| `DATABASE_URL` | PostgreSQL connection string | [Neon](https://neon.tech) or any PostgreSQL provider |
