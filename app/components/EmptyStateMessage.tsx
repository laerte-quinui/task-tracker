import { Coffee02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'

interface Props {
  title: string
  description?: string
  icon?: IconSvgElement
  className?: string
}

const EmptyStateMessage = ({ title, description, icon, className }: Props) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      className={`h-full ${className ?? ''}`}
    >
      <Avatar
        mb="2"
        size="4"
        color="gray"
        fallback={<HugeiconsIcon icon={icon ?? Coffee02Icon} />}
      />

      <Heading size="6" className="text-stone-500">
        {title}
      </Heading>
      {description && (
        <Text as="p" align="center" className="text-stone-400">
          {description}
        </Text>
      )}
    </Flex>
  )
}

export default EmptyStateMessage
