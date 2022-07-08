import { z } from 'zod';

export const createPostSchema = z.object({
  videoUrl: z.string().url('Must be an URL'),
  title: z.string().min(10, 'Title is too short'),
  description: z.string(),
});
