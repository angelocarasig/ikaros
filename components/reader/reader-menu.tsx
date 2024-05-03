'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Menu, Settings, Palette, Search, List, Bookmark, Play, Columns2, ChevronsUpDown, Square } from 'lucide-react';

import { Button } from '../ui/button';

import useOutsideClick from '@/hooks/useOutsideClick';
import ThemeSwitch from '../shared/theme-switch';

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

function ReaderMenu() {
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef(null);

	// TODO: Convert below to custom hook:
	const [viewMode, setViewMode] = useState('infinite');
	const [autoplay, setAutoplay] = useState(false);

	useOutsideClick(menuRef, () => setShowMenu(false));

	const chapterProgress = Math.floor(Math.random() * 101);

	return (
		<div className="fixed bottom-4 right-4 z-10">
			<div className="p-2 w-full h-full flex items-start justify-center">
        {!showMenu && (
          <Button
            variant="outline"
            onClick={() => setShowMenu(!showMenu)}
						className="aspect-square w-full h-full rounded-2xl bg-background hover:bg-muted hover:pointer-cursor">
            <Menu />
          </Button>
        )}

				<AnimatePresence>
					{showMenu && (
						<motion.div
              className='fixed right-2 bottom-4 select-none'
							ref={menuRef}
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={containerVariants}>
							<motion.div variants={itemVariants}>
								<div className="relative w-[15rem] h-[3rem] rounded-xl bg-muted m-4 py-2 px-4 flex items-center justify-between hover:cursor-pointer hover:bg-zinc-700 transition-colors">
								<div className="absolute top-0 left-0 h-full bg-muted-foreground rounded-xl" style={{ width: `${chapterProgress}%` }} />
								<div className="relative z-10 flex justify-between w-full">
									<span>Contents</span>
									<span>{chapterProgress}%</span>
									<List />
								</div>
								</div>
							</motion.div>
							<motion.div variants={itemVariants}>
								<div className="w-[15rem] h-[3rem] rounded-xl bg-muted m-4 py-2 px-4 flex items-center justify-between hover:cursor-pointer hover:bg-zinc-700 transition-colors">
									<span>Search</span>
                  <Search />
								</div>
							</motion.div>
							<motion.div variants={itemVariants}>
								<div className="w-[15rem] h-[6rem] rounded-xl m-4 grid grid-cols-3 grid-rows-2 gap-2 items-center">
									<div 
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
                    <Bookmark />
                  </div>
									<div 
										onClick={() => setAutoplay(!autoplay)} 
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
										{autoplay ? (
											<Square />
										) : (
											<Play />
										)}
									</div>
									<div 
										onClick={() => setViewMode(viewMode === 'infinite' ? 'paginated' : 'infinite')} 
										className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
                    { viewMode === 'infinite' ? (
											<Columns2 />
										) : (
											<ChevronsUpDown />
										)}
                  </div>
									<div className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
                    <Palette />
                  </div>
									<div className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
										<ThemeSwitch  />
                  </div>
									<div className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
                    <Settings />
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
