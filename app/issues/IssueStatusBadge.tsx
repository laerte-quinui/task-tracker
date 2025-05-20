import { Badge } from '@radix-ui/themes'
import { IssueStatus } from '../generated/prisma'

const statusMap: Record<
  IssueStatus,
  { label: string, color: 'orange' | 'indigo' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'orange' },
  IN_PROGRESS: { label: 'In progress', color: 'indigo' },
  CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
  return (
    <Badge color={statusMap[status].color} >{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
