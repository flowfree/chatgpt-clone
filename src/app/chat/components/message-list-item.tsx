'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Message } from '@/app/lib/types'
import { Avatar } from '@/app/components'
import { Markdown } from './markdown'
import { PencilIcon } from '@heroicons/react/24/outline'

export function MessageListItem({
  message,
  onEditMessage
}: {
  message: Message,
  onEditMessage: (id: string, question: string) => void
}) {
  const { id, role, content } = message

  const [editMessage, setEditMessage] = useState(content)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (isEditing === true && inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    } else if (isEditing === false) {
      setEditMessage(content)
    }
  }, [isEditing, editMessage])

  function handleSubmit() {
    setIsEditing(false)
    if (id) {
      onEditMessage(id, editMessage)
    }
  }

  return (
    <li className={`group py-2 ` + (role === 'assistant' ? 'bg-gray-50 border-y border-y-gray-200/75' : '')}>
      <div className="max-w-sm px-2 text-sm sm:px-0 sm:text-base sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex gap-4 ">
        <div className="shrink-0 first-letter:lg:min-w-fit pt-2">
          <Avatar 
            role={role} 
            name={session?.user?.name || session?.user?.email} 
            image={session?.user?.image}
          />
        </div>
        <div className="grow overflow-auto flex flex-row gap-2">
          <div className="grow w-full">
            {isEditing ? (
              <textarea 
                ref={inputRef}
                rows={1}
                className="my-4 w-full outline-none border-0 resize-none"
                value={editMessage}
                onChange={e => setEditMessage(e.target.value)}
              />
            ) : (
              <Markdown content={content} />
            )}
          </div>
          {role === 'user' && isEditing === false && (
            <div className="mt-4 w-content shrink-0">
              <button
                className="invisible group-hover:visible p-1 rounded-md bg-white hover:bg-gray-200"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 max-w-sm text-sm sm:text-base sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex gap-4 justify-center">
          <button 
            className="py-2 px-4 rounded-md bg-indigo-700 hover:bg-indigo-600 text-white text-sm"
            onClick={handleSubmit}
          >
            Save &amp; Submit
          </button>
          <button 
            className="py-2 px-4 rounded-md border border-gray-300 hover:text-gray-700 text-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}

    </li>
  )
}
