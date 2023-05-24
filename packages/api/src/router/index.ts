import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
