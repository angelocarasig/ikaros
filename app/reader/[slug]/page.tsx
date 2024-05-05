import React, { Suspense } from 'react';
import ReaderMenu from '@/components/reader/reader-menu';
import { getAllNovels } from '@/actions/supabase/novel';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import ReaderLoader from './loading';

const Reader = dynamic(() => import('@/components/reader/reader'), {
  loading: () => <ReaderLoader />,
  suspense: true,
  ssr: false
});

export default async function Page({ params }: { params: { slug: string } }) {
  const novels = await getAllNovels();
  const novel = novels.find(value => value.id === params.slug);

  if (novel == null) {
    redirect('/library');
  }

  return (
    <Suspense fallback={<ReaderLoader />}>
      <div className='relative w-screen h-screen'>
        <Reader novel={novel} />
      </div>
    </Suspense>
  )
}
