import { createTRPCRouter } from "~/server/api/trpc";
import { tagRouter } from "./routers/tag";
import { authorRouter } from "./routers/author";
import { poemRouter } from "./routers/poem";
import { quoteRouter } from "./routers/quote";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  author: authorRouter,
  tag: tagRouter,
  poem: poemRouter,
  quote: quoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
