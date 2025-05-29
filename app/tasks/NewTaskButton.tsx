'use client'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const NewTaskButton = () => {
  return (
    <Link href='/tasks/new' className="ml-auto flex">
      <Button>
        <HugeiconsIcon
          icon={PlusSignIcon}
          className="size-4"
        />
        New task
      </Button>
    </Link>
  )
}

export default NewTaskButton
