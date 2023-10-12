'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import { createThread } from './actions'
import { QuestionForm } from './components'

interface SamplePrompt {
  title: string
  subtitle: string
  message: string
}

const prompts: SamplePrompt[] = [{
  title: 'Explains options trading',
  subtitle: 'if I am familiar with buying and selling stocks',
  message: 'Explain options trading in simple terms if I\'m familiar with buying and selling stocks.'
}, {
  title: 'Explain air turbulence',
  subtitle: 'to someone who has never flown before',
  message: 'Can you explain airplane turbulence to someone who has never flown before? Make it conversational and concise.'
}, {
  title: 'Tell me a fun fact',
  subtitle: 'about the Roman Empire',
  message: 'Tell me a random fun fact about the Roman Empire',
}, {
  title: 'Brainstorm edge cases',
  subtitle: 'for a function with birthdate as input, horoscope as output',
  message: 'Can you brainstorm some edge cases for a function that takes birthdate as input and returns the horoscope?'
}, {
  title: 'Design a database schema',
  subtitle: 'for an online merch store',
  message: 'Design a database schema for an online merch store.'
}, {
  title: 'Write a SQL query',
  subtitle: '\'that adds a "status" column to an "orders" table\'',
  message: '\'Give me a SQL query to add a "status" column to an orders table that defaults to PENDING. Set it to COMPLETE if "completed_at" is set.\''
}, {
  title: 'Create a workout plan',
  subtitle: 'for resistance training',
  message: 'I need to start resistance training. Can you create a 7-day workout plan for me to ease into it?'
}, {
  title: 'Show me a code snippet',
  subtitle: 'of a website\'s sticky header',
  message: 'Show me a code snippet of a website\'s sticky header in CSS and JavaScript.'
}, {
  title: 'Plan a trip',
  subtitle: 'to see the best of New York in 3 days',
  message: 'I\'ll be in New York for 3 days. Can you recommend what I should do to see the best of the city?'
}]

export default function Page() {
  const [samplePrompts, setSamplePrompts] = useState<SamplePrompt[]>([])
  const router = useRouter()

  const { data: session } = useSession()
  if (!session) {
    redirect('/')
  }

  useEffect(() => {
    const shuffled = prompts.sort(() => 0.5 - Math.random())
    setSamplePrompts(shuffled.slice(0, 4))
  }, [])

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
          <div className="mb-8 max-w-sm px-2 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
            <ul className="grid grid-cols-2 gap-4">
              {samplePrompts.map((prompt, index) => (
                <li 
                  key={index} 
                  className="py-2 px-4 border rounded-lg border-gray-200 cursor-pointer"
                  onClick={() => handleSubmit(prompt.message)}
                >
                  <div className="text-sm">
                    <h3 className="text-gray-900 font-bold">
                      {prompt.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-1">
                      {prompt.subtitle}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
