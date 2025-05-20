import { Issue } from '@/app/generated/prisma'
import { Flex, Heading, Separator, Text } from '@radix-ui/themes'
import MarkdownRender from 'react-markdown'
import IssueStatusBadge from '../IssueStatusBadge'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='4' pt='2'>
        <IssueStatusBadge status={issue.status} />
        <Text className='text-stone-500'>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Separator my='6' size='4' />

      <Text as='p' size='2' weight='bold' mb='2' className='text-stone-400'>Description</Text>
      <Text as='div' className='prose prose-stone'>
        <MarkdownRender>{issue.description}</MarkdownRender>
      </Text>

      <Separator my='6' size='4' />
    </>
  )
}

export default IssueDetails
