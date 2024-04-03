import type { Comment } from "@prisma/client";
import { db } from "@/db";
import { cache } from "react";

export type CommentWithAuthor = Comment & {
  user: { name: string | null, image: string | null }
}

// We use request memoization by importing the cache function
// Since we pass the postId only to commentList and commentShow components
// Calls to this fetching function will be duplicated
// We use cache to deduplicate the calls

export const fetchCommentsByPostId = cache((postId: string): Promise<CommentWithAuthor[]> => {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
});
