import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<p>Registering is currently unavailable.</p>
		</div>
	)

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<Card className="p-4 max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email" className="select-none">
								Email
							</Label>
							<Input id="email" type="email" placeholder="m@example.com" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirm_email" className="select-none">
								Confirm Email
							</Label>
							<Input id="confirm_email" type="email" placeholder="m@example.com" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password" className="select-none">
								Password
							</Label>
							<Input id="password" type="password" placeholder="Password" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirm_password" className="select-none">
								Confirm Password
							</Label>
							<Input id="confirm_password" type="password" />
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col mt-2">
					<Button type="submit" className="w-full select-none" disabled>
						Create an account
					</Button>
					<Button variant="link" className="select-none" asChild>
						<Link href="/login">Already have an account? Log In</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
