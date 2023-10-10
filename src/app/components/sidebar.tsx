'use client'

import { signOut, useSession } from 'next-auth/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { Avatar } from '../chat/components'

export function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 left-0 h-screen p-4 flex flex-col bg-gray-800 text-white z-10">
      <div className="grow">
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="shrink-0">
          <Avatar 
            role="user" 
            name={session?.user?.name || session?.user?.email} 
            image={session?.user?.image}
          />
        </div>
        <span className="grow text-sm overflow-hidden text-ellipsis">
          {session?.user?.name || session?.user?.email}
        </span>
        <button onClick={() => signOut()}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
