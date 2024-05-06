'use client'

import { useState, useEffect } from 'react';

import { getNovel } from '@/actions/supabase/novel';
import LibraryItem from '@/components/library/[slug]/library-item';
import { Novel } from '@/models/novel/novel';
import LibraryItemSkeleton from './loading';

const Page = ({ params }: { params: { slug: string } }) => {
  const [novel, setNovel] = useState<Novel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const fetchedNovel = await getNovel(params.slug);
        setNovel(fetchedNovel);
      } 
			catch (error) {
        console.error('Failed to fetch novel:', error);
      } 
			finally {
        setIsLoading(false);
      }
    };

    fetchNovel();
  }, [params.slug]);

  return (
    <>
			{ isLoading ? <LibraryItemSkeleton /> : <LibraryItem novel={novel!} /> }
		</>
  );
};

export default Page;
