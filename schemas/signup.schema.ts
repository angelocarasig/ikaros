import { z } from 'zod';

const SignupSchema = z
	.object({
		email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
		confirmEmail: z
			.string()
			.min(1, { message: 'Confirmation email is required' })
			.email('Invalid email address'),
		password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z.string().min(6, { message: 'Confirmation password is required' })
	})
	.refine((data) => data.email === data.confirmEmail, {
		message: 'Emails must match',
		path: ['confirmEmail']
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword']
	});

export type SignupForm = z.infer<typeof SignupSchema>;
