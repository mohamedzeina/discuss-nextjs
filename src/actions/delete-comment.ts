"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import paths from "@/paths";
import { requireAuth } from "@/lib/utils";
import type { ActionResult } from "@/lib/types";

export async function deleteComment(commentId: string): Promise<ActionResult> {
  const user = await requireAuth();
  if (!user) return { error: "You must be signed in to delete a comment." };

  const comment = await db.comment.findFirst({
    where: { id: commentId },
    include: { _count: { select: { children: true } }, post: { include: { topic: true } } },
  });

  if (!comment) {
    return { error: "Comment not found." };
  }

  if (comment.userId !== user.id) {
    return { error: "You can only delete your own comments." };
  }

  if (comment._count.children > 0) {
    await db.comment.update({
      where: { id: commentId },
      data: { deleted: true },
    });
  } else {
    await db.comment.delete({ where: { id: commentId } });
  }

  revalidatePath(paths.postShow(comment.post.topic.slug, comment.postId));
  return {};
}
