// The LibrarySettings interface describes settings related to a library. It can include filters and sorting directives
export interface LibrarySettings {
	// Filter by the title of the book
	title: string;
	// Filter by the author of the book
	author: string;
	// Contains all the date filters
	dateFilters: Partial<
		Record<
			// The keys are type of dates that can be filtered
			| DateFilterOption.LAST_READ
			| DateFilterOption.RECENTLY_UPDATED
			| DateFilterOption.DATE_ADDED
			| DateFilterOption.PUBLICATION_DATE,
			// The value of each key is a DateFilter
			DateFilter
		>
	>;

	// Sorting options
	// Specifies the attribute to sort by
	sortOption: SortOption;
	// Specifies the direction of sort: ascending or descending
	sortDirection: SortDirection;
}

// DateFilter defines the possible formats for filtering dates
export type DateFilter = {
	// Only include entities before a specific date
	beforeDate?: Date;
	// Only include entities after a specific date
	afterDate?: Date;
	// Only include entities between two dates
	betweenDate?: { from?: Date; to?: Date };
};

// Enum for possible DateFilter types,
export enum DateFilterOption {
	LAST_READ = 'Last Read',
	RECENTLY_UPDATED = 'Recently Updated',
	DATE_ADDED = 'Date Added',
	PUBLICATION_DATE = 'Publication Date'
}

// Enum for possible sorting options
export enum SortOption {
	TITLE = 'Title',
	AUTHOR = 'Author',
	LAST_READ = 'Last Read',
	RECENTLY_UPDATED = 'Recently Updated',
	DATE_ADDED = 'Date Added',
	PUBLICATION_DATE = 'Publication Date'
}

// Enum for possible sort directions
export enum SortDirection {
	ASCENDING = 'asc',
	DESCENDING = 'desc'
}
