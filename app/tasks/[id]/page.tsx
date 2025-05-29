import { getIssue } from '@/app/utils/issues'
import { auth } from '@/auth'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import TaskActions from './TaskActions'
import TaskDetails from './TaskDetails'

interface Props {
  params: { id: string }
}

const TaskDetailsPage = async ({ params }: Props) => {
  const session = await auth()

  if(isNaN(parseInt(params.id))) notFound()
  const task = await getIssue(params.id)
  if(!task) notFound()

  return (
    <Grid columns={{ initial: '1', md: '12' }} gap='6'>
      <Box className='col-span-8'>
        <TaskDetails task={task} />
      </Box>

      {session &&
        <Box className='col-span-4'>
          <TaskActions taskId={task.id} />
        </Box>
      }
    </Grid>
  )
}

export default TaskDetailsPage
