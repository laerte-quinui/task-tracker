import { Box, Flex, Grid } from '@radix-ui/themes'
import TaskChart from './TaskChart'
import TaskSummary from './TaskSummary'
import UpcomingDeadlines from './UpcomingDeadlines'
import { countTasks } from './utils/tasks/countTasks'

export default async function Home() {
  const { toDo, doing, done } = await countTasks()
  const statusQtd = { toDo, doing, done }

  return (
    <Grid columns="12" gap="4">
      <Flex gap="4" direction="column" className="col-span-8">
        <TaskSummary statusQtd={statusQtd} />
        <TaskChart statusQtd={statusQtd} />
      </Flex>
      <Box className="col-span-4">
        <UpcomingDeadlines />
      </Box>
    </Grid>
  )
}
