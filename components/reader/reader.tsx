'use client'

import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import Epub from 'epubjs';
import { Novel } from '@/models/novel/novel';
import useRendition from '@/hooks/reader/useRendition';
import useThemes from '@/hooks/reader/useThemes';
import useTableOfContents from '@/hooks/reader/useTableOfContents';
import ReaderMenu from './reader-menu';

function Reader({ novel }: { novel: Novel }) {
  const book = useMemo(() => Epub(novel.file_url), [novel]);
  const readerRef = useRef<HTMLDivElement>(null);

  const { rendition, jumpToSection, prevSection, nextSection } = useRendition(book, readerRef as MutableRefObject<HTMLElement>);
  const { tableOfContents } = useTableOfContents(book);
  const _ = useThemes(rendition);

  useEffect(() => {
    if (rendition == null) {
      return;
    };

  }, [rendition]);

  return (
    <>
      <ReaderMenu 
        novel={novel} 
        toc={tableOfContents} 
        prevSection={prevSection}
        nextSection={nextSection}
        itemClicked={jumpToSection} />
      <div className="w-full h-full p-8">
        <div ref={readerRef} className='h-full w-full' />
      </div>
    </>
  );
}

export default Reader;