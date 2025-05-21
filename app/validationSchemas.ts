import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, 'Please, write a title').max(255),
  description: z.string().min(1, 'Please, write a description')
});
