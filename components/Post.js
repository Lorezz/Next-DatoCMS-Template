import {
  Box,
  Text,
  Image,
  AspectRatio,
  Badge,
  Stack,
  Icon,
  Button,
  Flex,
  Avatar,
  useColorMode
} from '@chakra-ui/react';
import moment from 'moment';

import Location from './Location';

function Post({ post, flag }) {
  if (!post) return null;
  const {
    id,
    status,
    deletedAt,
    flagId,
    description,
    createdAt,
    updatedAt,
    image,
    user
    // location
  } = post;

  const location = flag?.location;
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.200', dark: '#454545' };
  const textColor = { light: 'gray.500', dark: 'gray.100' };

  return (
    <Box
      w="400px"
      rounded="10px"
      overflow="hidden"
      boxShadow="sm"
      bg={bgColor[colorMode]}>
      {image && image.url && (
        <AspectRatio maxW="400px" ratio={1}>
          <Image
            src={`${image.url}?w=250&auto=format,compress`}
            alt={user?.userName}
          />
        </AspectRatio>
      )}
      <Box p={5}>
        {user && (
          <Box d="flex" alignItems="center" marginBottom={2}>
            <Avatar src={user?.avatarImage?.url} name={user?.userName} />
            <Text as="h2" fontWeight="semibold" fontSize="xl" padding={4}>
              {user?.userName}
            </Text>
          </Box>
        )}
        <Stack isInline align="baseline">
          <Text
            textTransform="uppercase"
            fontSize="sm"
            color="gray.500"
            letterSpacing="wide">
            {`ID: ${id} `}
          </Text>
          <Badge
            variant="solid"
            colorScheme={
              status === 'active' ? 'green' : deletedAt ? 'red' : 'orange'
            }
            rounded="full"
            px={2}>
            {status}
          </Badge>
        </Stack>

        <Text fontWeight="light" fontSize="md" py={4}>
          {description}
        </Text>
        {location && <Location location={location} detail={false} />}
        <Text
          textTransform="uppercase"
          fontSize="xs"
          color="gray.500"
          letterSpacing="wide">
          {`Created at ${moment(createdAt).format('ll')}`}
        </Text>
      </Box>
    </Box>
  );
}

export default Post;
