import { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export function QuestionForm() {
  const [numRows, setNumRows] = useState(1)
  const [question, setQuestion] = useState('')

  function handleSubmit() {
    if (!question) {
      return
    }
    console.log(`Question: ${question}`)
    setQuestion('')
    setNumRows(1)
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(e.target.value)
    // Count the number of newline characters to determine the rows
    const newlineCount = (e.target.value.match(/\n/g) || []).length + 1;
    // Ensure the number of rows doesn't exceed 4
    setNumRows(Math.min(newlineCount, 5));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form className="w-full">
      <div className="py-2 px-4 flex gap-2 rounded-lg shadow-[0_0px_20px_rgba(0,0,0,0.2)]">
        <textarea 
          rows={numRows} 
          className="grow p-2 border-0 outline-none scroll-m-10"
          placeholder="Send a message"
          value={question}
          onChange={handleTextAreaChange}
          onKeyDown={handleKeyDown}
        />
        <div className="pb-1 flex flex-col-reverse">
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
    </form>
  )
}