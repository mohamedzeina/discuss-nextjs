import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const user = await db.user.findFirst();

  if (!user) {
    console.log('No users found. Sign in on the site first, then run the seed.');
    return;
  }

  console.log(`Seeding with user: ${user.name}`);

  const topics = await Promise.all([
    db.topic.upsert({
      where: { slug: 'web-dev' },
      update: {},
      create: { slug: 'web-dev', description: 'Discuss the latest in web development, frameworks, and best practices' },
    }),
    db.topic.upsert({
      where: { slug: 'javascript' },
      update: {},
      create: { slug: 'javascript', description: 'Everything JavaScript — tips, tricks, libraries, and the ecosystem' },
    }),
    db.topic.upsert({
      where: { slug: 'career' },
      update: {},
      create: { slug: 'career', description: 'Career advice, job hunting, interviews, and growing as a developer' },
    }),
    db.topic.upsert({
      where: { slug: 'open-source' },
      update: {},
      create: { slug: 'open-source', description: 'Share and discover open source projects worth contributing to' },
    }),
  ]);

  const [webDev, javascript, career, openSource] = topics;

  const posts = await Promise.all([
    db.post.create({
      data: {
        title: 'Is Next.js the right choice for every project?',
        content: "I've been using Next.js for most of my recent projects and I love the DX, but I'm starting to wonder if it's overkill for simpler apps. What's your take — when does it make sense to reach for Next.js vs a lighter alternative like Astro or even plain React?",
        userId: user.id,
        topicId: webDev.id,
      },
    }),
    db.post.create({
      data: {
        title: 'Tailwind CSS — love it or hate it?',
        content: "Tailwind has completely changed how I write CSS. Once you get past the initial learning curve the productivity gains are real. But I know a lot of developers find utility classes messy. Would love to hear where people stand on this after using it in production.",
        userId: user.id,
        topicId: webDev.id,
      },
    }),
    db.post.create({
      data: {
        title: 'What hosting platform do you use for side projects?',
        content: "I've been using Vercel for frontend and Neon for the database. Works great for Next.js but I'm curious what others are using, especially for more backend-heavy projects. Fly.io? Railway? Render? What's your go-to stack for deploying side projects without spending much?",
        userId: user.id,
        topicId: webDev.id,
      },
    }),
    db.post.create({
      data: {
        title: 'Why does JavaScript still not have a built-in sleep function?',
        content: "I know about setTimeout and I know about async/await with a Promise wrapper. But why, after all these years, is there no native sleep() in JS? Coming from Python this still trips me up. Anyone know the historical reason behind this design decision?",
        userId: user.id,
        topicId: javascript.id,
      },
    }),
    db.post.create({
      data: {
        title: 'TypeScript strict mode — is it worth the pain?',
        content: "Turned on strict mode in a mid-sized project last week and spent two days fixing type errors I didn't know existed. Genuinely caught two real bugs in the process. Still debating if it's worth enforcing on a team with mixed TypeScript experience. What do you all think?",
        userId: user.id,
        topicId: javascript.id,
      },
    }),
    db.post.create({
      data: {
        title: 'How do you prepare for system design interviews?',
        content: "Got a few system design rounds coming up and I'm honestly not sure how to prepare. I have a decent grasp of distributed systems concepts but translating that into a 45-minute interview format is a different skill. Looking for resources, frameworks, or personal tips from people who've been through it.",
        userId: user.id,
        topicId: career.id,
      },
    }),
    db.post.create({
      data: {
        title: 'How important is an online presence as a developer?',
        content: "I've been debating whether to invest time into building a portfolio site, writing blog posts, and being more active on GitHub vs just focusing on getting better at actual engineering. Is a strong online presence a real career differentiator or is it mostly noise?",
        userId: user.id,
        topicId: career.id,
      },
    }),
    db.post.create({
      data: {
        title: 'Share your favourite open source project you\'ve contributed to',
        content: "I made my first open source contribution last month — fixed a small documentation bug in a popular React library. It felt surprisingly rewarding. I'd love to hear from others about projects they've contributed to and what the experience was like. Any beginner-friendly repos you'd recommend?",
        userId: user.id,
        topicId: openSource.id,
      },
    }),
  ]);

  const c0a = await db.comment.create({
    data: {
      content: "Totally agree — Next.js is fantastic but sometimes Astro is the right call, especially for content-heavy sites where you want minimal JS by default.",
      userId: user.id,
      postId: posts[0].id,
    },
  });
  await db.comment.create({
    data: {
      content: "Good point on Astro. I used it for a marketing site and the zero-JS-by-default approach was a game changer for Lighthouse scores.",
      userId: user.id,
      postId: posts[0].id,
      parentId: c0a.id,
    },
  });
  await db.comment.create({
    data: {
      content: "Agreed — but once you need any interactivity on that marketing site, you end up adding islands anyway and the gap closes.",
      userId: user.id,
      postId: posts[0].id,
      parentId: c0a.id,
    },
  });

  const c0b = await db.comment.create({
    data: {
      content: "The App Router changed things for me. Once I got used to Server Components I stopped questioning it — it handles so much complexity for you.",
      userId: user.id,
      postId: posts[0].id,
    },
  });
  await db.comment.create({
    data: {
      content: "Same. The mental model is different but once it clicks, going back to the Pages Router feels like a step backwards.",
      userId: user.id,
      postId: posts[0].id,
      parentId: c0b.id,
    },
  });

  const c1a = await db.comment.create({
    data: {
      content: "Tailwind advocate here. The key insight is that you stop context-switching between files. Everything is colocated and that alone is worth it.",
      userId: user.id,
      postId: posts[1].id,
    },
  });
  await db.comment.create({
    data: {
      content: "Exactly. And with the VS Code extension showing you the actual CSS on hover, the readability concern basically disappears.",
      userId: user.id,
      postId: posts[1].id,
      parentId: c1a.id,
    },
  });

  await db.comment.create({
    data: {
      content: "Vercel + Neon is my go-to as well. Neon's branching feature is underrated — great for testing schema changes without touching prod.",
      userId: user.id,
      postId: posts[2].id,
    },
  });

  const c3a = await db.comment.create({
    data: {
      content: "It's a browser environment thing — blocking the main thread would freeze the UI. The event loop model makes a blocking sleep fundamentally incompatible with how the runtime works.",
      userId: user.id,
      postId: posts[3].id,
    },
  });
  await db.comment.create({
    data: {
      content: "Right, and Node.js inherited the same model. The Promise-based workaround is pretty clean once you get used to it: `await new Promise(r => setTimeout(r, 1000))`.",
      userId: user.id,
      postId: posts[3].id,
      parentId: c3a.id,
    },
  });

  await db.comment.create({
    data: {
      content: "Strict mode is 100% worth it. The pain is upfront, the safety is forever. I'd never start a new project without it.",
      userId: user.id,
      postId: posts[4].id,
    },
  });

  await db.comment.create({
    data: {
      content: "The \"Grokking System Design\" course helped me a lot. Also practice drawing diagrams out loud — interviewers care a lot about how you communicate tradeoffs.",
      userId: user.id,
      postId: posts[5].id,
    },
  });

  await db.comment.create({
    data: {
      content: "A good GitHub profile alone has gotten me recruiter attention. Projects with a live demo and a clean README make a real difference.",
      userId: user.id,
      postId: posts[6].id,
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
