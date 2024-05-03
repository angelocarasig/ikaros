import React from 'react'

import { getAllNovels } from '@/actions/supabase/novel';
import { getRandomItemsFromArray } from '@/lib/utils';

import DashboardContent from '@/components/dashboard/dashboard-content';
import EmptyDashboard from '@/components/dashboard/empty-dashboard';

async function Dashboard() {
  const novels = await getAllNovels();

  return (
    <>
      {novels.length > 0 ? (
        <>
          <DashboardContent
            novels={novels}
            carouselNovels={getRandomItemsFromArray(novels, 10)}
            randomNovels={getRandomItemsFromArray(novels, 20)}
          />
        </>
      ) : (
        <>
          <EmptyDashboard />
        </>
      )}
    </>
  )
}

export default Dashboard;