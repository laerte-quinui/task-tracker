'use client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { TaskStatus } from '../generated/prisma'

const statuses: { label: string; value?: TaskStatus }[] = [
  { label: 'All' },
  { label: 'To do', value: 'TO_DO' },
  { label: 'Doing', value: 'DOING' },
  { label: 'Done', value: 'DONE' },
]

const TaskStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const changeStatus = (status: string) => {
    const params = new URLSearchParams()
    const orderBy = searchParams.get('orderBy')
    const layout = searchParams.get('layout')

    if (status && status !== 'ALL') params.append('status', status)
    if (orderBy) params.append('orderBy', orderBy)
    if (layout) params.append('layout', layout)

    const query = params.size ? '?' + params.toString() : ''
    router.push('/tasks' + query)
    router.refresh()
  }

  return (
    <Select.Root
      defaultValue={searchParams.get('status') ?? ''}
      onValueChange={changeStatus}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content variant="soft" color="gray" position="popper">
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

export default TaskStatusFilter
