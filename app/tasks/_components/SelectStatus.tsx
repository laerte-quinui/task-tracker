import { TaskStatus } from '@/app/generated/prisma'
import {
  CheckmarkCircle02Icon,
  DashedLineCircleIcon,
  Progress01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Flex, Select } from '@radix-ui/themes'

const SelectStatus = ({ ...field }) => {
  const statuses: {
    label: string
    value: TaskStatus
    className: string
    icon: IconSvgElement
  }[] = [
    {
      label: 'To do',
      value: 'TO_DO',
      className: 'hover:!bg-orange-100',
      icon: DashedLineCircleIcon,
    },
    {
      label: 'Doing',
      value: 'DOING',
      className: 'hover:!bg-indigo-100',
      icon: Progress01Icon,
    },
    {
      label: 'Done',
      value: 'DONE',
      className: 'hover:!bg-green-100',
      icon: CheckmarkCircle02Icon,
    },
  ]

  return (
    <Select.Root
      defaultValue={field.value ?? 'TO_DO'}
      onValueChange={field.onChange}
    >
      <Select.Trigger value={field.value ?? 'TO_DO'} />
      <Select.Content ref={field.ref} variant="soft">
        {statuses.map((status) => (
          <Select.Item
            key={status.value}
            value={status.value}
            className={status.className}
          >
            <Flex align="center" gap="2">
              <HugeiconsIcon icon={status.icon} size={16} />
              {status.label}
            </Flex>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default SelectStatus
