import React from 'react'

export default function EmptyDashboard() {
  return (
    <div className='w-full h-[90vh] flex items-center justify-center text-lg font-light'>
      <div>
        <span>
          No novels in this dashboard! Try uploading some
        </span>
        <span> </span>
        <span>
          <a href="/library" className='underline font-semibold hover:text-blue-500 transition-colors'>here</a>
        </span>
      </div>
    </div>
  )
}