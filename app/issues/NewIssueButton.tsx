'use client'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const NewIssueButton = () => {
  return (
    <Link href='/issues/new' className="ml-auto flex">
      <Button className="!cursor-pointer">
        <HugeiconsIcon
          icon={PlusSignIcon}
          className="size-4"
        />
        New issue
      </Button>
    </Link>
  )
}

export default NewIssueButton
