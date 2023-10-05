import { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export function QuestionForm({
  onSubmit
}: {
  onSubmit: (question: string) => void
}) {
  const [numRows, setNumRows] = useState(1)
  const [question, setQuestion] = useState('')

  function handleSubmit() {
    if (question) {
      onSubmit(question)
      setQuestion('')
      setNumRows(1)
    }
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target
    const newRows = value.split('\n').length
    setNumRows(Math.min(newRows, 5));
    setQuestion(value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form className="w-full">
      <div className="p-4 pb-3 flex gap-2 rounded-lg shadow-[0_0px_30px_rgba(0,0,0,0.2)]">
        <textarea 
          rows={numRows} 
          className="grow border-0 outline-none resize-none"
          placeholder="Send a message"
          value={question}
          onChange={handleTextAreaChange}
          onKeyDown={handleKeyDown}
        />
        <div className="mb-1 flex flex-col-reverse">
          <button
            className="text-indigo-600 hover:text-indigo-500"
            onClick={e => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-gray-500 text-sm">
        ChatGPT clone built with Next.js and Vercel AI SDK.
      </p>
    </form>
  )
}
