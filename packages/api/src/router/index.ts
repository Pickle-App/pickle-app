import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { getRouter } from "./get";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  get: getRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
