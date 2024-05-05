import { create } from 'zustand';
import { Book, Location, Rendition } from 'epubjs';
import { ToCItem } from '@/models/reader/toc-item';

interface ReaderState {
	book: Book | null;
	rendition: Rendition | null;
	currentLocation: Location | null;
	tableOfContents: ToCItem[];
	setBook: (book: Book | null) => void;
	setRendition: (rendition: Rendition | null) => void;
	setCurrentLocation: (location: Location | null) => void;
	setTableOfContents: (toc: ToCItem[]) => void;
	jumpToSection: (href: string) => void;
	nextSection: () => void;
	prevSection: () => void;
}

const useReaderStore = create<ReaderState>((set, get) => ({
	book: null,
	rendition: null,
	currentLocation: null,
	tableOfContents: [],

	setBook: (book) => set({ book }),
	setRendition: (rendition) => set({ rendition }),
	setCurrentLocation: (location) => set({ currentLocation: location }),
	setTableOfContents: (toc) => set({ tableOfContents: toc }),

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
	}
}));

export default useReaderStore;