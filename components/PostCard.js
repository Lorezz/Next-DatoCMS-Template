import { Image } from 'react-datocms';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue
} from '@chakra-ui/react';
import { StructuredText } from 'react-datocms';
import moment from 'moment';

function PostCard({ post }) {
  const { pic, title, excerpt, author, tags, pub = Date.now() } = post;
  const date = moment(pub).format('ll');
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={210}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
          overflow={'hidden'}>
          <Image data={pic.responsiveImage} height={210} />
        </Box>
        <Stack>
          <Stack direction={'row'}>
            {tags.map((t) => {
              return (
                <Text
                  key={t.id}
                  color={'purple.500'}
                  textTransform={'uppercase'}
                  fontWeight={800}
                  fontSize={'sm'}
                  letterSpacing={1.1}>
                  {t.name}
                </Text>
              );
            })}
          </Stack>

          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {title}
          </Heading>
          <Box color={'gray.500'}>
            <StructuredText content={excerpt} />
          </Box>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={author?.pic?.url} alt={author?.name} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{author?.name}</Text>
            <Text color={'gray.500'}>{date}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export default PostCard;
