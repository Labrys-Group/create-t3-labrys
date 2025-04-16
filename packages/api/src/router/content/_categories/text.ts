import { z } from "zod";

export const text = z.object({
  /**
   * The type of the content
   */
  type: z.literal("text"),
  /**
   * Short name for the text content (must be unique)
   */
  name: z.string(),
  /**
   * Content
   */
  content: z.string(),
});
