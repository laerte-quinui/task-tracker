'use client'

import { Bug02Icon, LogoutSquare02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Avatar, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {

  return (
    <nav className='py-2 px-4 rounded-lg bg-stone-900 m-2 mb-8'>
      <Container>
        <Flex align='center' justify='between'>
          <Flex align='center' gap='6'>
            <Link href='/'>
              <HugeiconsIcon
                icon={Bug02Icon}
                className='size-8 p-1 rounded-lg text-stone-50 hover:bg-stone-50 hover:text-stone-900 transition-colors'
              />
            </Link>
            <NavLinks />
          </Flex>

          <AuthLinks />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <ul className='flex gap-2'>
      {links.map((link) => (
        <li
          key={link.label}
          className={classNames(
            'nav-link',
            { '!text-stone-900 bg-stone-50 hover:!bg-stone-200': currentPath === link.href },
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}

const AuthLinks = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return null
  if (status === 'unauthenticated')
    return (
      <Link
        className='nav-link border border-stone-700'
        href='/api/auth/signin'
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
          size='4'
          radius='full'
          loading='lazy'
          variant='solid'
          referrerPolicy='no-referrer'
          className='p-1 cursor-pointer hover:bg-stone-800 transition-all'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant='soft' color='gray'>
        <DropdownMenu.Label>
          <Text>{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item color='red'>
          <HugeiconsIcon
            icon={LogoutSquare02Icon}
            size='18'
            className='pointer-events-none'
          />
          <Link href='/api/auth/signout' className='w-full'>Sign out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default NavBar
