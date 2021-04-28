import {
  Box,
  StackDivider,
  VStack,
  Heading,
  Spacer,
  Flex
} from '@chakra-ui/react';

import Person from './Person';
import ReportDialog from './ReportDialog';

function Users({ data, createReport }) {
  if (!data || !data.users) return null;
  const { users } = data;
  return (
    <Box>
      <Heading as="h4" size="md">
        USERS
      </Heading>
      <VStack divider={<StackDivider />} spacing={4}>
        {users.map((person) => {
          const { status, id, deletedAt } = person;
          const canEdit = !(deletedAt || status != 'active');
          return (
            <Flex key={id} w="100%">
              <Person person={person} />
              <Spacer />
              <Box>
                {canEdit && (
                  <ReportDialog
                    id={id}
                    handleReport={createReport}
                    type="user"
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

export default Users;
