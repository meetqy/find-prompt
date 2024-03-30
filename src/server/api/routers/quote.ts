import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quoteRouter = createTRPCRouter({
  createMany: publicProcedure
    .input(
      z.object({
        token: z.string(),
        data: z.array(
          z.object({
            sentence: z.string(),
            sentence_zh_Hant: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.token !== process.env.TOKEN) throw new Error("Invalid token");

      const result = await ctx.db.quote.createMany({
        data: input.data,
      });

      return result;
    }),
});
