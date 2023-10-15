'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Sidebar } from '@/app/components'

export function TopNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/chat') {
      setOpen(false)
    }
  }, [pathname])

  function toggleSidebar() {
    setOpen(x => !x)
  }

  return (
    <div className="relative">
      <div className="fixed p-2 top-0 inset-x-0 bg-black text-white">
        <div className="absolute top-0 left-2 inset-y-0 flex items-center">
          <button onClick={toggleSidebar}>
            <Bars3Icon className="w-5 h-5" />
          </button>
        </div>
        <div className="grow text-center text-sm">
          ChatGPT clone
        </div>
      </div>

      <div className="fixed top-0 left-0 h-screen flex flex-col">
        <div className="grow">
          <Sidebar open={open} onClose={toggleSidebar} />
          {open && (
            <div 
              className="absolute top-0 inset-0 w-screen bg-gray-400/90 z-[9]" 
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>
    </div>
  )
}
