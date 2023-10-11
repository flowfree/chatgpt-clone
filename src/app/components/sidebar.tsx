'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { 
  ChatBubbleLeftIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

import { type Thread } from '@/app/lib/types'
import { getThreads, renameThread, deleteThread } from '../chat/actions'
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
            <ThreadListItem 
              key={id} 
              id={id} 
              title={title} 
              active={currentThreadId === id} 
            />
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

function ThreadListItem({
  id,
  title,
  active
}: {
  id: string
  title: string
  active: boolean
}) {
  enum Mode {
    Normal,
    Editing,
    Deleting
  }

  const [mode, setMode] = useState<Mode>(Mode.Normal)
  const [displayTitle, setDisplayTitle] = useState(title)
  const [newTitle, setNewTitle] = useState(title)
  const router = useRouter()

  async function handleRename(e: React.FormEvent | null) {
    if (e) {
      e.preventDefault()
    }
    const {success} = await renameThread(id, newTitle) 
    setDisplayTitle(success ? newTitle : title)
    setMode(Mode.Normal)
  }

  async function handleDelete() {
    await deleteThread(id)
    router.push('/chat')
  }

  return (
    <li key={id} className={`text-gray-300 px-2 py-3 text-sm ` + (active ? 'rounded-md bg-stone-800' : '')}>
      <div className="flex gap-2 items-center">
        <ChatBubbleLeftIcon className="shrink-0 w-4 h-4" />

        {mode === Mode.Editing ? (
          <form onSubmit={handleRename}>
            <input 
              type="text" 
              name="title" 
              value={newTitle}
              className="w-full bg-stone-800 border border-blue-700 outline-none"
              onChange={e => setNewTitle(e.target.value)}
            />
          </form>
        ) : (
          <Link href={`/chat/${id}`} className="grow line-clamp-1" title={displayTitle}>
            {displayTitle}
          </Link>
        )}

        {mode === Mode.Editing && (
          <div className="flex gap-2 items-center">
            <button onClick={handleRename}>
              <CheckIcon className="w-4 h-4 hover:text-green-400" />
            </button>
            <button onClick={() => setMode(Mode.Normal)}>
              <XMarkIcon className="w-4 h-4 hover:text-red-400" />
            </button>
          </div>
        )}

        {mode === Mode.Normal && active && (
          <div className="flex gap-2 items-center">
            <button onClick={() => setMode(Mode.Editing)}>
              <PencilIcon className="w-4 h-4" />
            </button>
            <button onClick={() => setMode(Mode.Deleting)}>
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {mode === Mode.Deleting && (
        <div className="p-2 m-2 rounded-sm bg-red-100 text-red-900">
          <p className="font-semibold">
            Chat will be deleted. Are you sure?
          </p>
          <p className="mt-2 flex flex-row-reverse gap-2 font-bold">
            <button 
              className="px-1 flex gap-1 items-center rounded-md text-green-800 border border-green-600/50 hover:border-green-600"
              onClick={() => setMode(Mode.Normal)}
            >
              <XMarkIcon className="w-4 h-4" />
              No
            </button>
            <button 
              className="px-1 flex gap-1 items-center rounded-md border border-red-400/50 hover:border-red-400"
              onClick={handleDelete}
            >
              <CheckIcon className="w-4 h-4" />
              Yes
            </button>
          </p>
        </div>
      )}
    </li>
  )
}
