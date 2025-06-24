'use client'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { Task, TaskStatus } from '../generated/prisma'
import KanbanColumn, { KanbanColumnProps } from './KanbanColumn'

const KanbanBoard = ({ tasks }: { tasks: Task[] }) => {
  const [items, setItems] = useState(tasks)

  const handleDragEnd = (results: DropResult) => {
    const { source, destination } = results

    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    const sourceItems = items.filter(
      (item) => item.status === source.droppableId
    )
    const destItems = items.filter(
      (item) => item.status === destination.droppableId
    )

    const [movedItem] = sourceItems.splice(source.index, 1)
    if (!movedItem) return

    // Reordering within the same column
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem)
      // Merge back with other columns
      const newItems = [
        ...items.filter((item) => item.status !== source.droppableId),
        ...sourceItems,
      ]
      setItems(newItems)
    } else {
      // Moving to a different column
      const updatedItem = {
        ...movedItem,
        status: destination.droppableId as TaskStatus,
      }
      destItems.splice(destination.index, 0, updatedItem)
      // Merge back with other columns
      const newItems = [
        ...items.filter(
          (item) =>
            item.status !== source.droppableId &&
            item.status !== destination.droppableId
        ),
        ...sourceItems,
        ...destItems,
      ]
      setItems(newItems)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex gap="4">
        {columns.map((column) => (
          <KanbanColumn
            {...column}
            key={column.status}
            tasks={items.filter((item) => item.status === column.status)}
          />
        ))}
      </Flex>
    </DragDropContext>
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
