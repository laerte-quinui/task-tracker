import { auth } from '@/auth'
import { prisma } from '@/prisma/client'

async function getTask(taskId: string) {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  })

  const task = await prisma.task.findUnique({
    where: { id: parseInt(taskId), userId: user?.id },
  })

  return task
}

export default getTask
