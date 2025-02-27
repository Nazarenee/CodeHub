import { z } from "zod";

const schema = z.object({
  email: z.string().min(5),
  password: z.string().min(5),
});

export default schema;
