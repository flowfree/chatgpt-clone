'use server'

import { getServerSession } from 'next-auth'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Create a new thread with the given argument as the first message  
 */
export async function createThread(firstMessage: string) {
  const session = await getServerSession()

  try {
    const thread = await prisma.thread.create({
      data: {
        title: 'New Chat',
        user: { connect: { email: session?.user?.email || '' } },
        messages: {
          create: [
            { role: Role.user, content: firstMessage }
          ]
        }
      }
    })
    return { success: true, message: 'Successfully created new thread.', threadId: thread.id }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Failed creating new thread.' }
  }
}

/**
 * Get all messages for the given thread
 */
export async function getMessages(threadId: string) {
  const messages = await prisma.message.findMany({
    where: { threadId }
  })

  return messages.map(({ id, role, content }) => ({ id, role, content }))
}

/**
 * Add new message for the given thread 
 */
export async function addMessage(threadId: string, role: 'user' | 'assistant', content: string) {
  const message = await prisma.message.create({
    data: { threadId, role, content }
  })

  return { success: true, id: message.id }
}

/**
 * Delete a message
 */
export async function deleteMessage(id: string) {
  try {
    const message = await prisma.message.findFirst({ where: { id } })
    if (message) {
      const { threadId, createdAt } = message
      await prisma.message.deleteMany({
        where: {
          threadId,
          createdAt: { gte: createdAt }
        }
      })
    }
    return { success: true }
  } catch (err) {
    return { success: false }
  }
}
