import { Box, Flex } from "@radix-ui/themes"
import { Issue, IssueStatus } from "../generated/prisma"
import IssuesTable from "./IssuesTable"
import IssueStatusFilter from "./IssueStatusFilter"
import NewIssueButton from "./NewIssueButton"

interface Props {
  searchParams: Promise<{ status: IssueStatus, orderBy: keyof Issue }>
}

const IssuesPage = async ({ searchParams }: Props ) => {
  const { status, orderBy } = await searchParams

  return (
    <Box>
      <Flex mb="4">
        <IssueStatusFilter />
        <NewIssueButton />
      </Flex>

      <IssuesTable
        statusFilter={status}
        orderBy={orderBy}
      />
    </Box>
  )
}

export const dynamic = 'force-dynamic'
export default IssuesPage
