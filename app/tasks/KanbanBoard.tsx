'use client'
import {
  DragDropProvider,
  DragOverlay,
  useDraggable,
  useDroppable,
} from '@dnd-kit/react'
import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import { PropsWithChildren, useState } from 'react'
import { TaskStatus } from '../generated/prisma'
import TaskCard from './TaskCard'

const KanbanBoard = () => {
  const [target, setTarget] = useState()

  const draggable = (
    <Draggable id="test">
      <TaskCard
        id="test"
        title="Task test"
        description="This is a test to the task card in the kanban"
        deadline={new Date()}
        status="DOING"
      />
    </Draggable>
  )

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return
        setTarget(event.operation.target?.id)
      }}
    >
      {!target ? draggable : null}

      <Flex gap="4">
        {columns.map((column) => (
          <Droppable key={column.status} {...column}>
            {target === column.status ? draggable : null}
          </Droppable>
        ))}
      </Flex>

      <DragOverlay>
        {(source) => (
          <TaskCard
            id="test"
            title="Task test"
            description="This is a test to the task card in the kanban"
            deadline={new Date()}
            status="DOING"
          />
        )}
      </DragOverlay>
    </DragDropProvider>
  )
}

const columns: {
  title: string
  status: TaskStatus
  color: 'orange' | 'sky' | 'lime'
  icon: IconSvgElement
}[] = [
  {
    title: 'To do',
    status: 'TO_DO',
    color: 'orange',
    icon: DashedLineCircleIcon,
  },
  { title: 'Doing', status: 'DOING', color: 'sky', icon: Progress01Icon },
  {
    title: 'Done',
    status: 'DONE',
    color: 'lime',
    icon: CheckmarkCircle02Icon,
  },
]

const Draggable = ({
  id,
  children,
}: {
  id: string
  children: PropsWithChildren['children']
}) => {
  const { ref } = useDraggable({
    id,
  })

  return (
    <Box ref={ref} className="cursor-pointer w-fit">
      {children}
    </Box>
  )
}

const Droppable = ({
  status,
  title,
  color,
  icon,
  children,
}: {
  status: TaskStatus
  title: string
  color: 'orange' | 'sky' | 'lime'
  icon: IconSvgElement
  children: PropsWithChildren['children']
}) => {
  const { ref, isDropTarget } = useDroppable({
    id: status,
  })

  const colors = {
    orange: { bg: 'bg-orange-50', text: 'text-orange-800' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-800' },
    lime: { bg: 'bg-lime-50', text: 'text-lime-800' },
  }

  return (
    <Flex gap="2" direction="column" className="w-full">
      <Card variant="ghost" className={`!m-0 ${colors[color].bg}`}>
        <Flex align="center" gap="2" className={colors[color].text}>
          <HugeiconsIcon icon={icon} size={18} />
          <Heading size="3" weight="medium">
            {title}
          </Heading>
        </Flex>
      </Card>

      <Flex ref={ref} direction="column" gap="2" className="h-48">
        {children}
        {isDropTarget
          ? 'Draggable element is over me'
          : 'Drag something over me'}
      </Flex>
    </Flex>
  )
}

export default KanbanBoard
