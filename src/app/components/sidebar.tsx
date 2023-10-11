'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

import { type Thread } from '@/app/lib/types'
import { getThreads } from '../chat/actions'
import { Avatar } from './avatar'

export function Sidebar() {
  const [threads, setThreads] = useState<Thread[]>([])
  const pathname = usePathname()
  const { data: session } = useSession()

  const currentThreadId = pathname.replace('/chat/', '')

  useEffect(() => {
    async function fetchAllThreads() {
      const { threads } = await getThreads()
      if (threads) {
        setThreads(threads)
      }
    }
    session && fetchAllThreads()
  }, [pathname])

  return (
    <div className="sticky top-0 left-0 h-screen p-2 flex flex-col dark bg-stone-900 text-white z-10">
      <div className="grow">
        <Link href="/chat" className="py-2 px-4 rounded-md flex text-sm border border-stone-600 hover:border-stone-500 text-gray-200">
          <div className="flex gap-2 items-center">
            <PlusIcon className="w-4 h-4" />
            New Chat
          </div>
        </Link>

        <ul className="mt-6 flex flex-col">
          {threads.map(({ id, title }) => (
            <li key={id} className={`text-gray-300 px-2 py-3 flex gap-2 items-center text-sm ` + (id === currentThreadId ? 'rounded-md bg-stone-800' : '')}>
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <Link href={`/chat/${id}`} className="line-clamp-1">
                {title}
              </Link>
            </li>
          ))}
        </ul>

      </div>

      <div className="p-2 pt-4 border-t border-stone-700">
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
    </div>
  )
}
