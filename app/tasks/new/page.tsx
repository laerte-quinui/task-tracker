import { Metadata } from 'next'
import TaskForm from '../_components/TaskForm'

const NewTaskPage = () => {
  return <TaskForm />
}

export const metadata: Metadata = {
  title: 'Task Tracker - Create New Task',
  description: 'Create a new task to track your progress and deadlines.',
}

export default NewTaskPage
