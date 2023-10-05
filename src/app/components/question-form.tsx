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
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(e.target.value)
    // Count the number of newline characters to determine the rows
    const newlineCount = (e.target.value.match(/\n/g) || []).length + 1;
    // Ensure the number of rows doesn't exceed 4
    setNumRows(Math.min(newlineCount, 4));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form className="w-full">
      <div className="p-2 flex gap-2 rounded-lg border shadow-xl">
        <textarea 
          rows={numRows} 
          className="grow p-2 border-0 outline-none"
          placeholder="Send a message"
          value={question}
          onChange={handleTextAreaChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-col-reverse">
          <button
            className="p-2 rounded bg-indigo-600 hover:bg-indigo-600/90 text-white"
            onClick={e => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  )
}