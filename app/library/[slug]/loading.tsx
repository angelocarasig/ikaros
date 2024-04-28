import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  // TODO: Fix this skeleton
	return (
		<div className="w-full min-h-[90vh]">
			<div className="relative w-full h-[40vh] z-[-1]">
				<div className="absolute w-[100%] h-[101%] from-zinc-800/25">
					<div className="absolute -bottom-12 left-8 flex items-end gap-2 w-[90%] h-min">
						<Skeleton className="aspect-[11/16] h-[14rem] z-10" />
						<Skeleton className="flex flex-col self-stretch w-full p-2 pb-0 z-10" />
					</div>
				</div>
			</div>
      <div id="separator" className='w-full h-[3rem]'></div>

      <div className='w-full h-full p-4 mt-4 flex flex-col sm:flex-row gap-4'>
				<Skeleton className='rounded-lg w-full min-w-[20rem] min-h-[50vh] sm:w-[20rem] h-min p-2' />
				<Skeleton className='rounded-lg grow bg-slate-200 dark:bg-zinc-900 p-2 min-h-[50vh]'/>
      </div>
		</div>
	);
}

export default Loading;
