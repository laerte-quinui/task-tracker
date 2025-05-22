import { Delete02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AlertDialog, Button, Flex, IconButton } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()

  const handleDeleteIssue = async () => {
    await axios.delete('/api/issues/' + issueId)
    router.push('/issues')
    router.refresh()
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton color='gray' variant='outline'>
            <HugeiconsIcon icon={Delete02Icon}/>
        </IconButton>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Attention</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">No, cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDeleteIssue}
            >
              Yes, delete it
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
