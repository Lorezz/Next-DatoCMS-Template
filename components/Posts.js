import {
  Box,
  StackDivider,
  VStack,
  Heading,
  Spacer,
  Flex
} from '@chakra-ui/react';

import Post from './Post';
import ReportDialog from './ReportDialog';

function Posts({ data, createReport }) {
  if (!data || !data.posts) return null;
  const { posts, flags } = data;
  return (
    <Box>
      <Heading as="h4" size="md">
        POSTS
      </Heading>
      <VStack divider={<StackDivider />} spacing={4}>
        {posts.map((post) => {
          const { status, id, deletedAt, flagId } = post;
          const canEdit = !(deletedAt || status != 'active');
          const flag = flags && flags.find((f) => f.id === post.flagId);
          return (
            <Flex key={id} w="100%">
              <Post post={post} flag={flag} />
              <Spacer />
              <Box>
                {canEdit && (
                  <ReportDialog
                    id={id}
                    handleReport={createReport}
                    type="post"
                  />
                )}
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Posts;
