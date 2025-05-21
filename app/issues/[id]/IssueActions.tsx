'use client'
import { Flex, Text } from '@radix-ui/themes'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'

const IssueActions = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Text as='p' size='2' weight='bold' mb='2' className='text-stone-400 max-w-fit'>Actions</Text>

      <Flex gap="2">
        <EditIssueButton issueId={issueId} />
        <DeleteIssueButton />
      </Flex>
    </>
  )
}

export default IssueActions
