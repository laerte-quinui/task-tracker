import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import DeadlineBadge from '../components/DeadlineBadge'

export interface TaskCardProps {
  id: number
  title: string
  description: string
  deadline: Date
}

const TaskCard = ({ id, title, description, deadline }: TaskCardProps) => {
  return (
    <Link href={`/tasks/${id}`}>
      <Card className="cursor-grab w-full hover:bg-stone-100 duration-150">
        <Text className="text-stone-800 font-medium">{title}</Text>
        <Text as="p" size="2" className="text-stone-500">
          {description}
        </Text>

        <DeadlineBadge deadline={deadline} />
      </Card>
    </Link>
  )
}

export default TaskCard
