'use client'

import { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai, tomorrowNightBright } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid'

export function CodeBlock({
  language,
  children
}: {
  language: string
  children: React.ReactNode
}) {
  const [code, setCode] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setCode(String(children).replace(/\n$/, ''))
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isCopied])

  async function handleCopyCode() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(code)
        setIsCopied(true)
      } catch(e) {
        console.error(e)
      }
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true)
    }
  }

  return (
    <div className="bg-gray-700 rounded-md">
      <div className="flex gap-2 items-center h-8 px-2 text-white text-sm">
        <p className="grow">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </p>
        {isCopied ? (
          <p>
            Copied!
          </p>
        ) : (
          <button 
            className="flex gap-2 items-center"
            onClick={handleCopyCode}
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
            Copy code
          </button>
        )}
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={monokai}
        PreTag='div'
        className='text-sm rounded-bl-md rounded-br-md'
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  )
}
