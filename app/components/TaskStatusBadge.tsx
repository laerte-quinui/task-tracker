import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Badge } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/props'
import { TaskStatus } from '../generated/prisma'

const statusMap: Record<
  TaskStatus,
  { label: string; color: 'orange' | 'sky' | 'lime' }
> = {
  TO_DO: { label: 'To do', color: 'orange' },
  DOING: { label: 'Doing', color: 'sky' },
  DONE: { label: 'Done', color: 'lime' },
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
