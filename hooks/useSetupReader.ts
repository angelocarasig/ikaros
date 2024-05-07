import { MutableRefObject, useEffect, useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';

import { Book, Location } from 'epubjs';

import { ToCItem } from '@/models/reader/toc-item';

import { defaultReaderTheme } from '@/models/reader/reader-themes';
import { defaultScrollSettings } from '@/models/reader/reader-settings';
import useReaderStore from '@/store/useReaderStore';
import useBookmarkStore from '@/store/useBookmarksStore';

export function useSetupReader(currentBook: Book, readerRef: MutableRefObject<HTMLElement>) {
	const { resolvedTheme } = useTheme();
	const { book, rendition, setBook, setRendition, setLocations, setCurrentLocation, setTableOfContents } = useReaderStore();
	const { bookmarks, loading, mostRecentBookmark } = useBookmarkStore();

	/**
	 * NOTE: To make this file easier to read, collapse setupRendition and setupTableOfContents
	 */

	/**
	 * TODO: On exit with autosave, also update last read property of a novel.
	 * The total percentage of the novel should be the highest value of the highest bookmark?
	 * OR: Start implementing novel status alongside groups
	 */

	// Handle renditions
	useLayoutEffect(() => {
		let isActive = true;

		if (rendition != null) {
			rendition.destroy();
			setRendition(null);
		}

		const setupRendition = async () => {
			try {
				setBook(currentBook);

				await currentBook.ready;
				if (!isActive || loading) return;

				// Init
				const createdRendition = currentBook.renderTo(readerRef.current, defaultScrollSettings);
				const locations = await currentBook.locations.generate(1000); // Maybe good to use localstorage here
				console.log("Locations: ", locations);
				setLocations(locations);

				// Apply themes
				createdRendition.themes.register(defaultReaderTheme.key, defaultReaderTheme.content);
				createdRendition.themes.select(defaultReaderTheme.key);

				// Handle current location
				createdRendition.on('relocated', (location: Location) => {
					console.log(createdRendition.settings);
					setCurrentLocation(location);
					console.log("Current Location: ", location);
					
				});

				// Display
				if (bookmarks.length > 0) {
					createdRendition.display(mostRecentBookmark()?.epubcfi);
				}
				else {
					createdRendition.display();
				}

				setRendition(createdRendition);

				return () => createdRendition.destroy();
			} catch (error) {
				console.error('Failed to setup the book rendition:', error);
			}
		};

		const setupTableOfContents = async () => {
			try {
				await currentBook.ready;
				if (!isActive) return;

				// Always use HREFs from book.packaging.spine so we can also get cfiBase
				const currentToC: Array<ToCItem> = currentBook.navigation.toc.map((tocItem) => {
					const spineItem = currentBook.packaging.spine.find((spine: any) =>
						spine.href.includes(tocItem.href.replace('../', ''))
					);
					return {
						...tocItem,
						href: tocItem.href.replace('../', ''),
						...spineItem
					} as unknown as ToCItem;
				});
				console.log('Current ToC: ', currentToC);

				setTableOfContents(currentToC);
			} catch (error) {
				console.error('Failed to setup the book rendition:', error);
			}
		};

		setupRendition();
		setupTableOfContents();

		return () => {
			isActive = false;
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [book, readerRef, loading]); // If book or the ref changes retrigger rendition

	// Handle themes
	useEffect(() => {
		if (rendition == null) return;

		console.log(`Updating rendition theme to ${resolvedTheme})`);
		switch (resolvedTheme) {
			case 'dark': {
				rendition!.themes.override('color', '#FAFAFA');
				rendition!.themes.override('background', '#09090B');
				break;
			}
			case 'light': {
				rendition!.themes.override('color', '#18181B');
				rendition!.themes.override('background', '#FFFFFF');
				break;
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rendition, resolvedTheme]);
}
