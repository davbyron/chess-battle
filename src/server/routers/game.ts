// Starter router.
// Break up into more as app grows.
import { publicProcedure, router } from "../trpc";
import z from "zod";
import { createApi } from "unsplash-js";
import { UnsplashAccessKey } from "chess-battle.config";

export const gameRouter = router({
  getAllCards: publicProcedure.query(async ({ ctx }) => {
    try {
      const cards = await ctx.prisma.card.findMany({});
      return cards ?? [];
    } catch (e) {
      console.log(e)
      return [];
    }
  }),
  getCardPhotoUrl: publicProcedure.input(
    z.object({
      cardPhotoId: z.string(),
    })
  ).mutation(async ({ input }) => {
    try {
      const unsplash = createApi({ accessKey: UnsplashAccessKey });
      const unsplashResponse = await unsplash.photos.get({ photoId: input.cardPhotoId });
      const cardPhotoUrl = unsplashResponse.response?.urls.regular;
      return cardPhotoUrl;
    } catch (e) {
      console.error(e);
      return "";
    }
  })
});
