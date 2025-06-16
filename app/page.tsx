import { prisma } from '@/prisma/client'
import TaskSumary from './TaskSummary'
import { TaskStatus } from './generated/prisma'

export default async function Home() {
  const getSatus = async (status: TaskStatus) => {
    return await prisma.task.count({ where: { status } })
  }

  const toDo = await getSatus('TO_DO')
  const doing = await getSatus('DOING')
  const done = await getSatus('DONE')

  return <TaskSumary to_do={toDo} doing={doing} done={done} />
}
