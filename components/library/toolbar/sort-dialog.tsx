import { SortDirection, SortOption } from '@/models/library-settings';

import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useLibraryFilters } from '@/hooks/useLibraryFilters';

export default function SortDialog() {
	const { librarySettings, updateSortOption, toggleSortDirection } = useLibraryFilters();

	return (
		<>
			<DialogHeader>
				<DialogTitle>Sort Options</DialogTitle>
				<DialogDescription>Configure your current sorting order.</DialogDescription>
			</DialogHeader>

			<div className="self-center flex flex-col w-full h-full items-start gap-2 p-4">
				<div className="flex gap-2 w-full items-center justify-between">
					<p>Sort By:</p>
					<Select defaultValue={librarySettings.sortOption} onValueChange={updateSortOption}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Title" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={SortOption.TITLE}>{SortOption.TITLE}</SelectItem>
							<SelectItem value={SortOption.AUTHOR}>{SortOption.AUTHOR}</SelectItem>
							<SelectItem value={SortOption.LAST_READ}>{SortOption.LAST_READ}</SelectItem>
							<SelectItem value={SortOption.RECENTLY_UPDATED}>{SortOption.RECENTLY_UPDATED}</SelectItem>
							<SelectItem value={SortOption.DATE_ADDED}>{SortOption.DATE_ADDED}</SelectItem>
							<SelectItem value={SortOption.PUBLICATION_DATE}>{SortOption.PUBLICATION_DATE}</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex gap-2 items-center w-full justify-between">
					<p>Sort Direction:</p>
					<Select defaultValue={librarySettings.sortDirection} onValueChange={() => toggleSortDirection()}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Descending" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={SortDirection.DESCENDING}>Descending</SelectItem>
							<SelectItem value={SortDirection.ASCENDING}>Ascending</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</>
	);
}
