import { Novel } from '@/models/novel.schema'
import React from 'react'

function BookmarksTab({novel}: {novel: Novel}) {
  // TODO: Include bookmarks + snapshot of location in book if any present

  return (
    <div className='flex flex-col w-full p-2 gap-4'>
      No bookmarks currently set for this novel!
    </div>
  )
}

export default BookmarksTab
