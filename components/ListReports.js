import {
  Box,
  StackDivider,
  VStack,
  Heading,
  Grid,
  Text
} from '@chakra-ui/react';

import Report from './Report';

function ListReports({ data, active = true, closeReport }) {
  if (!data) return null;
  const { users, posts, reportings, flags } = data;
  return (
    <Box>
      <Heading as="h4" size="md">
        REPORTS
      </Heading>

      <Grid templateColumns="repeat(5, 1fr)" gap={6} width="100%">
        <Box>
          <Text>REPORTED</Text>
        </Box>
        <Box>
          <Text>REPORTER</Text>
        </Box>
        <Box>
          <Text>POST</Text>
        </Box>
        <Box>
          <Text>REPORT INFO</Text>
        </Box>
        <Box>
          <Text>ACTIONS</Text>
        </Box>

        {reportings
          ?.filter((r) =>
            active
              ? r.status === 'check' && !r.deletedAt
              : r.deletedAt || r.status === 'closed'
          )
          .map((report) => {
            const {
              id,
              reportedUserId,
              reporterUserId,
              reportedPostId
            } = report;
            const reported = users.find((u) => u.id === reportedUserId);
            const reporter = users.find((u) => u.id === reporterUserId);

            let post = null;
            let flag = null;
            if (reportedPostId && posts) {
              post = posts.find((p) => p.id === reportedPostId);
              if (flags) {
                flag = flags.find((f) => f.id === post.flagId);
              }
            }
            const item = { ...report, reported, reporter, post, flag };
            return (
              <Report
                report={item}
                handleCloseReport={closeReport}
                key={id}
                canEdit={active}
              />
            );
          })}
      </Grid>
    </Box>
  );
}

export default ListReports;
