import { z } from "zod";

export const url = z.object({
  /**
   * The type of the content
   */
  type: z.literal("url"),
  /**
   * Short name for the url content (must be unique)
   */
  name: z.string(),
  /**
   * Content
   */
  content: z.string().url(),
});
