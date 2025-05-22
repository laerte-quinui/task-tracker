'use client'

import { Bug02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Flex } from '@radix-ui/themes'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const currentPath = usePathname()
  const { status } = useSession()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex justify-between items-center py-2 px-4 rounded-lg bg-stone-900 m-2 mb-8 h-14'>
      <Link href='/'>
        <HugeiconsIcon
          icon={Bug02Icon}
          className='size-8 p-1 rounded-lg text-stone-50 hover:bg-stone-50 hover:text-stone-900 transition-colors'
        />
      </Link>
      <Flex gap='4' align='center'>
        <ul className='flex gap-2'>
          {links.map((link) => (
            <li
              key={link.label}
              className={classNames(
                'py-1 px-2 rounded-lg transition-colors',
                { 'text-stone-50 hover:bg-stone-800': currentPath !== link.href },
                { 'bg-stone-50 text-stone-900 hover:bg-stone-200': currentPath === link.href },
              )}
            >
              <Link href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {status === 'authenticated' && <Link className='text-stone-50' href='/api/auth/signout'>Logout</Link>}
        {status === 'unauthenticated' && <Link className='text-stone-50' href='/api/auth/signin'>Login</Link>}
      </Flex>
    </nav>
  )
}

export default NavBar
