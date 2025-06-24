import { Draggable, Droppable } from '@hello-pangea/dnd'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Task, TaskStatus } from '../generated/prisma'
import TaskCard from './TaskCard'

export interface KanbanColumnProps {
  status: TaskStatus
  title: string
  icon: IconSvgElement
}

interface Props extends KanbanColumnProps {
  tasks: Task[]
}

const KanbanColumn = ({ status, title, icon, tasks }: Props) => {
  const colors = {
    TO_DO: { bg: 'bg-orange-50', text: 'text-orange-800' },
    DOING: { bg: 'bg-sky-50', text: 'text-sky-800' },
    DONE: { bg: 'bg-lime-50', text: 'text-lime-800' },
  }

  const style = {
    background: 'var(--color-stone-50)',
    borderColor: 'var(--color-stone-300)',
  }

  return (
    <Flex gap="2" direction="column" className="w-full">
      <Card variant="ghost" className={`!m-0 ${colors[status].bg}`}>
        <Flex align="center" gap="2" className={colors[status].text}>
          <HugeiconsIcon icon={icon} size={18} />
          <Heading size="3" weight="medium">
            {title}
          </Heading>
          <Flex
            align="center"
            justify="center"
            className="p-2 rounded-md ml-auto bg-white size-6"
          >
            <Text size="2">{tasks.length}</Text>
          </Flex>
        </Flex>
      </Card>

      <Droppable droppableId={status} type="group">
        {(provided, snapshot) => (
          <Flex
            gap="2"
            direction="column"
            className="h-4/5 rounded-xl border-dashed border-transparent transition-all border"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={snapshot.isDraggingOver ? style : {}}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                index={index}
                draggableId={task.id.toString()}
              >
                {(provided) => (
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    deadline={task.deadline}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  )
}

export default KanbanColumn
