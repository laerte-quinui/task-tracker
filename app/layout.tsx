import { Container, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import AuthProvider from './auth/Provider'
import './globals.css'
import NavBar from './NavBar'
import './theme-config.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Task Tracler',
  description: 'A simple task tracker application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <AuthProvider>
          <Theme accentColor="lime" grayColor="slate" radius="large">
            <NavBar />
            <main className="px-4 md:px-8 lg:px-14">
              <Container>{children}</Container>
            </main>
            <Toaster />
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
