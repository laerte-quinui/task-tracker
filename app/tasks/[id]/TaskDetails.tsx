import { Task } from '@/app/generated/prisma'
import { Flex, Heading, Separator, Text } from '@radix-ui/themes'
import MarkdownRender from 'react-markdown'
import TaskStatusBadge from '../TaskStatusBadge'

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Flex gap='4' pt='2'>
        <TaskStatusBadge status={task.status} />
        <Text className='text-stone-500'>{task.createdAt.toDateString()}</Text>
      </Flex>

      <Separator my='6' size='4' />

      <Text as='p' size='2' weight='bold' mb='2' className='text-stone-400'>Description</Text>
      <Text as='div' className='prose prose-stone max-w-full'>
        <MarkdownRender>{task.description}</MarkdownRender>
      </Text>

      <Separator my='6' size='4' />
    </>
  )
}

export default TaskDetails
