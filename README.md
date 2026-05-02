# Discuss

A Reddit-style discussion platform where users can create topics, post threads, and reply to comments — built with Next.js 14 using the App Router.

## Features

- GitHub OAuth authentication via NextAuth v5
- Create and browse topics (subreddit-style)
- Nested comment threads with parent/child relationships
- Full-text post search
- Optimistic UI updates with server actions
- Streaming UI with Suspense and loading skeletons
- On-demand cache revalidation with `revalidatePath`
- Request memoization to deduplicate DB queries within a render

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | SQLite via Prisma ORM |
| Auth | NextAuth v5 + GitHub OAuth |
| UI | NextUI + Tailwind CSS |
| Validation | Zod |
| Animations | Framer Motion |

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

2. Create a `.env.local` file:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   AUTH_SECRET=a_random_secret_string
   DATABASE_URL="file:./dev.db"
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.
