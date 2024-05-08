'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import {
	Menu,
	Settings,
	Palette,
	Search,
	List,
	Play,
	Columns2,
	ChevronsUpDown,
	Square,
	X,
	Home,
	ArrowLeft,
	ArrowRight,
	CircleHelp
} from 'lucide-react';

import { Button } from '../ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet"

import ThemeSwitch from '../shared/theme-switch';
import { Novel } from '@/models/novel/novel';
import useReaderStore from '@/store/useReaderStore';
import { toPercentage } from '@/lib/utils';
import ReaderMenuSidebar from './reader-menu-sidebar';
import ReaderMenuBookmark from './reader-menu-bookmark';


const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.085
		}
	},
	exit: { opacity: 0 }
};

const itemVariants = {
	hidden: { opacity: 0, y: 50, x: 15 },
	visible: {
		opacity: 1,
		y: 0,
		x: 0,
		transition: { duration: 0.35, ease: [0.175, 0.885, 0.32, 1.175] }
	},
	exit: {
		opacity: 0,
		y: 50,
		x: 15,
		transition: { duration: 0.25 }
	}
};

function ReaderMenu({ novel }: { novel: Novel }) {
	const { currentLocation, prevSection, nextSection, getPageNumber } = useReaderStore();
	const [showMenu, setShowMenu] = useState(false);
	const [sheetOpened, setSheetOpened] = useState(false);
	const router = useRouter();

	// TODO: Convert below to custom hook:
	const [viewMode, setViewMode] = useState('infinite');
	const [autoplay, setAutoplay] = useState(false);

	// If a sheet is opened, and then closed, the menu should also be closed.
	useEffect(() => {
    let handleVisibilityChange = () => {
      if (!sheetOpened) {
        setShowMenu(false);
      }
    };

    handleVisibilityChange();
  }, [sheetOpened]);

	return (
		<div className="fixed bottom-4 right-4 z-10">
			<div className="p-2 w-full h-full flex items-center justify-center gap-4">
				<div className='select-none'>{getPageNumber()}</div>
				{!showMenu && (
					<>
						<Button
							variant="outline"
							onClick={() => prevSection()}
							className="flex w-full h-14 rounded-2xl bg-background hover:bg-muted hover:pointer-cursor">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Previous
						</Button>

						<Button
							variant="outline"
							onClick={() => nextSection()}
							className="flex w-full h-14 rounded-2xl bg-background hover:bg-muted hover:pointer-cursor">
							Next
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							onClick={() => setShowMenu(!showMenu)}
							className="aspect-square w-full h-full rounded-2xl bg-background hover:bg-muted hover:pointer-cursor">
							<Menu />
						</Button>
					</>
				)}

				<AnimatePresence>
					{showMenu && (
						<motion.div
							className='fixed right-2 bottom-2 select-none'
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={containerVariants}>
							<Sheet onOpenChange={(open) => setSheetOpened(open)}>
								<SheetTrigger>
									<motion.div variants={itemVariants} onClick={() => console.log("Clicked contents")}>
										<div className="relative w-[15rem] h-[3rem] rounded-xl bg-muted m-4 py-2 px-4 flex items-center justify-between hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
											{/* <div className="absolute top-0 left-0 h-full bg-zinc-200 dark:bg-zinc-500 rounded-xl" style={{ width: `${toPercentage(currentLocation?.end.percentage)}%` }} /> */}
											<motion.div
												className="absolute top-0 left-0 h-full bg-zinc-200 dark:bg-zinc-500 rounded-xl"
												initial={{ width: '0%' }}
												animate={{ width: `${toPercentage(currentLocation?.end.percentage)}%` }}
												transition={{ duration: 0.2, ease: [0, 0, 0, 1.01] }}
											/>
											<div className="relative z-10 flex justify-between w-full">
												<span>Contents</span>
												<span>{toPercentage(currentLocation?.end.percentage)}%</span>
												<List />
											</div>
										</div>
									</motion.div>
								</SheetTrigger>
								<SheetContent hideX>
									<SheetHeader>
										<ReaderMenuSidebar novel={novel} />
									</SheetHeader>
								</SheetContent>
							</Sheet>

							<motion.div variants={itemVariants}>
								<div className="w-[15rem] h-[3rem] rounded-xl bg-muted m-4 mt-0 py-2 px-4 flex items-center justify-between hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
									<span>Search</span>
									<Search />
								</div>
							</motion.div>
							<motion.div variants={itemVariants}>
								<div className="w-[15rem] h-40 rounded-xl m-4 grid grid-cols-3 grid-rows-3 gap-2 items-center">
									<ReaderMenuBookmark currentLocation={currentLocation} novelId={novel.id} />
									<div
										onClick={() => setAutoplay(!autoplay)}
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										{autoplay ? (
											<Square />
										) : (
											<Play />
										)}
									</div>
									<div
										onClick={() => setViewMode(viewMode === 'infinite' ? 'paginated' : 'infinite')}
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										{viewMode === 'infinite' ? (
											<Columns2 />
										) : (
											<ChevronsUpDown />
										)}
									</div>
									<div className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										<Palette />
									</div>
									<div className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										<ThemeSwitch />
									</div>
									<div className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										<Settings />
									</div>
									<div
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										<CircleHelp />
									</div>
									<div
										onClick={() => router.push(`/library/${novel.id}`)}
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										{/* TODO: Add Alert dialog to go back to home */}
										<Home />
									</div>
									<div
										onClick={() => setShowMenu(false)}
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors">
										<X />
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default ReaderMenu;