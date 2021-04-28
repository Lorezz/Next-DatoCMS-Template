import {
  Box,
  Avatar,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Badge,
  Stack,
  Icon,
  Button,
  useColorMode
} from '@chakra-ui/react';

function Person({ person }) {
  if (!person) return <Text>Admin</Text>;
  const {
    avatarImage,
    deletedAt,
    id,
    numberFlags,
    numberFollowers,
    numberFollowing,
    posts,
    reportCounter,
    status,
    userName
  } = person;

  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.200', dark: '#454545' };
  const textColor = { light: 'gray.500', dark: 'gray.100' };

  return (
    <Box
      key={id}
      w="350px"
      rounded="10px"
      overflow="hidden"
      boxShadow="sm"
      bg={bgColor[colorMode]}
      p={5}>
      <Box d="flex" alignItems="center" marginBottom={2}>
        <Avatar src={avatarImage?.url} name={userName} />
        <Text as="h2" fontWeight="semibold" fontSize="xl" padding={4}>
          {userName}
        </Text>
      </Box>

      <Box
        d="flex"
        alignItems="baseline"
        justifyContent="space-between"
        marginBottom={6}>
        <Text textTransform="uppercase" fontSize="sm" letterSpacing="wide">
          {`ID: ${id} `}
        </Text>
        <Badge
          variant="solid"
          colorScheme={
            status === 'active'
              ? 'green'
              : status === 'banned'
              ? 'red'
              : 'orange'
          }
          rounded="full"
          px={2}>
          {status}
        </Badge>
        {deletedAt && <Text>DELETED ON : {deletedAt}</Text>}
      </Box>

      <StatGroup marginBottom={6}>
        <Stat>
          <StatLabel>Posts</StatLabel>
          <StatNumber>{posts.length}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Flags</StatLabel>
          <StatNumber>{numberFlags}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Fan</StatLabel>
          <StatNumber>{numberFollowers}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel color={textColor[colorMode]}>Score</StatLabel>
          <StatNumber color={textColor[colorMode]}>{reportCounter}</StatNumber>
        </Stat>
      </StatGroup>

      {/* {status !== 'banned' && (
        <Box textAlign="center">
          <Button
            size="lg"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}>
            view
          </Button>
        </Box>
      )} */}
    </Box>
  );
}

export default Person;
