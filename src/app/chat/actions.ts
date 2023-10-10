'use server'

import { getServerSession } from 'next-auth'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export async function createNewThread(userMessage: string, assistantMessage: string) {
  const session = await getServerSession()

  if (!session) {
    return { success: false, message: 'Unauthenticated' }
  }

  try {
    const thread = await prisma.thread.create({
      data: {
        title: 'New Chat',
        user: { 
          connect: { email: session?.user?.email ?? '' } 
        },
        messages: {
          create: [
            { role: Role.user, content: userMessage },
            { role: Role.assistant, content: assistantMessage }
          ]
        }
      }
    })
    return {
      success: true,
      message: 'Successfully created new thread.',
      threadId: thread.id
    }

  } catch (e) {
    return {
      success: false,
      message: 'Failed to create new thread.'
    }
  }
}
