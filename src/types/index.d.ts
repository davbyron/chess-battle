import NextAuth from 'next-auth';

declare module "*.module.css";

// Update NextAuth Session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
