import React from 'react';

import Toolbar from '@/components/library/toolbar/toolbar';
import Shell from '@/components/library/Shell';
import { getAllNovels } from '@/actions/supabase/novel';

async function Library() {
  const novels = await getAllNovels();
  return (
    <div className="w-full h-full">
      <Toolbar/>
      <Shell initialNovels={novels}/>
    </div>
  );
}

export default Library;
