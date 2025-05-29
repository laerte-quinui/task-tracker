import { Badge } from '@radix-ui/themes'
import { TaskStatus } from '../generated/prisma'

const statusMap: Record<
  TaskStatus,
  { label: string, color: 'orange' | 'indigo' | 'green' }
> = {
  TO_DO: { label: 'To Do', color: 'orange' },
  DOING: { label: 'Doing', color: 'indigo' },
  DONE: { label: 'Done', color: 'green' }
}

const TaskStatusBadge = ({ status }: { status: TaskStatus }) => {
  return (
    <Badge color={statusMap[status].color} >{statusMap[status].label}</Badge>
  )
}

export default TaskStatusBadge
