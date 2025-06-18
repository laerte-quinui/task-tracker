import { Box, Flex, Heading } from '@radix-ui/themes'
import { Task, TaskStatus } from '../generated/prisma'
import KanbanBoard from './KanbanBoard'
import NewTaskButton from './NewTaskButton'
import TaskStatusFilter from './TaskStatusFilter'

export interface TasksQuery {
  status: TaskStatus
  orderBy: keyof Task
  page: string
}
interface Props {
  searchParams: Promise<TasksQuery>
}

const TasksPage = async ({ searchParams }: Props) => {
  return (
    <Box>
      <Heading size="7" mb="4" className="text-stone-600">
        My tasks
      </Heading>

      <Flex mb="4">
        <TaskStatusFilter />
        <NewTaskButton />
      </Flex>

      <KanbanBoard />

      {/* <TasksTable searchParams={searchParams} /> */}
    </Box>
  )
}

export const dynamic = 'force-dynamic'
export default TasksPage
