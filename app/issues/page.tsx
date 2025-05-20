import { prisma } from "@/prisma/client"
import { Table } from "@radix-ui/themes"
import IssueStatusBadge from "./IssueStatusBadge"
import NewIssueButton from "./NewIssueButton"

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  return (
    <div>
      <div className="flex mb-4">
        <NewIssueButton />
      </div>

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Issue</Table.Cell>
            <Table.Cell className='hidden md:table-cell'>Status</Table.Cell>
            <Table.Cell className='hidden md:table-cell'>Created at</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
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
    </div>
  )
}

export default IssuesPage
