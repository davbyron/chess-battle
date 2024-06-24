import { router } from 'src/server/trpc';
import { gameRouter } from './game';
 
export const appRouter = router({
  gameRouter,
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
