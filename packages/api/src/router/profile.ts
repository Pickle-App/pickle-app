import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const profileRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profiles.findMany();
  }),
  byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.profiles.findFirst({ where: { clerk_user_id: input } });
  }),

  create: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        clerk_user_id: z.string(),
        created_at: z.date(),
        self_skill_rating: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.profiles.create({
        data: {
          id: 1,
          clerk_user_id: "user_49587834953h4ut348",
          created_at: "11/03/1986",
          self_skill_rating: 3.5,
          community_skill_rating: null,
          bio: "I like Turtles",
          age: 36,
          city: "Seattle",
          state: "WASHINGTON",
        },
      });
    }),
});
