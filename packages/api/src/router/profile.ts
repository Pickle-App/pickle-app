import { router, publicProcedure, protectedProcedure } from "../trpc";
import { date, z } from "zod";

export const profileRouter = router({
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.post.findMany();
  // }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.profiles.findFirst({ where: { clerk_user_id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        clerk_user_id: z.string(),
        created_at: z.date(),
        self_skill_rating: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.profiles.create({
        data: {
          clerk_user_id: input.clerk_user_id,
          self_skill_rating: input.self_skill_rating,
          created_at: input.created_at,
          community_skill_rating: null,
          freshLogin: true,
          skips: 0,
          bio: "I like Turtles",
          age: 36,
          city: "Seattle",
          state: "WASHINGTON",
        },
      });
    }),
});
