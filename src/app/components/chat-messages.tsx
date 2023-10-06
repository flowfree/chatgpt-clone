'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

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
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="font-bold text-3xl" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h1 className="font-bold text-2xl" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h1 className="font-bold text-xl" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ul className="my-4 ml-4 list-decimal" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="my-4 ml-4 list-disc" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="pl-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="my-4" {...props} />
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        </li>
      ))}
    </ul>
  )
}
