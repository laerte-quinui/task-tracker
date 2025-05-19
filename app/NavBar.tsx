import { Bug02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex justify-between items-center py-2 px-4 rounded-lg bg-stone-900 text-stone-50 m-2 h-14'>
      <Link href='/'>
        <HugeiconsIcon
          icon={Bug02Icon}
          className='size-8 p-1 rounded-lg hover:bg-stone-50 hover:text-stone-900 transition-colors'
        />
      </Link>
      <ul className='flex gap-2'>
        {links.map((link) => (
          <li key={link.label} className='py-1 px-2 rounded-lg hover:bg-stone-800 transition-colors'>
            <Link href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
