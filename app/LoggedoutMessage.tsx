'use client'
import { StickyNote02Icon } from '@hugeicons/core-free-icons'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import EmptyStateMessage from './components/EmptyStateMessage'

const LoggedoutMessage = () => {
  return (
    <Flex
      gap="4"
      align="center"
      justify="center"
      direction="column"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <EmptyStateMessage
        icon={StickyNote02Icon}
        title="Welcome to Task Tracker!"
        description="Log in to start tracking your tasks and deadlines"
      />
      <Link href="/api/auth/signin">
        <Button size="3" className="!w-fit !px-16">
          Log in
        </Button>
      </Link>
    </Flex>
  )
}

export default LoggedoutMessage
