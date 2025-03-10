import { z } from "zod";

const postRegister = z.object({
  title: z.string().min(1, "Title is required"),
  language: z.string().min(1, "Language is required"),
  text: z.string().min(1, "Text is required"),
  image_url: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL",
    })
    .optional(),
});

export default postRegister;
