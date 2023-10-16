'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

import { getMessages, addMessage, deleteMessage } from '../actions'
import { type Message } from '@/app/lib/types'
import { AlertError } from '@/app/components'
import { MessageListItem, QuestionForm } from '../components'

export default function Page({ 
  params: { threadId } 
}: {
  params: { threadId: string }
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState('')

  const [displayLoading, setDisplayLoading] = useState(false)
  const [initialMessagesLoaded, setInitialMessagesLoaded] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)

  const { data: session } = useSession()
  if (!session) {
    redirect('/')
  }

  // Fetch all saved messages on page load
  useEffect(() => {
    async function fetchInitialMessages() {
      const item = localStorage.getItem('NewChat')
      if (item) {
        setMessages([JSON.parse(item)])
        localStorage.removeItem('NewChat')
      } else {
        setDisplayLoading(true)
      }

      try {
        setMessages(await getMessages(threadId))
      } finally {
        setDisplayLoading(false)
        setInitialMessagesLoaded(true)
      }
    }

    fetchInitialMessages()
  }, [threadId]) 

  useEffect(() => {
    if (initialMessagesLoaded) {
      // Always scroll to the bottom of the page on each message changes
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
      document.body.scrollTop = document.body.scrollHeight;

      // Generate chat completion after user submits new question
      if ((messages.length % 2) === 1 && isStreaming === false) {
        generateCompletion()
      }
    }
  }, [initialMessagesLoaded, messages, isStreaming])

  async function handleUserMessage(content: string) {
    const role = 'user'
    setMessages(m => [...m, { role, content }])

    const { id } = await addMessage(threadId, 'user', content)
    setMessages(m => [...m.slice(0, -1), { id, role, content }])
  }

  async function handleEditMessage(id: string, content: string) {
    const index = messages.findIndex(m => m.id === id)
    setMessages(m => [...m.slice(0, index)])
    await deleteMessage(id)
    handleUserMessage(content)
  }

  async function handleRegenerateCompletion() {
    const { id } = messages[messages.length - 1]
    setMessages(m => [...m.slice(0, -1)])

    if (id) {
      await deleteMessage(id)
    }
  }

  async function generateCompletion() {
    const role = 'assistant'
    setMessages(m => [...m, { role: 'assistant', content: '...' }])

    setIsStreaming(true)

    const response = await fetch('/api/chat', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: messages.map(({ role, content }) => ({ role, content })) 
      })
    })

    const stream = response.body
    if (stream === null) {
      throw new Error('Stream is null')
    }

    const reader = stream.getReader()
    const textDecoder = new TextDecoder('utf-8')
    let content = ''

    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          const { success, id } = await addMessage(threadId, role, content)
          setMessages(m => ([...m.slice(0, -1), { id, role, content }]))
          break
        }
        content += textDecoder.decode(value)
        setMessages(m => ([...m.slice(0, -1), { role, content }]))
      }
    } catch (error) {
      console.error(`Error reading from stream: ${error}`)
    } finally {
      setIsStreaming(false)
      reader.releaseLock()
    }
  }

  return (
    <div className="relative">
      <div className="w-content pb-32">

        {displayLoading && (
          <div className="max-w-sm px-2 py-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
            <span className="text-sm">
              Loading...
            </span>
          </div>
        )}        

        <ul>
          {messages.map((message, index) => (
            <MessageListItem 
              key={index === 0 ? `0` : `${message.id || index}`} 
              message={message} 
              onEditMessage={handleEditMessage}
            />
          ))}
        </ul>

        {error && (
          <div className="max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
            <AlertError>{error}</AlertError>
          </div>
        )}
      </div>

      <div className="fixed w-full bottom-0 left-0 flex">
        <div className="hidden lg:block lg:basis-1/6" />
        <div className="flex-1 lg:basis-5/6">
          <div className="w-full h-12 bg-gradient-to-t from-white to-transparent">
            <div className="max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex flex-row-reverse">
              {isStreaming === false && messages.length > 1 && messages.length % 2 === 0 && (
                <button
                  className="p-2 border border-gray-300 text-sm text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-2"
                  onClick={handleRegenerateCompletion}
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Regenerate
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-4">
              <QuestionForm onSubmit={handleUserMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
