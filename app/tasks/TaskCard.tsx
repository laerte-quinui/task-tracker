import { AlarmClockIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Badge, Card, Text } from '@radix-ui/themes'
import { TaskStatus } from '../generated/prisma'

interface Props {
  id: string
  title: string
  description: string
  status: TaskStatus
  deadline: Date
}

const TaskCard = ({ title, description, deadline }: Props) => {
  return (
    <Card className="cursor-pointer w-fit">
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
