import { useDroppable } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import { TaskStatus } from '../generated/prisma'
import TaskCard, { TaskCardProps } from './TaskCard'

export interface KanbanColumnProps {
  status: TaskStatus
  title: string
  icon: IconSvgElement
}

interface Props extends KanbanColumnProps {
  tasks: TaskCardProps[]
}

const KanbanColumn = ({ status, title, icon, tasks }: Props) => {
  const { isDropTarget, ref } = useDroppable({
    id: status,
    type: 'column',
    accept: 'item',
  })

  const colors = {
    TO_DO: { bg: 'bg-orange-50', text: 'text-orange-800' },
    DOING: { bg: 'bg-sky-50', text: 'text-sky-800' },
    DONE: { bg: 'bg-lime-50', text: 'text-lime-800' },
  }

  const style = isDropTarget
    ? {
        background: 'var(--color-stone-50)',
        borderColor: 'var(--color-stone-300)',
      }
    : undefined

  return (
    <Flex gap="2" direction="column" className="w-full">
      <Card variant="ghost" className={`!m-0 ${colors[status].bg}`}>
        <Flex align="center" gap="2" className={colors[status].text}>
          <HugeiconsIcon icon={icon} size={18} />
          <Heading size="3" weight="medium">
            {title}
          </Heading>
        </Flex>
      </Card>

      <Flex
        ref={ref}
        gap="2"
        direction="column"
        className="h-4/5 rounded-lg border-dashed border-transparent transition-all border"
        style={style}
      >
        {tasks.map((task, index) => {
          return (
            <Draggable key={task.id} id={task.id} index={index} status={status}>
              <TaskCard {...task} />
            </Draggable>
          )
        })}
      </Flex>
    </Flex>
  )
}

const Draggable = ({
  id,
  index,
  status,
  children,
}: {
  id: string
  index: number
  status: TaskStatus
  children: PropsWithChildren['children']
}) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: status,
  })

  return (
    <Box ref={ref} data-dragging={isDragging} className="w-full">
      {children}
    </Box>
  )
}

export default KanbanColumn
