import React from 'react';

import LibraryItem from '@/components/library/[slug]/library-item';
import { getNovel } from '@/actions/supabase/novel';

export default async function Page({ params }: { params: { slug: string } }) {
	const novel = await getNovel(params.slug);
	
	return (
		<LibraryItem novel={novel}/>
	)
}
