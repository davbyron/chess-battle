import NextAuth from "next-auth"
import authConfig from "auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient()//.$extends(withAccelerate())

/**
 * Followed: https://authjs.dev/guides/edge-compatibility
 * 
 * Use Prisma Accelerate in production.
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
