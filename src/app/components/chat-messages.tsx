'use client'

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
  return (
    <ul>
      {messages.map(({ role, content }, index) => (
        <li key={index} className={`py-4 ` + (role === 'assistant' ? 'bg-gray-50 border-y border-y-gray-100' : '')}>
          <div className="max-w-3xl mx-auto flex gap-4 ">
            <div className="min-w-fit">
              <img 
                src={`/img/${role === 'user' ? 'user' : 'bot' }-icon.jpg`} 
                className="mt-2 w-10 h-auto" 
                alt="avatar" 
              />
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
