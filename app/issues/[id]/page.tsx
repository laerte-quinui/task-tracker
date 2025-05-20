import { prisma } from '@/prisma/client'
import { Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import MarkdownRender from 'react-markdown'
import IssueStatusBadge from '../IssueStatusBadge'

interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  if(isNaN(parseInt(params.id))) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if(!issue) notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='4' pt='2'>
        <IssueStatusBadge status={issue.status} />
        <Text className='text-stone-500'>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Separator my='6' size='4' />

      <Text as='p' size='2' weight='bold' mb='2' className='text-stone-400'>Description</Text>
      <Text as='p' className='prose prose-stone'>
        <MarkdownRender>{issue.description}</MarkdownRender>
      </Text>

      <Separator my='6' size='4' />
    </div>
  )
}

export default IssueDetailsPage
