'use client';

import { useEffect } from 'react';
import { EllipsisVertical, Filter, SortAsc, SortDesc } from 'lucide-react';

import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

import FilterDialog from './filter-dialog';
import SortDialog from './sort-dialog';
import UploadDialog from './upload-dialog';

import { useLibraryFilters } from '@/hooks/useLibraryFilters';
import { Badge } from '@/components/ui/badge';
import { SortDirection } from '@/models/library/library-settings';

function Toolbar() {
	const { librarySettings, getSettingCount } = useLibraryFilters();

	useEffect(() => {
		console.log("Current Library Settings: ", librarySettings);
	}, [librarySettings]);

	return (
		<div className="flex flex-wrap w-full h-full gap-2 justify-between p-4 pb-0">
			<div id="left-side" className="flex flex-wrap gap-2">
				<Dialog>
					<DialogTrigger asChild>
            <Button variant="secondary" className="relative w-[6rem] flex gap-2">
              <Filter className="mr-2 h-4 w-4"/>
              <span>Filter</span>
              {getSettingCount() > 0 && (<Badge className="bg-red-500 absolute right-[-10%] -top-1/4 rounded-full select-none pointer-events-none">{getSettingCount()}</Badge>)}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <FilterDialog/>
          </DialogContent>
        </Dialog>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant="secondary" className="w-[6rem]">
							{librarySettings.sortDirection === SortDirection.DESCENDING ? (
								<SortDesc className="mr-2 h-4 w-4" />
							) : (
								<SortAsc className="mr-2 h-4 w-4" />
							)}
							Sort
						</Button>
					</DialogTrigger>
					<DialogContent>
						<SortDialog />
					</DialogContent>
				</Dialog>

				{/* TODO: Ellipsis idk what to put here tbh */}
				{/* <Popover>
					<PopoverTrigger asChild>
						<Button variant="secondary" className="" size="icon">
							<EllipsisVertical />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-40 h-20">
						<div className="grid gap-4">
						</div>
					</PopoverContent>
				</Popover> */}
			</div>

			<div id="right-side">
				<UploadDialog />
			</div>
		</div>
	);
}

export default Toolbar;
