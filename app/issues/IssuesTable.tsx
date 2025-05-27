import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatus } from '../generated/prisma'
import IssueStatusBadge from './IssueStatusBadge'

const IssuesTable = async ({
  statusFilter
}: {
  statusFilter?: IssueStatus
}) => {
  const validStatuses = Object.values(IssueStatus)
  const status = validStatuses.includes(statusFilter!) ? statusFilter : undefined

  const issues = await prisma.issue.findMany({ where: { status }})

  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>
            Created at
          </Table.ColumnHeaderCell>
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
  )
}

export default IssuesTable
