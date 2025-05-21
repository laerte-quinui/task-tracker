import { getIssue } from '@/app/utils/issues'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import IssueActions from './IssueActions'
import IssueDetails from './IssueDetails'

interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  if(isNaN(parseInt(params.id))) notFound()
  const issue = await getIssue(params.id)
  if(!issue) notFound()

  return (
    <Grid columns={{ initial: '1', md: '12' }} gap='6'>
      <Box className='col-span-8'>
        <IssueDetails issue={issue} />
      </Box>

      <Box className='col-span-4'>
        <IssueActions issueId={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
