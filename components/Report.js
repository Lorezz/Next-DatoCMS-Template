import { Grid, Box, Button, Badge, Text } from '@chakra-ui/react';
import moment from 'moment';

import Person from './Person';
import Post from './Post';
import Confirm from './ConfirmDialog';

function Report({ report, handleCloseReport, canEdit }) {
  const {
    id,
    status,
    motivationType,
    motivationNote,
    createdAt,
    reported,
    reporter,
    post,
    flag,
    deletedAt
  } = report;
  return (
    <>
      <Box>
        <Person person={reported} />
      </Box>
      <Box>
        <Person person={reporter} />
      </Box>
      <Box>{post && <Post post={post} flag={flag} />}</Box>
      <Box>
        <Text
          textTransform="uppercase"
          fontSize="xs"
          color="gray.500"
          letterSpacing="wide">
          {`Created at ${moment(createdAt).format('ll')}`}
        </Text>
        <Text
          textTransform="uppercase"
          color="gray.500"
          letterSpacing="wide">{`ID: ${id}`}</Text>
        <Text>{`MOTIVATION: ${motivationType} ${motivationNote}}`}</Text>
        <Badge
          variant="solid"
          colorScheme={status === 'check' ? 'green' : deletedAt ? 'red' : null}
          rounded="full"
          px={2}>
          {status}
        </Badge>
      </Box>
      <Box>
        {canEdit && post && (
          <Confirm
            type="post"
            id={post.id}
            handleConfirm={(postId) =>
              handleCloseReport({ post: postId, report: id })
            }
          />
        )}
        {canEdit && reported && (
          <Confirm
            type="user"
            id={reported.id}
            handleConfirm={(userId) =>
              handleCloseReport({ user: userId, report: id })
            }
          />
        )}
        {canEdit && (
          <Button onClick={() => handleCloseReport({ report: id })}>
            Ignore and close
          </Button>
        )}
      </Box>
    </>
  );
}

export default Report;
