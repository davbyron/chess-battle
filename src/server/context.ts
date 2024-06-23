import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { auth } from 'src/auth';
import { PrismaClient } from "@prisma/client";
 
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = await auth();
  const prisma = new PrismaClient();
 
  return {
    session,
    prisma,
  };
}
 
export type Context = Awaited<ReturnType<typeof createContext>>;
