import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const profileRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        clerk_user_id: z.number(),
        self_skill_rating: z.number(),
        city: z.string(),
        state: z.enum(["WASHINGTON"]),
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const data: Prisma.ProfilesCreateInput = input;
      return ctx.prisma.profiles.create({ data });
    }),
});

export const postRouter = router({
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.profiles.findMany();
  // })
  // ,
  // byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.prisma.profiles.findFirst({ where: { id: input } });
  // }),
  // create: protectedProcedure
  //   .input(z.object({ title: z.string(), content: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.profiles.create({ data: input });
  //   }),
});
