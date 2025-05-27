import { Box, Flex } from "@radix-ui/themes"
import { IssueStatus } from "../generated/prisma"
import IssuesTable from "./IssuesTable"
import IssueStatusFilter from "./IssueStatusFilter"
import NewIssueButton from "./NewIssueButton"

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const IssuesPage = async ({ searchParams }: Props ) => {
  const { status } = await searchParams

  return (
    <Box>
      <Flex mb="4">
        <IssueStatusFilter />
        <NewIssueButton />
      </Flex>

      <IssuesTable statusFilter={status as unknown as IssueStatus} />
    </Box>
  )
}

export const dynamic = 'force-dynamic'
export default IssuesPage
