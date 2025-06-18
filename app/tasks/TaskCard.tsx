import { AlarmClockIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Badge, Card, Text } from '@radix-ui/themes'
import { TaskStatus } from '../generated/prisma'

export interface TaskCardProps {
  id: number
  title: string
  description: string
  status: TaskStatus
  deadline: Date
}

const TaskCard = ({ title, description, deadline }: TaskCardProps) => {
  return (
    <Card className="cursor-grab w-full hover:bg-stone-100 duration-150">
      <Text className="text-stone-800 font-medium">{title}</Text>
      <Text as="p" size="2" className="text-stone-500">
        {description}
      </Text>

      <Badge color="gray" mt="4">
        <HugeiconsIcon icon={AlarmClockIcon} size={12} />
        <Text size="1">{deadline.toDateString()}</Text>
      </Badge>
    </Card>
  )
}

export default TaskCard
