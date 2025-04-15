import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { Content, ContentType } from "@acme/db";

import { protectedProcedure } from "../../trpc";
import { text } from "./_categories/text";

const categories = {
  [ContentType.TEXT]: text,
};

export const contentRouter = {
  getByType: protectedProcedure
    .input(z.object({ type: z.nativeEnum(ContentType) }))
    .query(async ({ input }) => Content.find({ type: input.type })),
  getTypes: protectedProcedure.query(() => Object.keys(categories)),
} satisfies TRPCRouterRecord;
