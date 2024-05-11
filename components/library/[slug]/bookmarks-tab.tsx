'use client';

import { useEffect } from 'react'

import useBookmarkStore from '@/store/useBookmarksStore'
import { Progress } from '@/components/ui/progress';

import { getDateShort, toPercentage } from '@/lib/utils';
import { Novel } from '@/models/novel/novel'
import { useRouter } from 'next/navigation';

function BookmarksTab({ novel }: { novel: Novel }) {
  const router = useRouter();
  const { bookmarks, loading, fetchBookmarks } = useBookmarkStore();

  const sortedBookmarks = bookmarks.sort((a, b) => {
    if (a.label === "Autosave") return -1;
    if (b.label === "Autosave") return 1;
    return 0;
  });

  useEffect(() => {
    fetchBookmarks(novel.id);
  }, [novel]);

  // TODO: Jump from this particular bookmark
  return (
    <div className='flex flex-col w-full p-2 gap-4'>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {sortedBookmarks.length === 0 ? (
            <>No bookmarks currently set for this novel!</>
          ) : (
            <div className='flex flex-col w-full p-2 gap-4'>
              {sortedBookmarks.map((bookmark, index: number) => (
                <div 
                key={index} 
                className='w-full flex flex-wrap overflow-hidden items-center p-4 rounded-lg justify-between bg-background select-none cursor-pointer hover:bg-muted transition-colors'>
                  <p>{bookmark.label}</p>
                  <p>{getDateShort(bookmark.timestamp)}</p>
                  <div className='flex items-center gap-4 text-sm'>
                    <Progress value={bookmark.progress * 100} className="w-[7rem]" />
                    <p>{toPercentage(bookmark.progress)}%</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BookmarksTab
