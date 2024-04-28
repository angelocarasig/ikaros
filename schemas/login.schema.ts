import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export type LoginForm = z.infer<typeof LoginSchema>;
