import {
  Box,
  Flex,
  Grid,
  Heading,
  Separator,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import React from 'react'

const TaskDetailsLoadingPage = () => {
  return (
    <Grid columns={{ initial: '1', md: '12' }} gap="6">
      <Box className="col-span-8">
        <Flex align="center" justify="between" gap="4">
          <Heading size="7">
            <Skeleton>A big task title</Skeleton>
          </Heading>
          <Flex gap="2">
            <Skeleton height="32px" width="32px" />
            <Skeleton height="32px" width="32px" />
          </Flex>
        </Flex>

        <Grid columns="6" gapY="2" gapX="4" mt="4">
          {Array.from({ length: 3 }).map((_, i) => (
            <React.Fragment key={i}>
              <Box className="col-span-3 md:col-span-1">
                <Skeleton height="20px" width="80px" />
              </Box>
              <Box className="col-span-3 md:col-span-5">
                <Skeleton height="20px" width="80px" />
              </Box>
            </React.Fragment>
          ))}
        </Grid>

        <Separator my="6" size="4" />

        <Text size="2" mb="2">
          <Skeleton>Description</Skeleton>
        </Text>

        <Text>
          <Skeleton>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna.
          </Skeleton>
        </Text>

        <Separator my="6" size="4" />
      </Box>
    </Grid>
  )
}

export default TaskDetailsLoadingPage
