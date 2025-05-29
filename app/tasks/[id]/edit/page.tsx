import { getTask } from '@/app/utils/tasks'
import { notFound } from 'next/navigation'
import TaskForm from '../../_components/TaskForm'

interface Props {
  params: { id: string }
}

const EditTaskPage = async ({ params }: Props) => {
  if(isNaN(parseInt(params.id))) notFound()
  const task = await getTask(params.id)
  if(!task) notFound()

  return (
    <TaskForm task={task} />
  )
}

export default EditTaskPage
