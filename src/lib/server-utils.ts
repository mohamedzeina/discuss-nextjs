import { auth } from '@/auth';

export async function requireAuth() {
  const session = await auth();
  return session?.user ?? null;
}
