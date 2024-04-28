import React from 'react';

import Toolbar from '@/components/library/toolbar/Toolbar';
import Shell from '@/components/library/Shell';

async function Library() {
  return (
    <div className="w-full h-full">
      <Toolbar/>
      <Shell />
    </div>
  );
}

export default Library;
