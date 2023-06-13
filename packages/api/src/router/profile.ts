import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const statesList = [
  "ALABAMA",
  "ALASKA",
  "ARIZONA",
  "ARKANSAS",
  "CALIFORNIA",
  "COLORADO",
  "CONNECTICUT",
  "DELAWARE",
  "FLORIDA",
  "GEORGIA",
  "HAWAII",
  "IDAHO",
  "ILLINOIS",
  "INDIANA",
  "IOWA",
  "KANSAS",
  "KENTUCKY",
  "LOUISIANA",
  "MAINE",
  "MARYLAND",
  "MASSACHUSETTS",
  "MICHIGAN",
  "MINNESOTA",
  "MISSISSIPPI",
  "MISSOURI",
  "MONTANA",
  "NEBRASKA",
  "NEVADA",
  "NEW_HAMPSHIRE",
  "NEW_JERSEY",
  "NEW_MEXICO",
  "NEW_YORK",
  "NORTH_CAROLINA",
  "NORTH_DAKOTA",
  "OHIO",
  "OKLAHOMA",
  "OREGON",
  "PENNSYLVANIA",
  "RHODE_ISLAND",
  "SOUTH_CAROLINA",
  "SOUTH_DAKOTA",
  "TENNESSEE",
  "TEXAS",
  "UTAH",
  "VERMONT",
  "VIRGINIA",
  "WASHINGTON",
  "WEST_VIRGINIA",
  "WISCONSIN",
  "WYOMING",
] as const;

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
        clerk_user_id: z.string(),
        self_skill_rating: z.number(),
        community_skill_rating: z.optional(z.number()),
        bio: z.optional(z.string()),
        age: z.optional(z.number()),
        city: z.string(),
        state: z.enum(statesList),
        setup_skip_count: z.optional(z.number()),
        has_user_profile: z.optional(z.boolean()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.profiles.create({ data: input });
    }),

  test: publicProcedure
    .input(
      z.object({
        content: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const test = await ctx.prisma.test.create({
        data: {
          content: input.content,
          userId: input.userId,
        },
      });
      return test;
    }),
});
