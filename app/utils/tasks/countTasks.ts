import { TaskStatus } from '@/app/generated/prisma'
import { prisma } from '@/prisma/client'

export async function countTasks(status?: TaskStatus) {
  const countSatus = async (status: TaskStatus) => {
    return await prisma.task.count({ where: { status } })
  }

  const toDo = await countSatus('TO_DO')
  const doing = await countSatus('DOING')
  const done = await countSatus('DONE')

  const total = await prisma.task.count({ where: { status } })

  return { toDo, doing, done, total }
}
