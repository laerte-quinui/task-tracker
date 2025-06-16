import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Please, write a title').max(255),
  description: z.string().min(1, 'Please, write a description').max(65535),
  status: z.string(),
  deadline: z.date(),
})

export const patchTaskSchema = z.object({
  title: z.string().min(1, 'Please, write a title').max(255).optional(),
  description: z.string().min(1, 'Please, write a description').optional(),
  status: z.string().optional(),
  deadline: z.date().optional(),
})
