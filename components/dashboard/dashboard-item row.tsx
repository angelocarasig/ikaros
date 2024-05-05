'use client';

import React from 'react';

import { Novel } from '@/models/novel/novel';

import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import NovelCard from '../shared/novel-card';

export default function DashboardItemRow({ itemTitle, novels }: { itemTitle: string, novels: Array<Novel> }) {

	return (
		<div className="relative flex flex-col w-full h-fit mt-8 md:mt-12 lg:mt-16 select-none">
			<h1 className="text-2xl font-semibold lg:text-4xl md:text-3xl pl-6 md:pb-2">{itemTitle}</h1>
			<ScrollArea className="w-full rounded-md px-2">
				<div className="flex w-max space-x-4 p-4">
					{novels.map((item, index) => (
						<NovelCard
              novel={item}
              imageProps="h-[10rem] md:h-[14rem] lg:h-[18rem]"
              captionProps="w-[6.4rem] md:w-[9.7rem] lg:w-[12.5rem]"
              key={index} />
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>	
			<div id="fade" className='absolute pointer-events-none w-full h-full bg-gradient-to-r from-transparent from-90% to-background' />
		</div>
	);
}
