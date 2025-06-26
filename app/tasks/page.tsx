import { auth } from '@/auth'
import { prisma } from '@/prisma/client'
import { TaskAdd01Icon } from '@hugeicons/core-free-icons'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { Metadata } from 'next'
import LoggedoutMessage from '../LoggedoutMessage'
import EmptyStateMessage from '../components/EmptyStateMessage'
import { Task, TaskStatus } from '../generated/prisma'
import { countTasks } from '../utils/tasks/countTasks'
import KanbanBoard from './KanbanBoard'
import LayoutButton from './LayoutButton'
import NewTaskButton from './NewTaskButton'
import TaskStatusFilter from './TaskStatusFilter'
import TasksTable, { tableColumns } from './TasksTable'

export interface TasksQuery {
  status: TaskStatus
  orderBy: keyof Task
  page: string
  layout: 'kanban' | 'table'
}
interface Props {
  searchParams: Promise<TasksQuery>
}

const TasksPage = async ({ searchParams }: Props) => {
  const session = await auth()
  if (!session) return <LoggedoutMessage />

  const { status: statusFilter, orderBy, page, layout } = await searchParams
  const { total: tasksTotal } = await countTasks()

  const isTable = layout !== 'kanban'
  const currentPage = parseInt(page) || 1
  const pageSize = 10

  const validStatuses = Object.values(TaskStatus)
  const status = validStatuses.includes(statusFilter!)
    ? statusFilter
    : undefined

  const validOrder = tableColumns
    .map((column) => column.value)
    .includes(orderBy!)
    ? { [orderBy!]: 'asc' }
    : undefined

  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  })

  const tasks = await prisma.task.findMany({
    where: { status, userId: user?.id },
    orderBy: isTable ? validOrder : undefined,
    skip: isTable ? (currentPage - 1) * pageSize : undefined,
    take: isTable ? pageSize : undefined,
  })

  return (
    <Box>
      <Heading size="7" mb="4" className="text-stone-600">
        My tasks
      </Heading>

      <Flex mb="4">
        <TaskStatusFilter />
        <Flex ml="auto" gap="2">
          <LayoutButton layout={layout || 'kanban'} />
          <NewTaskButton />
        </Flex>
      </Flex>

      {tasksTotal === 0 && (
        <EmptyStateMessage
          className="mt-16"
          icon={TaskAdd01Icon}
          title="You don't have any tasks"
          description="Start by creating a new one clicking in the green button above!"
        />
      )}

      {(layout === 'kanban' || !layout) && tasksTotal > 0 && (
        <KanbanBoard tasks={tasks} />
      )}
      {layout === 'table' && tasksTotal > 0 && (
        <TasksTable
          tasks={tasks}
          tasksTotal={tasksTotal}
          currentPage={currentPage}
          pageSize={pageSize}
          filters={{ status, orderBy, layout }}
        />
      )}
    </Box>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Task Tracker - List of Tasks',
  description: 'View all your tasks and manage them efficiently.',
}

export default TasksPage
