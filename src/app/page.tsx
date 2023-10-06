'use client'

import { useState } from 'react'
import { QuestionForm } from '@/app/components'
import { ChatMessages, type Message } from '@/app/components'

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])

  async function handleSubmit(question: string) {
    const newMessages: Message[] = [...messages, { role: 'user', content: question }]
    setMessages(newMessages)
    scrollToBottom()

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

        // Always scroll to the bottom of the page
        scrollToBottom()
      }
    } catch (error) {
      console.error(`Error reading from stream: ${error}`)
    } finally {
      reader.releaseLock()
    }
  }

  function scrollToBottom() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
  }

  return (
    <div>
      <div className="w-full">
        <div className="max-w-3xl mx-auto mb-36">
          <ChatMessages messages={messages} />
        </div>
      </div>
      <div className="fixed w-full bottom-0 left-0">
        <div className="w-full h-12 bg-gradient-to-t from-white to-transparent" />
        <div className="w-full bg-white">
          <div className="max-w-3xl mx-auto pt-2 pb-4">
            <QuestionForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}
