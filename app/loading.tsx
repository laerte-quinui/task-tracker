import { Box, Flex, Grid, Heading, Skeleton } from '@radix-ui/themes'

const HomeLoadingPage = () => {
  return (
    <Grid
      columns={{ initial: '4', md: '8', lg: '12' }}
      gap={{ initial: '8', lg: '4' }}
      pb="8"
    >
      <Flex gap="4" direction="column" className="col-span-4 md:col-span-8">
        <Flex direction="column" gap="2">
          <Heading size="7">
            <Skeleton>Task Summary</Skeleton>
          </Heading>
          <Grid columns={{ sm: '3' }} gap="4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height="80px" className="w-full" />
            ))}
          </Grid>
          <Skeleton height="400px" className="w-full" />
        </Flex>
      </Flex>

      <Box className="w-full col-span-4 sm:col-span-8 xl:col-span-4">
        <Flex direction="column" gap="2">
          <Heading size="7">
            <Skeleton>Upcoming Deadlines</Skeleton>
          </Heading>

          <Skeleton height="488px" className="w-full" />
        </Flex>
      </Box>
    </Grid>
  )
}

export default HomeLoadingPage
