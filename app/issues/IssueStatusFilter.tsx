'use client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { IssueStatus } from '../generated/prisma'

const statuses: { label: string, value?: IssueStatus }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams()
    const orderBy = searchParams.get('orderBy')
    if (status && status !== 'ALL') params.append('status', status)
    if (orderBy) params.append('orderBy', orderBy)

    const query = params.size ? '?' + params.toString() : ''
    router.push('/issues' + query)
  }

  return (
    <Select.Root
      defaultValue={searchParams.get('status') ?? ''}
      onValueChange={handleStatusChange}
    >
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content variant='soft' color='gray' position='popper'>
        {statuses.map((status) => (
          <Select.Item
            key={status.value ?? 'ALL'}
            value={status.value ?? 'ALL'}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
