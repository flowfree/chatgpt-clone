'use client'

import { QuestionForm } from '@/app/components'

export default function Page() {
  return (
    <div className="fixed w-full bottom-0 left-0">
      <div className="max-w-3xl mx-auto mb-8">
        <QuestionForm />
      </div>
    </div>
  )
}
