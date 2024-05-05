'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

import ArtworkTab from './artwork-tab';
import BookmarksTab from './bookmarks-tab';
import OverviewTab from './overview-tab';
import useTabHandler from '@/hooks/useTabHandler';

import { Novel } from '@/models/novel/novel';

enum libraryTabItems {
	OVERVIEW = 'Overview',
	BOOKMARKS = 'Bookmarks',
	ARTWORK = 'Artwork'
}

const libraryTabs = [libraryTabItems.OVERVIEW, libraryTabItems.BOOKMARKS, libraryTabItems.ARTWORK];

function LibraryItemTabs({ novel }: { novel: Novel }) {
	const { currentTab, onTabChange } = useTabHandler(libraryTabItems.OVERVIEW, libraryTabs);

	return (
		<Tabs className="w-full" defaultValue={libraryTabItems.OVERVIEW} onValueChange={onTabChange}>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value={libraryTabItems.OVERVIEW}>{libraryTabItems.OVERVIEW}</TabsTrigger>
				<TabsTrigger value={libraryTabItems.BOOKMARKS}>{libraryTabItems.BOOKMARKS}</TabsTrigger>
				<TabsTrigger value={libraryTabItems.ARTWORK}>{libraryTabItems.ARTWORK}</TabsTrigger>
			</TabsList>

			{/* Lazy load so that artwork does not cause giga slowdown */}
			<TabsContent value={libraryTabItems.OVERVIEW}>
				{currentTab === libraryTabItems.OVERVIEW && <OverviewTab novel={novel} />}
			</TabsContent>

			<TabsContent value={libraryTabItems.BOOKMARKS}>
				{currentTab === libraryTabItems.BOOKMARKS && <BookmarksTab novel={novel} />}
			</TabsContent>

			<TabsContent value={libraryTabItems.ARTWORK}>
				{currentTab === libraryTabItems.ARTWORK && <ArtworkTab novel={novel} />}
			</TabsContent>
		</Tabs>
	);
}

export default LibraryItemTabs;
