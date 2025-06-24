import { Box, Flex, Grid } from '@radix-ui/themes'
import TaskChart from './TaskChart'
import TaskSummary from './TaskSummary'
import UpcomingDeadlines from './UpcomingDeadlines'
import { countTasks } from './utils/tasks/countTasks'

export default async function Home() {
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
