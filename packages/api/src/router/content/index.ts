import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { Content, ContentType } from "@acme/db";

import { protectedProcedure } from "../../trpc";
import { text } from "./_categories/text";
import { url } from "./_categories/url";

const categories = {
  [ContentType.TEXT]: {
    name: "Text",
    schema: text,
  },
  [ContentType.URL]: {
    name: "URL",
    schema: url,
  },
};

export const contentRouter = {
  getByType: protectedProcedure
    .input(z.object({ type: z.nativeEnum(ContentType) }))
    .query(async ({ input }) => Content.find({ type: input.type })),
  getTypes: protectedProcedure.query(() =>
    Object.entries(categories).map(([key, { name }]) => ({
      id: key,
      name,
    })),
  ),
  add: protectedProcedure
    .input(
      z.object({
        type: z.nativeEnum(ContentType),
        content: z.any(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // validate the data
      const schema = categories[input.type].schema;

      const content = {
        type: input.type,
        name: `${input.type}:${input.name}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        content: input.content,
      };

      const data = schema.parse(content);

      const contentDoc = await Content.create(data);
      return contentDoc;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await Content.findByIdAndDelete(input.id);
    }),
} satisfies TRPCRouterRecord;
