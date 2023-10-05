'use client'

import { useState } from 'react'
import { QuestionForm } from '@/app/components'

interface Message {
  role: 'system' | 'assistant' | 'user'
  content: string
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])

  async function handleSubmit(question: string) {
    const newMessages: Message[] = [
      ...messages, 
      { role: 'user', content: question }
    ]
    setMessages(newMessages)

    const response = await fetch('/api/chat', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })

    const stream = response.body
    if (stream === null) {
      throw new Error('Stream is null')
    }

    setMessages(messages => ([
      ...messages,
      { role: 'assistant', content: '...' }
    ]))

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
    }
  }

  return (
    <div className="fixed w-full bottom-0 left-0">
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.content}
          </li>
        ))}
      </ul>
      <div className="max-w-3xl mx-auto mb-8">
        <QuestionForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
