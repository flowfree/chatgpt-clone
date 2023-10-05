'use client'

import { useState } from 'react'

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
      {messages.map((message, index) => (
        <li key={index}>
          {message.content}
        </li>
      ))}
    </ul>
  )
}
