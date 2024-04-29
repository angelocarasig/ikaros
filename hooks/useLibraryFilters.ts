// Despite relying on using the defined zustand store, placed here since logic is big
import { useEffect, useState } from 'react';

import {
	DateFilterOption,
	LibrarySettings,
	SortDirection,
	SortOption
} from '@/models/library-settings';
import { Novel } from '@/models/novel';
import { useLibrarySettingsStore } from '@/store/useLibrarySettingsStore';

function filterAndSort(novels: Array<Novel>, settings: LibrarySettings): Array<Novel> {
	/* String-based filters */
	let filtered = novels.filter((novel) => {
		const titleMatch = novel.title.toLowerCase().includes(settings.title.toLowerCase());
		const authorMatch = novel.author.toLowerCase().includes(settings.author.toLowerCase());
		return titleMatch && authorMatch;
	});

	/* Date filters */
	Object.entries(settings.dateFilters).forEach(([key, filter]) => {
		if (filter) {
			filtered = filtered.filter((novel) => {
				let dateToCompare: Date | undefined;
				switch (key as DateFilterOption) {
					case DateFilterOption.LAST_READ:
						// TODO
						break;
					case DateFilterOption.RECENTLY_UPDATED:
						dateToCompare = new Date(novel.updated_at);
						break;
					case DateFilterOption.DATE_ADDED:
						dateToCompare = new Date(novel.created_at);
						break;
					case DateFilterOption.PUBLICATION_DATE:
						const publicationEvent = novel.metadata.dates.find((d) => d.event === 'publication');
						dateToCompare = publicationEvent ? new Date(publicationEvent.date) : undefined;
						break;
				}
				if (!dateToCompare) return false;
				if (filter.beforeDate && dateToCompare > filter.beforeDate) return false;
				if (filter.afterDate && dateToCompare < filter.afterDate) return false;
				if (
					filter.betweenDate &&
					(dateToCompare < filter.betweenDate.from! || dateToCompare > filter?.betweenDate.to!)
				) {
					return false;
				}
				return true;
			});
		}
	});

	/* Sorting function */
	filtered.sort((a, b) => {
		let sortValue = 0;
		switch (settings.sortOption) {
			case SortOption.TITLE:
				sortValue = a.title.localeCompare(b.title);
				break;
			case SortOption.AUTHOR:
				sortValue = a.author.localeCompare(b.author);
				break;
			case SortOption.LAST_READ:
				// TODO
				break;
			case SortOption.RECENTLY_UPDATED:
				sortValue = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
				break;
			case SortOption.DATE_ADDED:
				sortValue = new Date(a.created_at).getTime() - new Date(b.updated_at).getTime();
				break;
			case SortOption.PUBLICATION_DATE:
				const pubDateA = a.metadata.dates.find((d) => d.event === 'Publication')?.date;
				const pubDateB = b.metadata.dates.find((d) => d.event === 'Publication')?.date;
				sortValue = pubDateA?.getTime()! - pubDateB?.getTime()!;
				break;
		}
		return settings.sortDirection === SortDirection.DESCENDING ? sortValue : -sortValue;
	});

	return filtered;
}

export function useLibraryFilters(novels?: Array<Novel>) {
	const librarySettings = useLibrarySettingsStore((state) => state.settings);
  const getSettingCount = useLibrarySettingsStore((state) => state.getSettingCount);
	const updateTitle = useLibrarySettingsStore((state) => state.updateTitle);
	const updateAuthor = useLibrarySettingsStore((state) => state.updateAuthor);
	const flushSettings = useLibrarySettingsStore((state) => state.flushSettings);
	const updateDateFilter = useLibrarySettingsStore((state) => state.updateDateFilter);
	const updateSortOption = useLibrarySettingsStore((state) => state.updateSortOption);
	const toggleSortDirection = useLibrarySettingsStore((state) => state.toggleSortDirection);

	const [filteredNovels, setFilteredNovels] = useState<Array<Novel>>([]);

	/* Watchers to trigger filtering and sorting whenever novels or settings change */
	useEffect(() => {
		if (novels != null) {
			const filteredAndSorted = filterAndSort(novels, librarySettings);
			setFilteredNovels(filteredAndSorted);
		}
	}, [novels, librarySettings]);

	return {
		filteredNovels,
		getSettingCount,
		librarySettings,
		updateTitle,
		updateAuthor,
		flushSettings,
		updateDateFilter,
		updateSortOption,
		toggleSortDirection
	};
}
