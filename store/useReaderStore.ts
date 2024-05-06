import { create } from 'zustand';
import { Book, Location, Rendition } from 'epubjs';
import { ToCItem } from '@/models/reader/toc-item';

interface ReaderState {
	book: Book | null;
	rendition: Rendition | null;
	locations: Array<string>;
	currentLocation: Location | null;
	tableOfContents: ToCItem[];
	setBook: (book: Book | null) => void;
	setRendition: (rendition: Rendition | null) => void;
	setLocations: (locations: Array<string>) => void;
	setCurrentLocation: (location: Location | null) => void;
	setTableOfContents: (toc: ToCItem[]) => void;
	jumpToSection: (href: string) => void;
	nextSection: () => void;
	prevSection: () => void;
	getPageNumber: () => string;
}

const useReaderStore = create<ReaderState>((set, get) => ({
	book: null,
	rendition: null,
	locations: [],
	currentLocation: null,
	tableOfContents: [],

	setBook: (book: Book | null) => set({ book }),
	setRendition: (rendition: Rendition | null) => set({ rendition }),
	setLocations: (locations: Array<string>) => set({ locations }),
	setCurrentLocation: (location: Location | null) => set({ currentLocation: location }),
	setTableOfContents: (toc: Array<ToCItem>) => set({ tableOfContents: toc }),

	jumpToSection: (href: string) => {
		const { rendition } = get();
		if (rendition) {
			rendition.display(href);
		}
	},

	nextSection: () => {
		const { rendition } = get();
		if (rendition == null) return;

		rendition.next();
	},

	prevSection: () => {
		console.log('called prev');
		const { rendition, currentLocation, book } = get();
		if (rendition == null || currentLocation == null || book == null) return;

		const newLocationIndex = currentLocation.start.index - 1 || 0;
		const location = book.packaging.spine.find((value) => value.index === newLocationIndex) as any;
		console.log('New Location: ', location);
		if (location) {
			rendition.display(location.href);
		}
	},

	getPageNumber: () => {
		const { currentLocation, locations } = get();
		if (locations.length <= 0 || currentLocation == null) {
			return "0/0";
		}

		return `${currentLocation.end.location}/${locations.length}`;
	}
}));

export default useReaderStore;