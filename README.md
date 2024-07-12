## Description
Discuss is a Next.js application that replicates the features of a social media discussion website. It allows users to:

* Sign in and out using GitHub OAuth.
* View top posts.
* Create new topics.
* Create new posts within specific topics.
* Reply to posts by adding comments.
* Reply to other comments.
* Search for posts using a search bar.


Key features and technologies used in the application include:

* Authentication: Handled using NextAuth.
* Styling: Implemented with Next-UI.
* Form Validation: Managed using Zod.
* Request Memoization: Employed to deduplicate certain database queries.
* Caching Optimizations: Achieved with revalidatePath for on-demand caching, addressing different behaviors between development and production environments.
* Component Streaming: Implemented using Suspense with loading skeletons to enhance user experience during component streaming.

## How To Run Locally
First, clone the repo to your local machine:
```
git clone https://github.com/mohamedzeina/discuss-nextjs.git
```
Then move into the project's directory:
```
cd discuss-nextjs
```
Then, install dependencies using the following command:
```
npm install
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

