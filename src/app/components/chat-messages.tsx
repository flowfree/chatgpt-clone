'use client'

import ReactMarkdown from 'react-markdown'
import { CodeBlock } from '@/app/components'

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
        <li key={index} className={`py-4 ` + (role === 'assistant' ? 'bg-gray-100' : '')}>
          <div className="max-w-3xl mx-auto flex gap-4 ">
            <div className="min-w-fit">
              <MessageRole role={role} />
            </div>
            <div className="grow overflow-auto">
              <MessageContent content={content} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function MessageRole({
  role
}: {
  role: 'system' | 'assistant' | 'user'
}) {
  let src = ''
  if (role === 'user') {
    src = '/img/user-icon.jpg'
  } else {
    src = '/img/bot-icon.jpg'
  }

  return (
    <img src={src} className="mt-2 w-10 h-auto" alt="avatar" />
  )
}

function MessageContent({
  content
}: {
  content: string
}) {
  return (
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
          <ul className="my-4 ml-6 list-decimal" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="my-4 ml-6 list-disc" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="pl-2 list-outside" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-4" {...props} />
        ),
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <CodeBlock language={match[1]}>
              {children}
            </CodeBlock>
          ) : (
            <code {...props} className={className + ` px-2 bg-gray-200 text-sm`}>
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
