import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Badge } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/props'
import { TaskStatus } from '../generated/prisma'

const statusMap: Record<
  TaskStatus,
  { label: string; color: 'orange' | 'indigo' | 'green' }
> = {
  TO_DO: { label: 'To do', color: 'orange' },
  DOING: { label: 'Doing', color: 'indigo' },
  DONE: { label: 'Done', color: 'green' },
}

const TaskStatusBadge = ({
  status,
  size,
  icon,
}: {
  status: TaskStatus
  size?: Responsive<'1' | '2' | '3'>
  icon?: IconSvgElement
}) => {
  return (
    <Badge color={statusMap[status].color} className="w-fit" size={size || '1'}>
      {icon && <HugeiconsIcon icon={icon} size={12} />}
      {statusMap[status].label}
    </Badge>
  )
}

export default TaskStatusBadge
