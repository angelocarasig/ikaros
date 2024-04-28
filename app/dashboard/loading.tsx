import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Loading() {
	return (
		<div className="relative w-full h-screen pb-8">
			<div className="relative w-full h-[35vh] md:h-[60vh] select-none">
				<div className="absolute bottom-8 left-8 flex items-end gap-2 w-[90%] h-min">
					<Skeleton
						id="novelCover"
						className="aspect-[11/16] h-[12rem] md:h-[18rem] lg:h-[20rem] transition ease-in-out z-10 bg-cover bg-center"
					/>
					<Skeleton className="flex flex-col w-full self-stretch md:p-4 text-white"></Skeleton>
				</div>
			</div>
			<div className="relative p-8 flex flex-col w-full h-fit mt-8 md:mt-12 lg:mt-16 select-none">
				<div className='w-full h-[10rem] md:h-[14rem] lg:h-[18rem]'>
					<Skeleton className="w-full h-full rounded-md px-2" />
				</div>

				<div className='mt-8 w-full h-[10rem] md:h-[14rem] lg:h-[18rem]'>
					<Skeleton className="w-full h-full rounded-md px-2" />
				</div>

				<div className='mt-8 w-full h-[10rem] md:h-[14rem] lg:h-[18rem]'>
					<Skeleton className="w-full h-full rounded-md px-2" />
				</div>
			</div>
		</div>
	);
}

export default Loading;
