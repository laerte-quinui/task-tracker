import { Box, Flex, Grid, Heading, Skeleton, Text } from '@radix-ui/themes'

const TaskFormSkeleton = () => {
  return (
    <>
      <Heading>
        <Skeleton>New task</Skeleton>
      </Heading>
      <Box className="max-w-xl space-y-4 mt-6">
        <Flex direction="column" gap="1">
          <Text as="label">
            <Skeleton>Task title</Skeleton>
          </Text>
          <Skeleton height="32px" className="w-full" />
        </Flex>

        <Flex direction="column" gap="1">
          <Text as="label">
            <Skeleton>Task description</Skeleton>
          </Text>

          <Skeleton height="350px" className="w-full" />
        </Flex>

        <Grid columns="2" gap="4">
          <Flex direction="column" gap="1">
            <Text as="label">
              <Skeleton>Status</Skeleton>
            </Text>
            <Skeleton height="32px" className="w-full" />
          </Flex>

          <Flex direction="column" gap="1">
            <Text as="label">
              <Skeleton>Deadline</Skeleton>
            </Text>
            <Skeleton height="32px" className="w-full" />
          </Flex>
        </Grid>

        <Skeleton height="32px" width="110px" />
      </Box>
    </>
  )
}

export default TaskFormSkeleton
