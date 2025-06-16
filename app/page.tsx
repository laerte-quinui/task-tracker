import { prisma } from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { TaskStatus } from './generated/prisma'
import TaskChart from './TaskChart'
import TaskSummary from './TaskSummary'

export default async function Home() {
  const getSatus = async (status: TaskStatus) => {
    return await prisma.task.count({ where: { status } })
  }

  const toDo = await getSatus('TO_DO')
  const doing = await getSatus('DOING')
  const done = await getSatus('DONE')

  return (
    <Flex gap="4" direction="column">
      <TaskSummary toDo={toDo} doing={doing} done={done} />
      <TaskChart toDo={toDo} doing={doing} done={done} />
    </Flex>
  )
}
