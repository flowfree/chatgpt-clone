'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { Avatar } from './avatar'

export function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 left-0 h-screen p-4 flex flex-col dark bg-indigo-900 text-white z-10">
      <div className="grow">
        <Link href="/chat" className="py-2 px-4 rounded-md flex text-sm border border-gray-500 hover:border-gray-400 text-gray-200">
          <div className="flex gap-4 items-center">
            <PlusIcon className="w-4 h-4" />
            New Chat
          </div>
        </Link>
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
