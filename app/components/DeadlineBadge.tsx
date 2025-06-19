import { AlarmClockIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Badge } from '@radix-ui/themes'

const DeadlineBadge = ({ deadline }: { deadline: Date }) => {
  const now = new Date()
  const deadlineDate = new Date(deadline)

  now.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)
  const msPerDay = 1000 * 60 * 60 * 24
  const days = Math.round((deadlineDate.getTime() - now.getTime()) / msPerDay)

  let text = ''
  if (days === 0) {
    text = 'Today'
  } else if (days === 1) {
    text = 'Tomorrow'
  } else if (days > 1 && days < 7) {
    text = `In ${days} days`
  } else if (days === 7) {
    text = 'In a week'
  } else {
    text = deadlineDate.toLocaleDateString()
  }

  return (
    <Badge color="gray">
      <HugeiconsIcon icon={AlarmClockIcon} size={12} />
      {text}
    </Badge>
  )
}

export default DeadlineBadge
