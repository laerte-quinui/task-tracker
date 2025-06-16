import { prisma } from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { TaskStatus } from './generated/prisma'
import TaskChart from './TaskChart'
import TaskSummary from './TaskSummary'

export default async function Home() {
  const countSatus = async (status: TaskStatus) => {
    return await prisma.task.count({ where: { status } })
  }

  const toDo = await countSatus('TO_DO')
  const doing = await countSatus('DOING')
  const done = await countSatus('DONE')

  const statusQtd = { toDo, doing, done }

  return (
    <Flex gap="4" direction="column">
      <TaskSummary statusQtd={statusQtd} />
      <TaskChart statusQtd={statusQtd} />
    </Flex>
  )
}
