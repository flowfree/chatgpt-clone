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
              ),
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <CodeBlock language={match[1]}>
                    {children}
                  </CodeBlock>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </li>
      ))}
    </ul>
  )
}

/*
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="bg-gray-700 rounded-md">
                    <div className="flex gap-2 items-center h-8 px-2 text-white text-sm">
                      <p className="grow">
                        {match[1]}
                      </p>
                      <p>
                        Copy code
                      </p>
                    </div>
                    <SyntaxHighlighter 
                      language={match[1]} 
                      style={monokai}
                      PreTag='div'
                      className='text-sm rounded-bl-md rounded-br-md'
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
*/
