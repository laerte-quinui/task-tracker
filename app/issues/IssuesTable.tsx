import { prisma } from '@/prisma/client'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import Pagination from '../components/Pagination'
import { Issue, IssueStatus } from '../generated/prisma'
import IssueStatusBadge from './IssueStatusBadge'
import { IssuesQuery } from './page'

interface Props {
  searchParams: Promise<IssuesQuery>
}

const IssuesTable = async ({ searchParams }: Props) => {
  const { status: statusFilter, orderBy, page } = await searchParams

  const currentPage = parseInt(page) || 1
  const pageSize = 10

  const validStatuses = Object.values(IssueStatus)
  const status = validStatuses.includes(statusFilter!) ? statusFilter : undefined

  const validOrder = columns
    .map(column => column.value)
    .includes(orderBy!)
    ? { [orderBy!]: 'asc' }
    : undefined

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: validOrder,
    skip: (currentPage - 1) * pageSize,
    take: pageSize
  })
  const issuesTotal = await prisma.issue.count({ where: { status }})

  return (
    <>
      <Table.Root variant='surface' mb='2'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link href={{ query: { status, orderBy: column.value }}}>
                  {column.label}
                </Link>
                {column.value === orderBy &&
                  <HugeiconsIcon
                    icon={ArrowUp02Icon}
                    className='inline ml-1 size-4'
                  />
                }
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} className='underline hover:text-indigo-700 transition-colors'>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemsTotal={issuesTotal}
      />
    </>
  )
}

const columns: {
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created at', value: 'createdAt', className: 'hidden md:table-cell' },
]

export default IssuesTable
