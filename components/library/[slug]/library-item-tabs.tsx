import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

import useTabHandler from '@/hooks/useTabHandler';

import { Novel } from '@/models/novel/novel';

const OverviewTab = dynamic(() => import('./overview-tab'));
const BookmarksTab = dynamic(() => import('./bookmarks-tab'));
const ArtworkTab = dynamic(() => import('./artwork-tab'));

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

			{/* Lazy load so that artwork tab does not cause giga slowdown */}
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
