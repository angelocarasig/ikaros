'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { Novel } from '@/models/novel';

import { BookOpen } from 'lucide-react';
import { Button } from '../../ui/button';

import LibraryItemTabs from './library-item-tabs';
import { useRouter } from 'next/navigation';

function LibraryItem({novel}: { novel: Novel }) {
  const router = useRouter();
  const StatisticsTab = dynamic(() => import('./statistics-tab'));

  return (
    <div className="w-full min-h-[90vh]">
      <div className="relative w-full h-[40vh] select-none">
        <div
          id="background"
          className="absolute w-full h-full object-cover select-none bg-cover bg-center blur-[2px] brightness-50"
          style={{ backgroundImage: `url('${novel?.cover_url}')` }}
        />
        <div
          id="backgroundFilter"
          className="absolute w-full h-[101%] bg-gradient-to-b from-zinc-800/25 to-zinc-950/95">
          <div className="absolute bottom-8 left-8 flex items-end gap-4 w-[90%] h-min">
            <div
              id="novelCover"
              className="rounded aspect-[11/16] h-[14rem] transition ease-in-out bg-cover bg-center"
              style={{ backgroundImage: `url('${novel?.cover_url}')` }}
            />
            <div className="flex flex-col self-stretch text-white">
              <h1 className="text-2xl font-bold line-clamp-3">
                {novel?.title}
              </h1>
              <small className="text-sm font-medium leading-none my-2">{novel?.author}</small>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button onClick={() => {
                  router.push(`/reader/${novel.id}`)
                }}>
                  <BookOpen className="mr-2 h-4 w-4"/> Read Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full p-4 flex flex-col sm:flex-row gap-4">
        <div className="rounded-lg w-full min-w-[20rem] sm:w-[20rem] h-min bg-slate-200 dark:bg-zinc-900 p-2">
          <StatisticsTab novel={novel}/>
        </div>

        <div className="rounded-lg grow bg-slate-200 dark:bg-zinc-900 p-2 min-h-[50vh]">
          <LibraryItemTabs novel={novel}/>
        </div>
      </div>
    </div>
  );
}

export default LibraryItem;
