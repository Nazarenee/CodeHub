import { z } from "zod";

const postSchema = z.object({
  userId: z.string(),
  language: z.string(),
  title: z.string(),
  text: z.string(),
  image_url: z.string().optional(),
});

export default postSchema;
