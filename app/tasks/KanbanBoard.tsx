'use client'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { Grid } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Task, TaskStatus } from '../generated/prisma'
import KanbanColumn, { KanbanColumnProps } from './KanbanColumn'

const KanbanBoard = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [items, setItems] = useState(tasks)

  useEffect(() => {
    setItems(tasks)
  }, [tasks, searchParams])

  const handleDragEnd = async (results: DropResult) => {
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

      // Update the task status in the backend
      try {
        await axios.patch(`/api/tasks/${movedItem.id}`, {
          status: updatedItem.status,
        })
        router.refresh()
      } catch (error) {
        console.error('Failed to update task status:', error)
        setItems(items)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid
        gap={{ initial: '8', md: '4' }}
        columns={{ initial: '1', md: '3' }}
        className="h-full"
      >
        {columns.map((column) => (
          <KanbanColumn
            {...column}
            key={column.status}
            tasks={items.filter((item) => item.status === column.status)}
          />
        ))}
      </Grid>
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
