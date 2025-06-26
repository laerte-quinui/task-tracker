'use client'

import {
  LogoutSquare02Icon,
  StickyNote02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  return (
    <nav className="py-2 px-4 rounded-lg bg-stone-900 m-2 mb-8">
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap="6">
            <Link href="/">
              <Box className="flex items-center justify-center p-1 rounded-lg text-stone-50 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                <HugeiconsIcon icon={StickyNote02Icon} size={24} />
              </Box>
            </Link>
            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tasks', href: '/tasks' },
  ]

  return (
    <ul className="flex gap-2">
      {links.map((link) => (
        <li
          key={link.label}
          className={classNames('nav-link', {
            '!text-stone-900 bg-stone-50 hover:!bg-stone-200':
              currentPath === link.href,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton width="48px" height="48px" />
  if (status === 'unauthenticated')
    return (
      <Link
        href="/api/auth/signin"
        className="nav-link border border-stone-700"
      >
        Log in
      </Link>
    )

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback={session!.user!.name![0]}
          size="4"
          radius="full"
          // loading='lazy'
          variant="solid"
          referrerPolicy="no-referrer"
          className="p-1 cursor-pointer hover:bg-stone-800 transition-all"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" color="gray">
        <DropdownMenu.Label>
          <Text>{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item color="red">
          <HugeiconsIcon
            icon={LogoutSquare02Icon}
            size="18"
            className="pointer-events-none"
          />
          <Link href="/api/auth/signout" className="w-full">
            Sign out
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default NavBar
