import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const getRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profiles.findMany();
  }),
  byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.profiles.findFirst({ where: { clerk_user_id: input } });
  }),

  // create: protectedProcedure
  //   .input(z.object({ title: z.string(), content: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.profiles.create({ data: input });
  //   }),
});
