'use client'

import React from 'react'
import { Progress } from '../../ui/progress';
import { getDate } from '@/lib/utils';
import { SAMPLE_TAGS } from '@/constants';
import { Novel, NovelStatus } from '@/models/novel';

function StatisticsTab({ novel }: { novel: Novel }) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='p-4 w-full'>
      <div className='flex flex-col gap-4 items-start justify-center'>
        <Statistic title="Status" value={NovelStatus.ONGOING} />

        <Statistic title="Progress">
          <div className='flex items-center justify-between mt-2'>
            <Progress value={progress} className="w-5/6" />
            <p>{progress}%</p>
          </div>
        </Statistic>

        <Statistic title="Last Read" value="Never" />

        <Statistic title="Updated At" value={getDate(novel.updated_at)} />

        <Statistic title="Created At" value={getDate(novel.created_at)} />

        <Statistic title="Tags">
          <p className='text-muted-foreground select-none'>
            {SAMPLE_TAGS.map((tag, index) => (
              <span key={index} className="hover:text-white cursor-pointer">
                {tag}{index < SAMPLE_TAGS.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </Statistic>
      </div>

    </div>
  )
}

function Statistic({ title, value, children }: { title: string, value?: string, children?: any }) {
  return (
    <div className='w-full'>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{title}</h4>
      <p className='leading-7 text-muted-foreground hover:text-white select-none cursor-pointer'>
        {value != null && (value)}
      </p>
      {children}
    </div>
  )
}

export default StatisticsTab