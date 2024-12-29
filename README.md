# Discuss NextJS

Welcome to the **Discuss NextJS** repository! It is a web application that replicates the features of a social media discussion platform. It enables users to create, engage in, and explore discussions, making it a great tool for collaborative knowledge sharing and community interaction.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#Prerequisites)
- [Obtaining GitHub OAuth Credentials](#Obtaining-GitHub-OAuth-Credentials)
- [Installation](#installation)

## Features

- **GitHub OAuth Authentication**: Secure user authentication with GitHub.
- **Discussion Threads**: Create, reply to, and manage discussion threads.
- **Search Functionality**: Quickly find discussions by keywords.
- **Responsive Design**: Optimized for a seamless user experience on all devices.
- **User-friendly Interface**: Intuitive design for easy navigation and participation.


## Tech Stack

* Authentication: Handled using NextAuth.
* Styling: Implemented with Next-UI.
* Form Validation: Managed using Zod.
* Request Memoization: Employed to deduplicate certain database queries.
* Caching Optimizations: Achieved with `revalidatePath` for on-demand caching, addressing different behaviors between development and production environments.
* Component Streaming: Implemented using `Suspense` with loading skeletons to enhance user experience during component streaming.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. Download it from [Node.js Official Website](https://nodejs.org/).
- **GitHub OAuth App**: Create a GitHub OAuth application to enable user authentication. (Details below)

## Obtaining GitHub OAuth Credentials

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
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   AUTH_SECRET=random_characters
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

