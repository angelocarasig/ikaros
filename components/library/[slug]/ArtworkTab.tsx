'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Novel } from '@/models/novel';
import ePub from 'epubjs';
import { alphaNumericSortObjects, zip } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

function ArtworkTab({ novel }: { novel: Novel }) {
  /**
   * Messy but this esentially opens the book and retrieves the images in the book.
   * Note that this will sort the images by href alphanumerically, which makes it ideally flow better
   * than whatever order it was unpacked in.
   */

  return (
    <div className='flex flex-wrap gap-4 justify-center items-center'>
      {novel.artwork.map((image, index) => (
        <Image
          key={index}
          alt='artwork'
          width="500"
          height="500"
          className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
          src={`${image}`}
          loading="eager"
          data-loaded="false"
          onLoad={event => {
            event.currentTarget.setAttribute('data-loaded', 'true');
          }}
          priority />
      ))}
    </div>
  )
}

export default ArtworkTab;
