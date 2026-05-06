"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

export async function deletePost(postId: string): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be signed in to delete a post." };
  }

  const post = await db.post.findFirst({
    where: { id: postId },
    include: { topic: true },
  });

  if (!post) {
    return { error: "Post not found." };
  }

  if (post.userId !== session.user.id) {
    return { error: "You can only delete your own posts." };
  }

  await db.post.delete({ where: { id: postId } });

  redirect(paths.topicShow(post.topic.slug));
}
