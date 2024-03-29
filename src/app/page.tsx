'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { TypeWriter } from '@/app/components'

const prompts = [
  'Plan a trip - to see the northern lights in Norway',
  'Plan a trip - to experience Seoul like a local',
  'Help me pick - a gift for my dad who loves fishing',
  'Improve my post - for selling a used vacuum in good condition',
  'Improve my post - for hiring a store associate',
  'Give me ideas - for a customer loyalty program in a small bookstore',
  'Give me ideas - for what to do with my kid\'s art',
  'Suggest fun activities - for a team-building day with remote employees',
  'Suggest fun activities - for a family of 4 to do indoors on a rainy day',
  'Draft an email - requesting a deadline extension for my project',
  'Help me debug - a Python script automating daily reports',
  'Help me debug - Why the linked list appears empty after I\'ve reversed it',
  'Summarize this article - into three keypoints',
  'Summarize this article - as a table of pros and cons',
  '',
]

export default function Page() {
  const { data: session } = useSession()
  const [index, setIndex] = useState(0)
  const [heading, setHeading] = useState('')
  const [subheading, setSubheading] = useState('')

  if (session) {
    redirect('/chat')
  }

  useEffect(() => {
    let prompt = prompts[index]
    const [text1, text2] = prompt.split(' - ')
    setHeading(text1)
    setSubheading(text2)

    const timer = setTimeout(() => {
      setIndex(i => i+1 < prompts.length ? i+1 : 0)
    }, 5000)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className="w-full min-h-full flex flex-row">
      <div className="hidden py-4 px-8 md:basis-1/2 lg:basis-2/3 bg-gray-100 md:flex md:flex-col">
        <h2 className="text-lg font-bold tracking-tight">
          ChatGPT clone
        </h2>
        <div className="grow flex items-center">
          <div>
            <h2 className="text-5xl font-bold tracking-tight">
              {heading}
            </h2>
            <p className="mt-2 text-2xl tracking-tight text-gray-800 h-16">
              <TypeWriter text={subheading} />
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 px-8 flex-1 md:basis-1/2 lg:basis-1/3 flex flex-col">
        <h2 className="block md:hidden text-lg font-bold tracking-tight">
          ChatGPT clone
        </h2>
        <div className="grow flex items-center justify-center">
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Get started
            </h2>
            <div className="w-full px-0 sm:px-14 flex flex-col sm:flex-row gap-2">
              <button 
                className="py-2 flex-1 rounded-md shadow bg-indigo-600 hover:bg-indigo-600/90 text-base font-bold text-white"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-sm text-gray-700">
          <p className="text-center">
            ChatGPT clone built with Next.js and Vercel AI SDK.
          </p>
          <ul className="mt-2 flex gap-4">
            <li>
              <Link href="/terms-of-use" className="text-blue-700 hover:underline">
                Terms of use
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link href="/privacy-policy" className="text-blue-700 hover:underline">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
