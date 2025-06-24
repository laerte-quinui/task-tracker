import { prisma } from '@/prisma/client'
import { Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import DeadlineBadge from './components/DeadlineBadge'
import EmptyStateMessage from './components/EmptyStateMessage'
import TaskStatusBadge from './components/TaskStatusBadge'

const UpcomingDeadlines = async () => {
  const tasks = await prisma.task.findMany({
    where: {
      deadline: {
        gte: new Date(), // Deadlines in the future
      },
      status: {
        not: 'DONE',
      },
    },
    orderBy: { deadline: 'asc' },
    take: 10,
  })

  if (!tasks.length)
    return (
      <Flex gap="2" direction="column" className="h-full">
        <Heading size="7" className="text-stone-600">
          Upcoming Deadlines
        </Heading>
        <Card className="h-full">
          <EmptyStateMessage
            className="h-full"
            title="Just relax and enjoy"
            description="You don't have any tasks with a upcoming deadline!"
          />
        </Card>
      </Flex>
    )

  return (
    <Flex direction="column" gap="2">
      <Heading size="7" className="text-stone-600">
        Upcoming Deadlines
      </Heading>

      <Table.Root variant="surface" className="w-full h-full">
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id} align="center">
              <Table.Cell>
                <Flex direction="column" gap="2">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="underline hover:text-lime-700 transition-colors"
                  >
                    {task.title}
                  </Link>
                  <TaskStatusBadge status={task.status} />
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <DeadlineBadge deadline={task.deadline} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}

export default UpcomingDeadlines
