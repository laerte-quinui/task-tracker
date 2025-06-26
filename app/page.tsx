import { auth } from '@/auth'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import LoggedoutMessage from './LoggedoutMessage'
import TaskChart from './TaskChart'
import TaskSummary from './TaskSummary'
import UpcomingDeadlines from './UpcomingDeadlines'
import { countTasks } from './utils/tasks/countTasks'

export default async function Home() {
  const session = await auth()
  if (!session) return <LoggedoutMessage />

  const { toDo, doing, done } = await countTasks()
  const statusQtd = { toDo, doing, done }

  return (
    <Grid
      columns={{ initial: '4', md: '8', lg: '12' }}
      gap={{ initial: '8', lg: '4' }}
      pb="8"
    >
      <Flex gap="4" direction="column" className="col-span-4 md:col-span-8">
        <TaskSummary statusQtd={statusQtd} />
        <TaskChart statusQtd={statusQtd} />
      </Flex>
      <Box className="col-span-4 sm:col-span-8 xl:col-span-4">
        <UpcomingDeadlines />
      </Box>
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Task Tracker - Dashboard',
  description: 'Track your tasks and deadlines efficiently with Task Tracker.',
  openGraph: {
    title: 'Task Tracker - Dashboard',
    description:
      'Track your tasks and deadlines efficiently with Task Tracker.',
    siteName: 'Task Tracker',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    // card: 'summary_large_image',
    title: 'Task Tracker - Dashboard',
    description:
      'Track your tasks and deadlines efficiently with Task Tracker.',
  },
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
  keywords: [
    'task tracker',
    'task management',
    'productivity',
    'deadline tracking',
    'task summary',
    'task chart',
  ],
  creator: 'Laerte Quinui',
  authors: [{ name: 'Laerte Quinui', url: 'https://github.com/laerte-quinui' }],
}
