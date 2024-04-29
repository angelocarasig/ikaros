'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { LoginForm, LoginSchema } from '@/schemas/login.schema';
import { login } from '@/actions/supabase/auth';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const form = useForm<LoginForm>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (values: LoginForm) => {
		setLoading(true);
		await login(values)
			.then((res) => setErrorMessage(res))
			.catch((res) => setErrorMessage(res))
			.finally(() => setLoading(false));
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card className="p-4 max-w-sm">
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>Enter your email below to login to your account.</CardDescription>
						</CardHeader>

						<CardContent className="grid gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="email@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex flex-col">
							{errorMessage !== '' && (
								<small className="text-sm font-medium text-left leading-none mb-2 text-destructive">{errorMessage}</small>
							)}
							<Button className="w-full" type="submit" disabled={loading}>
								{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								Sign in
							</Button>
							<Button variant="link" asChild>
								<Link href="/register">Don&apos;t have an account? Sign Up</Link>
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
}
