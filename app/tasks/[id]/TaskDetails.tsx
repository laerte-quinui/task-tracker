import { Task } from '@/app/generated/prisma'
import {
  AlarmClockIcon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
  Tag01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Box, Flex, Grid, Heading, Separator, Text } from '@radix-ui/themes'
import MarkdownRender from 'react-markdown'
import TaskStatusBadge from '../../components/TaskStatusBadge'

const TaskDetails = ({ task }: { task: Task }) => {
  const statusIcon = {
    TO_DO: DashedLineCircleIcon,
    DOING: Progress01Icon,
    DONE: CheckmarkCircle02Icon,
  }

  return (
    <>
      <Heading>{task.title}</Heading>
      <Grid columns="6" gapY="2" gapX="4" mt="4">
        <DetailLabel label="Status" icon={Tag01Icon} />
        <Box className="col-span-3 md:col-span-5">
          <TaskStatusBadge
            status={task.status}
            size="2"
            icon={statusIcon[task.status]}
          />
        </Box>

        <DetailLabel label="Created at" icon={Calendar03Icon} />
        <Text className="text-stone-500 col-span-3 md:col-span-5">
          {task.createdAt.toDateString()}
        </Text>

        <DetailLabel label="Deadline" icon={AlarmClockIcon} />
        <Text className="text-stone-500 col-span-3 md:col-span-5">
          {task.deadline.toDateString()}
        </Text>
      </Grid>

      <Separator my="6" size="4" />

      <Text as="p" size="2" weight="bold" mb="2" className="text-stone-400">
        Description
      </Text>
      <Text as="div" className="prose prose-stone max-w-full">
        <MarkdownRender>{task.description}</MarkdownRender>
      </Text>

      <Separator my="6" size="4" />
    </>
  )
}

const DetailLabel = ({
  label,
  icon,
}: {
  label: string
  icon: IconSvgElement
}) => {
  return (
    <Flex align="center" gap="2" className="col-span-3 md:col-span-1">
      <HugeiconsIcon size={16} icon={icon} className="text-stone-400" />
      <Text size="2" className="text-stone-400">
        {label}
      </Text>
    </Flex>
  )
}

export default TaskDetails
