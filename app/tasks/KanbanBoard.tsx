'use client'
import { DragDropProvider } from '@dnd-kit/react'
import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { Flex } from '@radix-ui/themes'
import { Task } from '../generated/prisma'
import KanbanColumn, { KanbanColumnProps } from './KanbanColumn'

const KanbanBoard = ({ tasks }: { tasks: Task[] }) => {
  return (
    <DragDropProvider>
      <Flex gap="4">
        {columns.map((column) => (
          <KanbanColumn
            {...column}
            key={column.status}
            tasks={tasks.filter((task) => task.status === column.status)}
          />
        ))}
      </Flex>
    </DragDropProvider>
  )
}

const columns: KanbanColumnProps[] = [
  {
    title: 'To do',
    status: 'TO_DO',
    icon: DashedLineCircleIcon,
  },
  { title: 'Doing', status: 'DOING', icon: Progress01Icon },
  {
    title: 'Done',
    status: 'DONE',
    icon: CheckmarkCircle02Icon,
  },
]

export default KanbanBoard
