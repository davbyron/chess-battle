// Starter router.
// Break up into more as app grows.
import { publicProcedure, router } from "../trpc";
import { createApi } from "unsplash-js";
import { UnsplashAccessKey } from "chess-battle.config";
import { Card } from "src/types/types";

export const gameRouter = router({
  drawCard: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const cards = await ctx.prisma.card.findMany({});
      const card = cards[Math.floor(Math.random() * cards.length)];

      const unsplash = createApi({ accessKey: UnsplashAccessKey });
      const unsplashResponse = await unsplash.photos.get({ photoId: card.unsplashImgId });
      const cardPhotoUrl = unsplashResponse.response?.urls.regular;
      
      const modifiedCard: Card = {
        ...card,
        imgUrl: cardPhotoUrl ?? "",
      };

      return modifiedCard;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),
});
