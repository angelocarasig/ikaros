'use client'

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/actions/supabase/auth';

import { cn } from '@/lib/utils';
import { Novel } from '@/models/novel/novel';
import { useNovels } from '@/store/useNovelStore';
import { useUser } from '@/hooks/useUser';

import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import {
	DropdownMenu, 
	DropdownMenuContent, 
	DropdownMenuGroup, DropdownMenuItem, 
	DropdownMenuLabel, 
	DropdownMenuSeparator, 
	DropdownMenuTrigger
} from '../ui/dropdown-menu';
import {
	NavigationMenu, 
	NavigationMenuContent, 
	NavigationMenuItem, 
	NavigationMenuLink,
	NavigationMenuList, 
	NavigationMenuTrigger, 
	navigationMenuTriggerStyle
} from '../ui/navigation-menu';
import ThemeSwitch from './theme-switch';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"

const NavbarWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex flex-row items-center justify-between w-full h-fit p-2 border-b z-10 bg-background select-none'>
			{children}
		</div>
	)
}

export default function Navbar() {
	const router = useRouter();
	const { novels } = useNovels();

	const { user, setUser, loading } = useUser();

	const RecentNovelSection = ({ novel }: { novel: Novel | null }) => {
		const novelTitle = novel == null ? 'No novels available.' : novel.title;
		const novelHref = novel == null ? '/' : `/library/${novel.id}`;
		return (
			<NavigationMenuLink className='relative'>
				{novel != null && novel.cover_url != null ? (
					<Image
						src={novel.cover_url}
						alt="novel cover"
						className="select-none h-full w-min object-cover rounded data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 border-solid cursor-pointer brightness-[0.25] blur-[1.5px]"
						width={300}
						height={400}
						loading="eager"
						data-loaded="false"
						onLoad={event => {
							event.currentTarget.setAttribute('data-loaded', 'true');
						}}
						onClick={() => router.push(novelHref)}
					/>
				) : (
					<Skeleton className='aspect-[11/16] w-full h-full p-2 cursor-pointer' onClick={() => router.push(novelHref)}/>
				)}
				<div className="pointer-events-none absolute bottom-0 left-2 mb-2 mt-2 text-lg font-normal w-auto">
					{novel != null ? (
						<>Continue Reading</>
					) : (
						<>Nothing Available!</>
					)}

					<p className="text-sm leading-tight text-muted-foreground">
						{novelTitle}
					</p>
				</div>
			</NavigationMenuLink>
		)
	}

	return (
		<NavbarWrapper>
			<NavigationMenu>
				<NavigationMenuList className='w-full flex justify-between'>

					{/* Home */}
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					{/* Dashboard */}
					<NavigationMenuItem>
						<Link href="/dashboard" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Dashboard
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					{/* Library */}
					<NavigationMenuItem>
						<NavigationMenuTrigger>Library</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-2 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<RecentNovelSection novel={novels.length > 0 ? novels.reduce((prev, curr) => new Date(prev.created_at) > new Date(curr.created_at) ? prev : curr) : null} />
								</li>
								<ListItem href="/library" title="All">
									Your Entire Library.
								</ListItem>
								<ListItem href="/library" title="Light Novels">
									View the light novels section of your library.
								</ListItem>
								<ListItem href="/library" title="Web Novels">
									View the web novels section of your library.
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<div className='flex gap-2'>
				{/* Theme Switch */}
				<NavigationMenuItem className='flex items-center'>
					<Button variant="ghost" className="rounded-md h-10 w-10 p-0">
						<ThemeSwitch />
					</Button>
				</NavigationMenuItem>

				{user != null && !loading ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-md"
							>
								<CircleUserRound />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-64">
							<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuLabel className='flex w-full justify-center'>Statistics</DropdownMenuLabel>
								<DropdownMenuLabel className='font-normal'>Enter</DropdownMenuLabel>
								<DropdownMenuLabel className='font-normal'>Statistics</DropdownMenuLabel>
								<DropdownMenuLabel className='font-normal'>Here ?</DropdownMenuLabel>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='hover:cursor-pointer'>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='hover:cursor-pointer' onClick={async () => {
								await logout()
									.then(() => setUser(null))
									.finally(() => toast.info("You Have Been Logged Out."));
							}}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<>
						{loading ? (
							// Empty looks fine but skeleton if changed mind later on again
							//<Skeleton className='w-10 asepct-square' />
							<></>
						) : (
							<Button asChild>
								<Link href="/login">
									Log In
								</Link>
							</Button>
						)}
					</>

				)
				}
			</div >
		</NavbarWrapper >
	)
}
