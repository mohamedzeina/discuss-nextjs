## Description
Discuss is an application that is done using NextJS. It mimics the features of a social media discussion website. 

The application allows the user to:
1) Sign In / Sign Out using GitHub OAuth
2) View Top Posts
3) Create New Topic
4) Create New Post For a Specific Topic
5) Reply to Posts by Adding Comments
6) Reply to Other Comments
7) Search for Posts Using the Search Bar

Authentication was handled using Next-Auth  
Next-UI was used for the styling of the application  
Zod was used to validate user inputs to forms   
Request Memoization was used to dedupliate some database queries  
Caching optimizations were done using revalidatePath (on demand caching) as different behavior of the application was observed between the development version and the production version  
Component Streaming was done using Suspense and loading skeletons were added where component streaming is being performed  

## How To Run Locally
First, clone the repo to your local machine:
```
git clone https://github.com/mohamedzeina/snippets-nextjs.git
```
Then, open up a terminal in the project's directory and install next by running the following command:
```
npm install next
```
Then, open a terminal in the local repo and run the development server:

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

