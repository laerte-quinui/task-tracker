'use client'
import { DragDropProvider } from '@dnd-kit/react'
import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { Flex } from '@radix-ui/themes'
import { useState } from 'react'
import KanbanColumn, { KanbanColumnProps } from './KanbanColumn'
import { TaskCardProps } from './TaskCard'

interface Props {
  statusQtd: {
    toDo: number
    doing: number
    done: number
  }
}

const KanbanBoard = ({ statusQtd }: Props) => {
  const [tasks] = useState<TaskCardProps[]>([
    {
      id: 'test',
      title: 'Task test',
      description: 'This is a test to the task card in the kanban',
      deadline: new Date(),
      status: 'DOING',
    },
    {
      id: 'test2',
      title: 'Make the kanban work',
      description: 'Step 1: do a pact with the devil',
      deadline: new Date(),
      status: 'TO_DO',
    },
    {
      id: 'test3',
      title: 'Task test',
      description: 'This is a test to the task card in the kanban',
      deadline: new Date(),
      status: 'DOING',
    },
    {
      id: 'test4',
      title: 'Task test',
      description: 'This is a test to the task card in the kanban',
      deadline: new Date(),
      status: 'DOING',
    },
    {
      id: 'test5',
      title: 'Task test',
      description: 'This is a test to the task card in the kanban',
      deadline: new Date(),
      status: 'DONE',
    },
  ])

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
