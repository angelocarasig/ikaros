'use client'

import { MutableRefObject, useMemo, useRef } from 'react';

import Epub from 'epubjs';

import { useBookmarks } from '@/hooks/useBookmarks';
import { useSetupReader } from '@/hooks/useSetupReader';
import useReaderStore from '@/store/useReaderStore';

import { Novel } from '@/models/novel/novel';

import ReaderMenu from './reader-menu';
import ReaderLoader from '@/app/reader/[slug]/loading';
import { useSetupNovel } from '@/hooks/useSetupNovel';

function Reader({ novel }: { novel: Novel }) {
  const currentNovel = useMemo(() => Epub(novel.file_url), [novel]);
  const readerRef = useRef<HTMLDivElement>(null);

  const { rendition } = useReaderStore();
  useSetupNovel(novel);
  useSetupReader(currentNovel, readerRef as MutableRefObject<HTMLDivElement>, novel);
  useBookmarks(novel);
  
  return (
    <>
      { rendition == null ? <div className='absolute w-screen h-screen'><ReaderLoader /></div> : <ReaderMenu novel={novel} /> }
      <div className="w-full h-full p-8 overflow-x">
        <div ref={readerRef} className='h-full w-full border border-solid border-t-muted' />
      </div>
    </>
  );
}

export default Reader;