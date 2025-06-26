'use client'
import { Task } from '@/app/generated/prisma'
import dynamic from 'next/dynamic'
import TaskFormSkeleton from './TaskFormSkeleton'
const TaskFormLayout = dynamic(() => import('./TaskFormLayout'), {
  ssr: false,
  loading: () => <TaskFormSkeleton />,
})

const TaskForm = ({ task }: { task?: Task }) => {
  return <TaskFormLayout task={task} />
}

export default TaskForm
