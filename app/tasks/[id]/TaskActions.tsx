'use client'
import { Flex, Text } from '@radix-ui/themes'
import DeleteTaskButton from './DeleteTaskButton'
import EditTaskButton from './EditTaskButton'

const TaskActions = ({ taskId }: { taskId: number }) => {
  return (
    <>
      <Text as='p' size='2' weight='bold' mb='2' className='text-stone-400 max-w-fit'>Actions</Text>

      <Flex gap="2">
        <EditTaskButton taskId={taskId} />
        <DeleteTaskButton taskId={taskId} />
      </Flex>
    </>
  )
}

export default TaskActions
