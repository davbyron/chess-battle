import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";
 
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const session = await getSession();
  const prisma = new PrismaClient();
 
  return {
    session,
    prisma,
  };
}
 
export type Context = Awaited<ReturnType<typeof createContext>>;
