import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import Pagination from '../components/Pagination'
import TaskStatusBadge from '../components/TaskStatusBadge'
import { Task } from '../generated/prisma'

interface Props {
  tasks: Task[]
  tasksTotal: number
  currentPage: number
  pageSize: number
  status?: string
  orderBy?: keyof Task
}

const TasksTable = async ({
  tasks,
  tasksTotal,
  currentPage,
  pageSize,
  status,
  orderBy,
}: Props) => {
  return (
    <>
      <Table.Root variant="surface" mb="2">
        <Table.Header>
          <Table.Row>
            {tableColumns.map((column) => (
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
                  className="underline hover:text-lime-700 transition-colors"
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

export const tableColumns: {
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
