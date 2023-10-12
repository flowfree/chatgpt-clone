'use client'

import { useSession } from 'next-auth/react'
import { Message } from '@/app/lib/types'
import { Avatar } from '@/app/components'
import { Markdown } from './markdown'

export function MessageListItem({
  message,
}: {
  message: Message
}) {
  const { data: session } = useSession()
  const { role, content } = message

  return (
    <li className={`py-2 ` + (role === 'assistant' ? 'bg-gray-50 border-y border-y-gray-200/75' : '')}>
      <div className="max-w-sm px-2 text-sm sm:px-0 sm:text-base sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex gap-4 ">
        <div className="shrink-0 first-letter:lg:min-w-fit pt-2">
          <Avatar 
            role={role} 
            name={session?.user?.name || session?.user?.email} 
            image={session?.user?.image}
          />
        </div>
        <div className="grow overflow-auto">
          <Markdown content={content} />
        </div>
      </div>
    </li>
  )
}
