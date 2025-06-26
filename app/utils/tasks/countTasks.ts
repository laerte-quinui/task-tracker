import { TaskStatus } from '@/app/generated/prisma'
import { auth } from '@/auth'
import { prisma } from '@/prisma/client'

export async function countTasks(status?: TaskStatus) {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  })

  const countSatus = async (status: TaskStatus) => {
    return await prisma.task.count({
      where: { status, userId: user?.id },
    })
  }

  const toDo = await countSatus('TO_DO')
  const doing = await countSatus('DOING')
  const done = await countSatus('DONE')

  const total = await prisma.task.count({ where: { status, userId: user?.id } })

  return { toDo, doing, done, total }
}
