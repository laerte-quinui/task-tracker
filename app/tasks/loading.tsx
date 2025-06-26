import { Box, Flex, Grid, Heading, Skeleton } from '@radix-ui/themes'

const TaskLoadingPage = () => {
  return (
    <Box>
      <Heading size="7" mb="4">
        <Skeleton>My tasks</Skeleton>
      </Heading>

      <Flex mb="4">
        <Skeleton height="32px" width="130px" />
        <Flex ml="auto" gap="2">
          <Skeleton height="32px" width="32px" />
          <Skeleton height="32px" width="110px" />
        </Flex>
      </Flex>

      <Grid
        className="h-full"
        gap={{ initial: '8', md: '4' }}
        columns={{ initial: '1', md: '3' }}
      >
        {[...Array(3)].map((_, index) => (
          <Flex direction="column" gap="2" className="w-full" key={index}>
            <Skeleton height="48px" className="w-full" />
            <Flex
              gap="2"
              className="w-full"
              direction={{ initial: 'row', md: 'column' }}
            >
              {[...Array(Math.floor(Math.random() * 3) + 1)].map(
                (_, taskIndex) => (
                  <Skeleton
                    key={taskIndex}
                    height="120px"
                    className="w-full h-full max-w-1/2 md:max-w-1/3 lg:max-w-full flex-shrink-0"
                  />
                )
              )}
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Box>
  )
}

export default TaskLoadingPage
