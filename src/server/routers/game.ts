// Starter router.
// Break up into more as app grows.
import { publicProcedure, router } from "../trpc";

export const gameRouter = router({
  getAllCards: publicProcedure.query(async ({ ctx }) => {
    try {
      const cards = await ctx.prisma.card.findMany({});
      return cards ?? [];
    } catch (e) {
      console.log(e)
      return [];
    }
  })
});
