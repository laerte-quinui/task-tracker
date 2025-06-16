import { prisma } from '@/prisma/client'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import Pagination from '../components/Pagination'
import { Task, TaskStatus } from '../generated/prisma'
import TaskStatusBadge from './TaskStatusBadge'
import { TasksQuery } from './page'

interface Props {
  searchParams: Promise<TasksQuery>
}

const TasksTable = async ({ searchParams }: Props) => {
  const { status: statusFilter, orderBy, page } = await searchParams

  const currentPage = parseInt(page) || 1
  const pageSize = 10

  const validStatuses = Object.values(TaskStatus)
  const status = validStatuses.includes(statusFilter!)
    ? statusFilter
    : undefined

  const validOrder = columns.map((column) => column.value).includes(orderBy!)
    ? { [orderBy!]: 'asc' }
    : undefined

  const tasks = await prisma.task.findMany({
    where: { status },
    orderBy: validOrder,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })
  const tasksTotal = await prisma.task.count({ where: { status } })

  return (
    <>
      <Table.Root variant="surface" mb="2">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link href={{ query: { status, orderBy: column.value } }}>
                  {column.label}
                </Link>
                {column.value === orderBy && (
                  <HugeiconsIcon
                    icon={ArrowUp02Icon}
                    className="inline ml-1 size-4"
                  />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link
                  href={`/tasks/${task.id}`}
                  className="underline hover:text-indigo-700 transition-colors"
                >
                  {task.title}
                </Link>
                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.deadline.toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemsTotal={tasksTotal}
      />
    </>
  )
}

const columns: {
  label: string
  value: keyof Task
  className?: string
}[] = [
  { label: 'Task', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Deadline', value: 'deadline', className: 'hidden md:table-cell' },
  {
    label: 'Created at',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
]

export default TasksTable
