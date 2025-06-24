'use client'
import { KanbanIcon, TableIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const LayoutButton = ({ layout }: { layout: string }) => {
  const searchParams = useSearchParams()

  const changeLayout = (newLayout: string) => {
    const params = new URLSearchParams()
    const status = searchParams.get('status')
    const orderBy = searchParams.get('orderBy')
    const layout = searchParams.get('layout')

    if (!layout && newLayout) params.append('layout', newLayout)
    if (status && status !== 'ALL') params.append('status', status)
    if (orderBy) params.append('orderBy', orderBy)

    const query = params.size ? '?' + params.toString() : ''
    return `/tasks${query}`
  }

  if (layout === 'kanban')
    return (
      <Tooltip content="Switch to Table">
        <Link href={changeLayout('table')}>
          <IconButton color="gray" variant="outline">
            <HugeiconsIcon icon={TableIcon} />
          </IconButton>
        </Link>
      </Tooltip>
    )

  return (
    <Tooltip content="Switch to Kanban">
      <Link href={changeLayout('kanban')}>
        <IconButton color="gray" variant="outline">
          <HugeiconsIcon icon={KanbanIcon} />
        </IconButton>
      </Link>
    </Tooltip>
  )
}

export default LayoutButton
