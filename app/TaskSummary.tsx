import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Avatar, Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { TaskStatus } from './generated/prisma'

interface Props {
  statusQtd: {
    toDo: number
    doing: number
    done: number
  }
}

const TaskSummary = ({ statusQtd: { toDo, doing, done } }: Props) => {
  const containers: {
    label: string
    value: number
    status: TaskStatus
    icon: {
      color: 'orange' | 'sky' | 'lime'
      svg: IconSvgElement
    }
  }[] = [
    {
      label: 'To do',
      value: toDo,
      status: 'TO_DO',
      icon: { color: 'orange', svg: DashedLineCircleIcon },
    },
    {
      label: 'Doing',
      value: doing,
      status: 'DOING',
      icon: { color: 'sky', svg: Progress01Icon },
    },
    {
      label: 'Done',
      value: done,
      status: 'DONE',
      icon: { color: 'lime', svg: CheckmarkCircle02Icon },
    },
  ]

  return (
    <Flex direction="column" gap="2">
      <Heading size="7" className="text-stone-600">
        Task summary
      </Heading>

      <Grid columns={{ md: '3' }} gap="4">
        {containers.map((container) => (
          <Link
            key={container.status}
            href={`/tasks?status=${container.status}`}
          >
            <Card className="hover:bg-stone-100 transition-all duration-300">
              <Flex gap="4" align="center">
                <Avatar
                  size="4"
                  color={container.icon.color}
                  fallback={
                    <Box>
                      <HugeiconsIcon icon={container.icon.svg} />
                    </Box>
                  }
                />

                <Flex direction="column">
                  <Heading size="6" className="text-stone-900">
                    {container.value}
                  </Heading>
                  <Text className="text-stone-500 font-medium">
                    {container.label}
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>
    </Flex>
  )
}

export default TaskSummary
