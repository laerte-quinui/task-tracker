'use client'

import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

const IssuesPage = () => {
  return (
    <div>
      <Link href='/issues/new' className="cursor-pointer">
        <Button>
          <HugeiconsIcon
            icon={PlusSignIcon}
            className="size-4"
          />
          New issue
        </Button>
      </Link>
    </div>
  )
}

export default IssuesPage
