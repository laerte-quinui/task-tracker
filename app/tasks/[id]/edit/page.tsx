import { getTask } from '@/app/utils/tasks'
import { notFound } from 'next/navigation'
import TaskForm from '../../_components/TaskForm'

interface Props {
  params: Promise<{ id: string }>
}

const EditTaskPage = async ({ params }: Props) => {
  const { id } = await params
  if (isNaN(parseInt(id))) notFound()
  const task = await getTask(id)
  if (!task) notFound()

  return <TaskForm task={task} />
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const task = await getTask(id)
  if (!task) return {}

  return {
    title: `Task Tracker - ${task.title}`,
    description: 'Edit task - ' + task.id,
  }
}

export default EditTaskPage
