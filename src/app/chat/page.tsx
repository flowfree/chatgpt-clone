'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Markdown, Avatar, QuestionForm } from './components'

interface Message {
  role: 'system' | 'assistant' | 'user'
  content: string
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [regenerate, setRegenerate] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const { data: session } = useSession()
  if (!session) {
    redirect('/')
  }

  useEffect(() => {
    // Always scroll to the bottom of the page on each message changes
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
  }, [messages])

  useEffect(() => {
    if (regenerate) {
      handleSubmit(regenerate)
      setRegenerate('')
    }
  }, [regenerate])

  async function handleSubmit(question: string) {
    const newMessages: Message[] = [...messages, { role: 'user', content: question }]
    setMessages(newMessages)
    setIsStreaming(true)

    const response = await fetch('/api/chat', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })

    const stream = response.body
    if (stream === null) {
      throw new Error('Stream is null')
    }

    setMessages(messages => ([...messages, { role: 'assistant', content: '...' }]))

    const reader = stream.getReader()
    const textDecoder = new TextDecoder('utf-8')
    let content = ''

    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        content += textDecoder.decode(value)
        setMessages(messages => ([
          ...messages.slice(0, -1),
          { role: 'assistant', content }
        ]))
      }
    } catch (error) {
      console.error(`Error reading from stream: ${error}`)
    } finally {
      reader.releaseLock()
      setIsStreaming(false)
    }
  }

  function handleRegenerate() {
    const { content } = messages[messages.length - 2]
    setMessages(messages => ([
      ...messages.slice(0, -2)
    ]))
    setRegenerate(content)
  }

  return (
    <div className="relative">
      <div className="w-content pb-32">

        {messages.length === 0 && (
          <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-300">
            ChatGPT clone
          </h2>
        )}

        <ul>
          {messages.map(({ role, content }, index) => (
            <li key={index} className={`py-2 ` + (role === 'assistant' ? 'bg-gray-50 border-y border-y-gray-200/75' : '')}>
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
          ))}
        </ul>
      </div>

      <div className="fixed w-full bottom-0 left-0 flex">
        <div className="hidden lg:block lg:basis-1/6" />
        <div className="flex-1 lg:basis-5/6">
          <div className="w-full h-12 bg-gradient-to-t from-white to-transparent">
            <div className="max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex flex-row-reverse">
              {isStreaming === false && messages.length > 1 && messages.length % 2 === 0 && (
                <button
                  className="p-2 border border-gray-300 text-sm text-gray-600 bg-white flex items-center gap-2"
                  onClick={handleRegenerate}
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Regenerate
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-4">
              <QuestionForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
