import Toolbar from '@/components/library/toolbar/toolbar'
import { Skeleton } from '@/components/ui/skeleton'

function LibrarySkeleton() {
  return (
    <div className="w-full h-full">
      <Toolbar />
      <div className="min-h-screen w-full">
        <div className='p-4 h-full'>
          <Skeleton className="items-center justify-center p-1 flex flex-wrap w-full h-10" />
          <div className='px-2'>
            <Skeleton className="mt-4 items-center justify-center p-1 flex flex-wrap w-full h-[69vh]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibrarySkeleton