import { MutableRefObject, useEffect, useState } from 'react';

import { Book, Rendition } from 'epubjs';

import { defaultPaginatedSettings, defaultScrollSettings } from '@/models/reader/reader-settings';
import { defaultReaderTheme } from '@/models/reader/reader-themes';
import { DisplayedLocation, Location } from 'epubjs/types/rendition';

export default function useRendition(book: Book, readerRef: MutableRefObject<HTMLElement>) {
	const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
	const [rendition, setRendition] = useState<Rendition | null>(null);

	useEffect(() => {
		let isActive = true;

		const setupRendition = async () => {
			try {
				await book.ready;
				if (!isActive) return;

				// Init
				const createdRendition = book.renderTo(readerRef.current, defaultScrollSettings);

				// Apply themes
				createdRendition.themes.register(defaultReaderTheme.key, defaultReaderTheme.content);
				createdRendition.themes.select(defaultReaderTheme.key);

				
				createdRendition.on('relocated', (val: Location) => {
					console.table(val);
					console.log(createdRendition.settings);
					setCurrentLocation(val);
					// createdRendition.display(val.cfi)
				});

				// createdRendition.on('locationChanged', (val: any) => console.table(val));

				// Display
				createdRendition.display();
				setRendition(createdRendition);

				return () => createdRendition.destroy();
			} catch (error) {
				console.error('Failed to setup the book rendition:', error);
			}
		};

		setupRendition();

		return () => {
			isActive = false;
		};
	}, [book, readerRef]);

	const jumpToSection = (href: string) => {
		if (rendition == null) return;

		rendition.display(href);
	}

	const nextSection = () => {
		if (rendition == null) return;

		rendition!.next();
	}

	const prevSection = () => {
		if (rendition == null) return;

		const newLocationIndex = currentLocation!.start.index - 1 || 0;
		const location = book.packaging.spine.find(value => value.index === newLocationIndex)! as any;

		rendition!.display(location.href);
	}

	return { rendition, jumpToSection, nextSection, prevSection };
}
