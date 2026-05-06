import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
	topic: { slug: string };
	user: { name: string | null; image: string | null };
	_count: { comments: number };
};

const postInclude = {
	topic: { select: { slug: true } },
	user: { select: { name: true, image: true } },
	_count: { select: { comments: { where: { deleted: false } } } },
} as const;

export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
	return db.post.findMany({
		where: {
			OR: [
				{ title: { contains: term, mode: 'insensitive' } },
				{ content: { contains: term, mode: 'insensitive' } },
			],
		},
		include: postInclude,
	});
}

export function fetchPostByTopicSlug(slug: string): Promise<PostWithData[]> {
	return db.post.findMany({
		where: { topic: { slug } },
		include: postInclude,
	});
}

export function fetchTopPosts(): Promise<PostWithData[]> {
	return db.post.findMany({
		orderBy: [{ comments: { _count: 'desc' } }],
		include: postInclude,
	});
}

export function fetchRecentPosts(): Promise<PostWithData[]> {
	return db.post.findMany({
		orderBy: { createdAt: 'desc' },
		include: postInclude,
	});
}
