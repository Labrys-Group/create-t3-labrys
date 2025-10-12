import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { Post } from "@project-name/db";
import { CreatePostSchema } from "@project-name/validators";

import { dbProcedure, protectedDbProcedure } from "../trpc";

export const postRouter = {
  all: dbProcedure.query(async () => {
    const posts = await Post.find().limit(10);

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
    }));
  }),

  byId: dbProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const post = await Post.findById(input.id);

      if (!post) return null;

      return {
        id: post._id.toString(),
        title: post.title,
        content: post.content,
      };
    }),

  create: protectedDbProcedure
    .input(CreatePostSchema)
    .mutation(async ({ input }) => {
      await Post.create(input);
    }),

  delete: protectedDbProcedure.input(z.string()).mutation(async ({ input }) => {
    await Post.findByIdAndDelete(input);
  }),
} satisfies TRPCRouterRecord;
