import { contentRouter } from "./router/content";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  content: contentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
