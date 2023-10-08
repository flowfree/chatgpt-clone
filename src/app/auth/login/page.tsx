'use client'

import Link from 'next/link'

export default function Page() {
  return (
    <div className="w-full min-h-full flex flex-row">
      <div className="py-4 px-8 basis-2/3 bg-gray-100 flex flex-col">
        <h2 className="text-lg font-bold tracking-tight">
          ChatGPT Clone
        </h2>
        <div className="grow flex items-center">
          <div>
            <h2 className="text-5xl font-bold tracking-tight">
              Help me debug
            </h2>
            <p className="mt-2 text-2xl tracking-tight text-gray-800">
              a Python script automating daily reports
            </p>
          </div>
        </div>
      </div>
      <div className="py-8 basis-1/3 flex flex-col">
        <div className="grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Get started
            </h2>
            <button className="py-3 w-[200px] rounded-md shadow bg-indigo-600 hover:bg-indigo-600/90 text-base font-bold text-white">
              Sign In
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-sm text-gray-700">
          <p>
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
