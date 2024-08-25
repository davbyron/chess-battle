// Starter router.
// Break up into more as app grows.
import { publicProcedure, router } from "../trpc";
import { createApi } from "unsplash-js";
import { UnsplashAccessKey } from "chess-battle.config";
import { Card } from "src/types/types";
import z from "zod";

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
        location: "playerHand",
        uuid: crypto.randomUUID(),
        owner: "player",
      };

      return modifiedCard;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),
  findAvailableGame: publicProcedure
    .input(z.object({
      playerId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try{
        const game = await ctx.prisma.game.findFirst({
          where: {
            isAvailable: true,
          }
        });

        if (game) {
          await ctx.prisma.game.update({
            where: {
              id: game.id,
            },
            data: {
              players: {
                connect: {
                  id: input.playerId,
                }
              }
            }
          })
        }

        return game;
      } catch (e) {
        console.error(e);
        return null;
      }
    }),
  createGame: publicProcedure
    .input(z.object({
      playerId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const game = ctx.prisma.game.create({
          data: {
            players: {
              connect: {
                id: input.playerId,
              }
            },
            isAvailable: true,
          }
        });

        return game;
      } catch (e) {
        console.error(e);
        return null;
      }
    })
});
