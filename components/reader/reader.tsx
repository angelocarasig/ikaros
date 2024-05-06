'use client'

import React, { MutableRefObject, useMemo, useRef } from 'react';
import Epub from 'epubjs';
import { Novel } from '@/models/novel/novel';
import ReaderMenu from './reader-menu';
import { useSetupReader } from '@/hooks/useSetupReader';
import useReaderStore from '@/store/useReaderStore';
import ReaderLoader from '@/app/reader/[slug]/loading';
import { useBookmarks } from '@/hooks/useBookmarks';

function Reader({ novel }: { novel: Novel }) {
  const currentNovel = useMemo(() => Epub(novel.file_url), [novel]);
  const readerRef = useRef<HTMLDivElement>(null);

  const { rendition } = useReaderStore();
  useSetupReader(currentNovel, readerRef as MutableRefObject<HTMLDivElement>);
  useBookmarks(novel);
  
  return (
    <>
      { rendition == null ? <ReaderLoader /> : <ReaderMenu novel={novel} /> }
      <div className="w-full h-full p-8">
        <div ref={readerRef} className='h-full w-full border border-solid border-t-muted' />
      </div>
    </>
  );
}

export default Reader;