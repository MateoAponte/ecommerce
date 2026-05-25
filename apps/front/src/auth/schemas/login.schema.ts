import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(12, 'Password must be at least 12 characters'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, 'Name is required'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
