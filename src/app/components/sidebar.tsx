'use client'

import { signOut, useSession } from 'next-auth/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

export function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 left-0 h-screen p-4 flex flex-col bg-gray-900 text-white z-10">
      <div className="grow">
      </div>
      <p className="flex flex-row gap-2 items-center">
        <img src={session?.user?.image || ''} className="w-8 h-8" alt="" />
        <span className="grow text-sm">
          {session?.user?.name}
        </span>
        <button onClick={() => signOut()}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </button>
      </p>
    </div>
  )
}
