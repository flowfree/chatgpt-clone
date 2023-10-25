import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export async function POST(request: Request) {
  const { messages } = await request.json()
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.7,
      stream: true,
      messages
    })
    const stream = OpenAIStream(chatCompletion)
    return new StreamingTextResponse(stream)
  } catch (err) {
    const error = `Error communicating wih OpenAI: ${err}`
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
