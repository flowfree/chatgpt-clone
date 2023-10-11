'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import { createThread } from './actions'
import { QuestionForm } from './components'

export default function Page() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    redirect('/')
  }

  async function handleSubmit(question: string) {
    const { success, message, threadId } = await createThread(question)
    router.push(`/chat/${threadId}`)
  }

  return (
    <div className="relative">
      <div className="w-content pb-32">
        <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-300">
          ChatGPT clone
        </h2>
      </div>

      <div className="fixed w-full bottom-0 left-0 flex">
        <div className="hidden lg:block lg:basis-1/6" />
        <div className="flex-1 lg:basis-5/6">
          <div className="w-full h-12 bg-gradient-to-t from-white to-transparent">
            <div className="max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex flex-row-reverse">
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
