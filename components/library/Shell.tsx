'use client';

import React from 'react';

import useTabHandler from '@/hooks/useTabHandler';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import { useLibraryFilters } from '@/hooks/useLibraryFilters';
import { useNovels } from '@/store/useNovelStore';
import { Novel } from '@/models/novel/novel';
import NovelCard from '../shared/novel-card';

enum libraryTabItems {
  DEFAULT = 'Default',

  // Arbitrary categories for now // Will be user-defined => navigating to library should fetch categories table (?):
  LIGHTNOVELS = 'Light Novels',
  WEBNOVELS = 'Web Novels',
  ONESHOTS = 'One-Shots'
}

const libraryTabs = [
  libraryTabItems.DEFAULT,
  libraryTabItems.LIGHTNOVELS,
  libraryTabItems.WEBNOVELS,
  libraryTabItems.ONESHOTS,
];

function Shell({initialNovels}: {initialNovels: Array<Novel>}) {
  const { novels } = useNovels(initialNovels);
  const {currentTab, onTabChange} = useTabHandler(libraryTabItems.DEFAULT, libraryTabs);

  const { filteredNovels } = useLibraryFilters(novels);

  return (
    <div className="min-h-screen w-full">
      <div className="p-4">
        <Tabs className="w-full" defaultValue={libraryTabItems.DEFAULT} onValueChange={onTabChange}>
          <TabsList className={`flex flex-wrap w-full h-full`}>
            <TabsTrigger className="grow" value={libraryTabItems.DEFAULT}>
              {libraryTabItems.DEFAULT}
            </TabsTrigger>
            <TabsTrigger className="grow" value={libraryTabItems.LIGHTNOVELS}>
              {libraryTabItems.LIGHTNOVELS}
            </TabsTrigger>
            <TabsTrigger className="grow" value={libraryTabItems.WEBNOVELS}>
              {libraryTabItems.WEBNOVELS}
            </TabsTrigger>
            <TabsTrigger className="grow" value={libraryTabItems.ONESHOTS}>
              {libraryTabItems.ONESHOTS}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={libraryTabItems.DEFAULT}>
            {currentTab === libraryTabItems.DEFAULT && (<TabNovels novels={filteredNovels}/>)}
          </TabsContent>

          <TabsContent value={libraryTabItems.LIGHTNOVELS}>
            {currentTab === libraryTabItems.LIGHTNOVELS && (<TabNovels novels={filteredNovels.filter((_, index) => index % 2 === 0)}/>)}
          </TabsContent>

          <TabsContent value={libraryTabItems.WEBNOVELS}>
            {currentTab === libraryTabItems.WEBNOVELS && (<TabNovels novels={filteredNovels.filter((_, index) => index % 3 === 0)}/>)}
          </TabsContent>

          <TabsContent value={libraryTabItems.ONESHOTS}>
            {currentTab === libraryTabItems.ONESHOTS && (<TabNovels novels={filteredNovels.filter((_, index) => index % 4 === 0)}/>)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TabNovels({novels}: { novels: Array<Novel> }) {
  return (
    <div className="w-full h-full flex flex-wrap gap-4 items-start justify-center mt-4">
      {novels.map((novel, index) => (
        <NovelCard novel={novel} key={index} imageProps="h-[12rem] md:h-[14rem] lg:h-[18rem]" captionProps="w-[8.25rem] md:w-[8.25rem] lg:w-[12.5rem]"/>
      ))}
    </div>
  );
}

export default Shell;
