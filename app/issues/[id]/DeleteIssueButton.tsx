import { Alert02Icon, Delete02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AlertDialog, Box, Button, Flex, IconButton } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)

  const handleDeleteIssue = async () => {
    try {
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues')
      router.refresh()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setError(true)
    }
  }

  return (
    <>
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

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <Box className='mx-auto mb-6 rounded-xl bg-rose-200 w-fit p-2'>
            <HugeiconsIcon icon={Alert02Icon} className='size-8 text-rose-700' />
          </Box>
          <AlertDialog.Title align='center'>
            An unexpected error ocurred
          </AlertDialog.Title>
          <AlertDialog.Description align='center' className='text-stone-600'>
            This issue could not be deleted. Please, try again in a few seconds.
          </AlertDialog.Description>

          <Flex justify='center' mt='6'>
            <AlertDialog.Action>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                Okay, I will wait
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
