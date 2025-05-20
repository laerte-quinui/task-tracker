'use client'
import { PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import Link from 'next/link'

const IssueActions = ({ issueId }: { issueId: number }) => {
  return (
    <Tooltip content='Edit issue'>
      <IconButton color='gray' variant='outline'>
        <Link href={`/issues/${issueId}/edit`}>
          <HugeiconsIcon
            icon={PencilEdit02Icon}
          />
        </Link>
      </IconButton>
    </Tooltip>
  )
}

export default IssueActions
