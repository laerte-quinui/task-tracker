'use client'
import { Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Box, Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import Link from 'next/link'

const IssueActions = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Text as='p' size='2' weight='bold' mb='2' className='text-stone-400 max-w-fit'>Actions</Text>

      <Flex gap="2">
        <Tooltip content='Edit issue'>
          <IconButton color='gray' variant='outline'>
            <Link href={`/issues/${issueId}/edit`}>
              <HugeiconsIcon
                icon={PencilEdit02Icon}
              />
            </Link>
          </IconButton>
        </Tooltip>

        <Tooltip content='Delete issue'>
          <IconButton color='gray' variant='outline'>
            {/* <Link href={`/issues/${issueId}/edit`}> */}
              <HugeiconsIcon
                icon={Delete02Icon}
              />
            {/* </Link> */}
          </IconButton>
        </Tooltip>
      </Flex>
    </>
  )
}

export default IssueActions
