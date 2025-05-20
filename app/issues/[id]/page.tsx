import { prisma } from '@/prisma/client'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
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
      <Flex gap='4' py='4' mb='4' className='border-b border-stone-200'>
        <IssueStatusBadge status={issue.status} />
        <Text className='text-stone-500'>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Text size='2' weight='bold' mb='2' className='text-stone-400'>Description</Text>
      <Text as='p' className='text-stone-700'>{issue.description}</Text>
    </div>
  )
}

export default IssueDetailsPage
