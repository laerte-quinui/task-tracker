import { Flex } from '@radix-ui/themes'
import TaskChart from './TaskChart'
import TaskSummary from './TaskSummary'
import { countTasks } from './utils/tasks/countTasks'

export default async function Home() {
  const { toDo, doing, done } = await countTasks()
  const statusQtd = { toDo, doing, done }

  return (
    <Flex gap="4" direction="column">
      <TaskSummary statusQtd={statusQtd} />
      <TaskChart statusQtd={statusQtd} />
    </Flex>
  )
}
