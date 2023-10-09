'use client'

import { useSession } from 'next-auth/react'
import { Markdown } from '@/app/components'

export interface Message {
  role: 'system' | 'assistant' | 'user'
  content: string
}

export function ChatMessages({
  messages
}: {
  messages: Message[]
}) {
  const { data: session } = useSession()

  return (
    <ul>
      {messages.map(({ role, content }, index) => (
        <li key={index} className={`py-2 ` + (role === 'assistant' ? 'bg-gray-50 border-y border-y-gray-200/75' : '')}>
          <div className="max-w-3xl mx-auto flex gap-4 ">
            <div className="min-w-fit">
              {role === 'user' ? (
                <img src={session?.user?.image || ''} className="mt-2 w-9 h-auto bg-green-500" alt="" />
              ) : (
                <span className="mt-2 w-9 h-9 flex items-center justify-center bg-amber-400 text-xl text-black font-bold">B</span>
              )}
            </div>
            <div className="grow overflow-auto">
              <Markdown content={content} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
