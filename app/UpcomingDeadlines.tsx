import { prisma } from '@/prisma/client'
import { Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import DeadlineBadge from './components/DeadlineBadge'
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
