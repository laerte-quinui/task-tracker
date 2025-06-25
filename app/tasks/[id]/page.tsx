import TaskStatusBadge from '@/app/components/TaskStatusBadge'
import { formatDate } from '@/app/utils/formatDate'
import { getTask } from '@/app/utils/tasks'
import { auth } from '@/auth'
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
import { notFound } from 'next/navigation'
import { cache } from 'react'
import MarkdownRender from 'react-markdown'
import DeleteTaskButton from './DeleteTaskButton'
import EditTaskButton from './EditTaskButton'

interface Props {
  params: { id: string }
}

const fetchTask = cache((taskId: string) => getTask(taskId))

const TaskDetailsPage = async ({ params }: Props) => {
  const session = await auth()

  if (isNaN(parseInt(params.id))) notFound()
  const task = await fetchTask(params.id)
  if (!task) notFound()

  const statusIcon = {
    TO_DO: DashedLineCircleIcon,
    DOING: Progress01Icon,
    DONE: CheckmarkCircle02Icon,
  }

  return (
    <Grid columns={{ initial: '1', md: '12' }} gap="6">
      <Box className="col-span-8">
        <Flex align="center" justify="between" gap="4">
          <Heading size="7">{task.title}</Heading>
          {session && (
            <Flex gap="2">
              <EditTaskButton taskId={task.id} />
              <DeleteTaskButton taskId={task.id} />
            </Flex>
          )}
        </Flex>

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
            {formatDate(task.createdAt)}
          </Text>

          <DetailLabel label="Deadline" icon={AlarmClockIcon} />
          <Text className="text-stone-500 col-span-3 md:col-span-5">
            {formatDate(task.deadline)}
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
      </Box>
    </Grid>
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

export async function generateMetadata({ params }: Props) {
  const task = await fetchTask(params.id)
  if (!task) return {}

  return {
    title: `Task Tracker - ${task.title}`,
    description: 'Details of task - ' + task.id,
  }
}

export default TaskDetailsPage
