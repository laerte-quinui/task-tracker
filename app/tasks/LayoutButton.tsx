'use client'
import { KanbanIcon, TableIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import Link from 'next/link'

const LayoutButton = ({ layout }: { layout: string }) => {
  if (layout === 'kanban')
    return (
      <Tooltip content="Switch to Table">
        <Link href="/tasks?layout=table">
          <IconButton color="gray" variant="outline">
            <HugeiconsIcon icon={TableIcon} />
          </IconButton>
        </Link>
      </Tooltip>
    )

  return (
    <Tooltip content="Switch to Kanban">
      <Link href="/tasks?layout=kanban">
        <IconButton color="gray" variant="outline">
          <HugeiconsIcon icon={KanbanIcon} />
        </IconButton>
      </Link>
    </Tooltip>
  )
}

export default LayoutButton
