import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import DeadlineBadge from '../components/DeadlineBadge'

export interface TaskCardProps {
  id: number
  title: string
  description: string
  deadline: Date
  ref: (a?: HTMLElement | null) => void
}

const TaskCard = ({
  id,
  title,
  description,
  deadline,
  ref,
  ...rest
}: TaskCardProps) => {
  return (
    <Link
      ref={ref}
      {...rest}
      href={`/tasks/${id}`}
      className="w-full h-full max-w-1/2 md:max-w-1/3 lg:max-w-full md:h-fit flex-shrink-0"
    >
      <Card className="hover:bg-stone-100 duration-150 h-full decoration-stone-400 hover:!underline">
        <Text className="text-stone-800 font-medium">{title}</Text>
        <Text
          as="p"
          size="2"
          className="text-stone-500 line-clamp-1 md:line-clamp-2 lg:line-clamp-3 !mb-3"
        >
          {description}
        </Text>

        <DeadlineBadge deadline={deadline} />
      </Card>
    </Link>
  )
}

export default TaskCard
