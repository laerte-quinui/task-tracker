import { Box, Flex } from "@radix-ui/themes"
import { Task, TaskStatus } from "../generated/prisma"
import NewTaskButton from "./NewTaskButton"
import TasksTable from "./TasksTable"
import TaskStatusFilter from "./TaskStatusFilter"

export interface TasksQuery {
  status: TaskStatus,
  orderBy: keyof Task,
  page: string
}
interface Props {
  searchParams: Promise<TasksQuery>
}

const TasksPage = async ({ searchParams }: Props ) => {

  return (
    <Box>
      <Flex mb="4">
        <TaskStatusFilter />
        <NewTaskButton />
      </Flex>

      <TasksTable searchParams={searchParams} />
    </Box>
  )
}

export const dynamic = 'force-dynamic'
export default TasksPage
