import { Box, Flex } from "@radix-ui/themes"
import { Issue, IssueStatus } from "../generated/prisma"
import IssuesTable from "./IssuesTable"
import IssueStatusFilter from "./IssueStatusFilter"
import NewIssueButton from "./NewIssueButton"

export interface IssuesQuery {
  status: IssueStatus,
  orderBy: keyof Issue,
  page: string
}
interface Props {
  searchParams: Promise<IssuesQuery>
}

const IssuesPage = async ({ searchParams }: Props ) => {

  return (
    <Box>
      <Flex mb="4">
        <IssueStatusFilter />
        <NewIssueButton />
      </Flex>

      <IssuesTable searchParams={searchParams} />
    </Box>
  )
}

export const dynamic = 'force-dynamic'
export default IssuesPage
