import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Search, CircleUser } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem
} from '../ui/dropdown-menu';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
	SheetHeader
} from '../ui/sheet';

import ThemeSwitch from './theme-switch';
import { createClient } from '@/lib/supabase/server';
import { logout } from '@/actions/supabase/auth';

const NAVBAR_ROUTES = [
	{ title: 'Home', href: '/' },
	{ title: 'Dashboard', href: '/dashboard' },
	{ title: 'Library', href: '/library' },
];

export default async function Navbar() {
	const supabase = createClient();
	const { user } = (await supabase.auth.getUser()).data;

	const handleLogin = async () => {
		"use server"
		redirect('/login');
	}

	const handleLogout = async () => {
		"use server"
		console.log("Singing out navbar");
		await logout();
	}

	// console.log("Current Session: ", user);

	return (
		<header className="top-0 flex h-16 items-center border-b gap-4 bg-background px-4 md:px-6 z-100">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				{NAVBAR_ROUTES.map((navbarRoute, index) => (
					<Link
						href={navbarRoute.href}
						className="text-muted-foreground transition-colors hover:text-foreground"
						key={index}>
						{navbarRoute.title}
					</Link>
				))}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="shrink-0 md:hidden">
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader className="flex flex-row gap-2 items-center">
						<SheetTitle className="!mt-0">
							<Link href="/">Elythios</Link>
						</SheetTitle>
					</SheetHeader>
					<nav className="pt-4 pl-4 grid gap-6 text-lg font-medium">
						{NAVBAR_ROUTES.map((navbarRoute, index) => (
							<Link
								href={navbarRoute.href}
								className="text-muted-foreground hover:text-foreground"
								key={index}>
								{navbarRoute.title}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>

			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search"
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>

				<ThemeSwitch />

				{user != null ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<form action={handleLogout}>
									<button type="submit">Log Out</button>
								</form>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<form action={handleLogin}>
						<Button type="submit">Log In</Button>
					</form>
				)}
			</div>
		</header>
	);
}
