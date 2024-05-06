'use client';

import { Progress } from '@/components/ui/progress';
import { getDate, toPercentage } from '@/lib/utils';
import { Novel } from '@/models/novel/novel'
import useBookmarkStore from '@/store/useBookmarksStore'
import React, { useEffect } from 'react'

function BookmarksTab({ novel }: { novel: Novel }) {
  const { bookmarks, loading, fetchBookmarks } = useBookmarkStore();

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
          {bookmarks.length === 0 ? (
            <>No bookmarks currently set for this novel!</>
          ) : (
            <div className='flex flex-col w-full p-2 gap-4'>
              {bookmarks.map((bookmark, index: number) => (
                <div key={index} className='w-full h-[3.5rem] flex items-center p-4 rounded-lg justify-between bg-background select-none cursor-pointer hover:bg-muted transition-colors'>
                  <p>{bookmark.label}</p>
                  <p>{new Date(bookmark.timestamp).toLocaleString()}</p>
                  <div className='flex items-center gap-4 text-sm'>
                    <Progress value={bookmark.progress} className="w-[7rem]" />
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
