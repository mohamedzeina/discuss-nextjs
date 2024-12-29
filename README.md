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
* Caching Optimizations: Achieved with `revalidatePath` for on-demand caching, addressing different behaviors between development and production environments.
* Component Streaming: Implemented using `Suspense` with loading skeletons to enhance user experience during component streaming.


### Obtaining GitHub OAuth Credentials

Follow these steps to obtain your GitHub OAuth credentials:

1. Go to **[GitHub Developer Settings](https://github.com/settings/developers)**.
2. Under the **OAuth Apps** section, click **New OAuth App** (or select an existing app if you already have one).
3. Fill out the required details:
   - **Application name**: Enter a name for your app (e.g., `My Next.js App`).
   - **Homepage URL**: Enter the URL where your app will be hosted during production (e.g., `http://localhost:3000` for local development).
   - **Authorization callback URL**: Use:
     ```
     http://localhost:3000/api/auth/callback/github
     ```
4. Click **Register application**.
5. On the application page, you will see the **Client ID** and an option to generate a **Client Secret**:
   - Copy the **Client ID**.
   - Generate and copy the **Client Secret**.
6. Add these credentials to your `.env.local` file as follows:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedzeina/discuss-nextjs.git
   cd online-shop
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a .env.local file:
   ```makefile
   GITHUB_CLIENT_ID=<your_github_client_id>
   GITHUB_CLIENT_SECRET=<your_github_client_secret>
   AUTH_SECRET=<random_characters>
   ```
4. Start the development server:
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

