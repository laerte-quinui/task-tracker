'use client'
import { PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import Link from 'next/link'

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <Tooltip content="Edit task">
      <IconButton color="gray" variant="outline">
        <Link href={`/tasks/${taskId}/edit`}>
          <HugeiconsIcon icon={PencilEdit02Icon} />
        </Link>
      </IconButton>
    </Tooltip>
  )
}

export default EditTaskButton
